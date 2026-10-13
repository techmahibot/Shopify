import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

export default function WishlistCard({ product, onRemove }) {
  const [removing, setRemoving] = useState(false)

  const handleRemove = async () => {
    setRemoving(true)
    try {
      await onRemove(product._id)
    } finally {
      setRemoving(false)
    }
  }

  return (
    <div className="w-full max-xl:mx-auto sm:max-w-60">
      <div className="flex h-40 items-center justify-center overflow-hidden rounded-lg bg-[#F5F5F5] sm:h-68">
        <img
          className="max-h-30 w-auto object-contain p-4 sm:max-h-44"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="flex justify-between gap-3 pt-2 text-sm text-slate-800">
        <div className="min-w-0 flex-1">
          <p className="truncate">{product.name}</p>
          <p className="mt-0.5 text-xs capitalize text-slate-400">{product.category}</p>
          <p className="mt-1 text-xs">
            {product.stock > 0 ? (
              <span className="text-slate-400">{product.stock} units left</span>
            ) : (
              <span className="text-rose-500">Out of stock</span>
            )}
          </p>
        </div>
        <p className="shrink-0 font-medium">₹{product.price.toFixed(2)}</p>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <Link
          to={`/products/${product._id}`}
          className="rounded bg-slate-800 py-2 text-center text-xs text-white transition hover:bg-slate-900"
        >
          View Details
        </Link>
        <button
          type="button"
          onClick={handleRemove}
          disabled={removing}
          className="flex cursor-pointer items-center justify-center gap-1 rounded border border-rose-200 py-2 text-xs text-rose-600 transition hover:bg-rose-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Heart size={13} className="fill-rose-500" />
          {removing ? 'Removing...' : 'Remove from Wishlist'}
        </button>
      </div>
    </div>
  )
}