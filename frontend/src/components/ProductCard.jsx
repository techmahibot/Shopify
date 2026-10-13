import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import { addToWishlist } from '../services/api'
import { useCart } from '../hooks/useCart'

export default function ProductCard({ product, initiallySaved = false, onSaved }) {
  const navigate = useNavigate()
  const [status, setStatus] = useState('idle') // idle | saving | saved
  const saving = status === 'saving'
  const saved = status === 'saved' || initiallySaved
  const { addToCart, getQuantity, isPending } = useCart()
  const inCart = getQuantity(product._id)
  const adding = isPending(product._id)
  const soldOut = product.stock === 0
  const atLimit = inCart >= product.stock // cannot add more than the stock

  const handleAddToCart = async (e) => {
    e.preventDefault() // the whole card is a <Link>
    if (adding || soldOut || atLimit) return

    const result = await addToCart(product._id)
    if (result.ok) toast.success('Added to cart')
    else if (result.status === 401) navigate('/login')
    else toast.error(result.message)
  }

  const handleWishlist = async (e) => {
    e.preventDefault() // the whole card is a <Link>; don't navigate when the heart is clicked
    if (saving || saved) return // no duplicate requests

    setStatus('saving')
    try {
      await addToWishlist(product._id)
      setStatus('saved')
      onSaved?.(product._id)
      toast.success('Added to wishlist')
    } catch (err) {
      const code = err.response?.status
      if (code === 409) {
        setStatus('saved')
        onSaved?.(product._id)
        toast('Already in your wishlist')
      } else if (code === 401) {
        navigate('/login')
      } else {
        setStatus('idle')
        toast.error('Unable to save product. Please try again.')
      }
    }
  }

  return (
    <Link to={`/products/${product._id}`} className="group max-xl:mx-auto relative">
      <div className="bg-[#F5F5F5] h-40 sm:w-60 sm:h-68 rounded-lg flex items-center justify-center overflow-hidden relative">
        <button
          type="button"
          onClick={handleWishlist}
          aria-label="Add to wishlist"
          className="absolute right-2 top-2 z-10 cursor-pointer rounded-full bg-white/80 p-1.5 transition hover:bg-white"
        >
          <Heart
            size={16}
            className={saved ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}
          />
        </button>

        <img
          className="max-h-30 sm:max-h-44 w-auto object-contain group-hover:scale-110 transition duration-300 p-4"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="flex justify-between gap-3 text-sm text-slate-800 pt-2 sm:max-w-60">
        <div className="flex-1 min-w-0">
          <p className="truncate">{product.name}</p>
          <p className="text-xs text-slate-400 capitalize mt-0.5">{product.category}</p>
          <p className="text-xs mt-1">
            {product.stock > 0 ? (
              <span className="text-slate-400">{product.stock} units left</span>
            ) : (
              <span className="text-rose-500">Out of stock</span>
            )}
          </p>
        </div>

        <div className="text-right shrink-0">
          <p className="font-medium">₹{product.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-2 flex gap-2 sm:max-w-60">
        <span className="rounded bg-slate-800 px-3 py-2 text-center text-xs text-white transition group-hover:bg-slate-900">
          View Details
        </span>

        <button
          type="button"
          onClick={handleWishlist}
          disabled={saving}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded border py-2 text-xs transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${
            saved
              ? 'border-rose-200 bg-rose-50 text-rose-600'
              : 'border-slate-300 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Heart
            size={13}
            className={saved ? 'fill-rose-500 text-rose-500' : ''}
          />
          {saving ? 'Saving...' : saved ? 'Added to Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
            <button
        type="button"
        onClick={handleAddToCart}
        disabled={adding || soldOut || atLimit}
        className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-slate-800 py-2 text-xs text-white transition hover:bg-slate-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-60"
      >
        <ShoppingCart size={13} />
        {adding
          ? 'Adding...'
          : soldOut
            ? 'Out of stock'
            : atLimit
              ? 'Max in cart'
              : inCart > 0
                ? `Add Another (${inCart} in cart)`
                : 'Add to Cart'}
      </button>
    </Link>
  )
}