import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { getCart, addCartItem, updateCartItem, removeCartItem } from '../services/api'

export const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]) // [{ product, quantity }] straight from the backend
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [unauthorized, setUnauthorized] = useState(false)
  const [pendingIds, setPendingIds] = useState([]) // product ids with a request in flight

  const refreshCart = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getCart()
      setCartItems(res.data.cart)
      setUnauthorized(false)
    } catch (err) {
      if (err.response?.status === 401) {
        setCartItems([])
        setUnauthorized(true) // not logged in: not an error, the cart page redirects
      } else {
        setError('Unable to load your cart.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  // Used on logout so the next person never sees the old cart
  const clearCart = useCallback(() => {
    setCartItems([])
    setError(null)
    setUnauthorized(true)
  }, [])

    // After a confirmed payment the backend has already cleared the cart; mirror that here
  const emptyCart = useCallback(() => {
    setCartItems([])
  }, [])

  // One helper for every mutation: mark the item busy, call the API,
  // replace the whole cart with the backend's answer, never throw.
  const mutate = useCallback(async (productId, request) => {
    setPendingIds((ids) => [...ids, productId])
    try {
      const res = await request()
      setCartItems(res.data.cart)
      setUnauthorized(false)
      return { ok: true }
    } catch (err) {
      return {
        ok: false,
        status: err.response?.status,
        message: err.response?.data?.message || 'Something went wrong. Please try again.',
      }
    } finally {
      setPendingIds((ids) => ids.filter((id) => id !== productId))
    }
  }, [])

  const addToCart = useCallback((productId) => mutate(productId, () => addCartItem(productId)), [mutate])
  const updateQuantity = useCallback(
    (productId, quantity) => mutate(productId, () => updateCartItem(productId, quantity)),
    [mutate]
  )
  const removeFromCart = useCallback((productId) => mutate(productId, () => removeCartItem(productId)), [mutate])

  // Derived values: calculated from cartItems, never stored
  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems])
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  )

  const getQuantity = useCallback(
    (productId) => cartItems.find((item) => item.product._id === productId)?.quantity ?? 0,
    [cartItems]
  )
  const isPending = useCallback((productId) => pendingIds.includes(productId), [pendingIds])

  const value = useMemo(
    () => ({
      cartItems, loading, error, unauthorized,
      cartCount, subtotal,
      refreshCart, clearCart, emptyCart, addToCart, updateQuantity, removeFromCart,
      getQuantity, isPending,
    }),
    [cartItems, loading, error, unauthorized, cartCount, subtotal,
     refreshCart, clearCart, emptyCart, addToCart, updateQuantity, removeFromCart, getQuantity, isPending]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}