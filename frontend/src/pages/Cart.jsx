import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'

import MainLayout from '../layout/MainLayout'
import Loading from '../components/Loading'
import PageTitle from '../components/PageTitle'
import CartItem from '../components/CartItem'
import { useCart } from '../hooks/useCart'

export default function Cart() {
  const navigate = useNavigate()
  const { cartItems, loading, error, unauthorized, refreshCart, cartCount, subtotal } = useCart()

  // not logged in: send the visitor to the login page
  useEffect(() => {
    if (unauthorized) navigate('/login')
  }, [unauthorized, navigate])

  if (unauthorized) return null

  if (loading) {
    return <MainLayout><Loading text="Loading your cart..." /></MainLayout>
  }

  if (error) {
    return (
      <MainLayout>
        <div className="mx-6 flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
          <h1 className="text-2xl font-semibold text-slate-800">Unable to load your cart.</h1>
          <button
            onClick={refreshCart}
            className="mt-2 cursor-pointer rounded bg-slate-800 px-8 py-3 text-sm text-white transition hover:bg-slate-900 active:scale-95"
          >
            Try Again
          </button>
        </div>
      </MainLayout>
    )
  }

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="mx-6 flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center text-slate-400">
          <ShoppingBag size={72} strokeWidth={1} />
          <h1 className="text-2xl font-semibold text-slate-700 sm:text-3xl">Your cart is empty</h1>
          <p className="text-sm">Looks like you haven&apos;t added anything yet.</p>
          <Link
            to="/products"
            className="rounded bg-slate-800 px-8 py-3 text-sm text-white transition hover:bg-slate-900 active:scale-95"
          >
            Browse Products
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="mx-6 min-h-screen text-slate-800">
        <div className="mx-auto max-w-7xl">
          <PageTitle
            heading="My Cart"
            text={`${cartCount} item${cartCount !== 1 ? 's' : ''} in your cart`}
            path="/products"
            linkText="Add more"
          />

          <div className="mb-20 flex items-start justify-between gap-8 max-lg:flex-col">
            <div className="w-full max-w-4xl overflow-x-auto">
              <table className="w-full table-auto text-slate-600">
                <thead>
                  <tr className="border-b border-slate-200 text-sm">
                    <th className="pb-3 text-left">Product</th>
                    <th className="pb-3">Quantity</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3"><span className="sr-only">Remove</span></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <CartItem key={item.product._id} item={item} />
                  ))}
                </tbody>
              </table>
            </div>

            <aside className="w-full max-w-sm shrink-0 rounded-xl border border-slate-200 bg-slate-50/30 p-7 text-sm text-slate-500 lg:max-w-[340px]">
              <h2 className="mb-5 text-xl font-semibold text-slate-700">Order Summary</h2>

              <div className="space-y-3 border-b border-slate-200 pb-4">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="flex justify-between gap-2 text-xs">
                    <span className="line-clamp-1 flex-1">{item.product.name} × {item.quantity}</span>
                    <span className="font-medium tabular-nums text-slate-700">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-b border-slate-200 pb-4">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span className="font-medium tabular-nums text-slate-700">{cartCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium tabular-nums text-slate-700">₹{subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="mt-5 w-full cursor-pointer rounded bg-slate-800 py-3 text-center font-medium text-white transition hover:bg-slate-900 active:scale-95"
              >
                Proceed to Checkout
              </button>
            </aside>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}