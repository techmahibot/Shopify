import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '../hooks/useCart'

// One row of the cart table. Shows the product's latest price and stock.
export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart, isPending } = useCart()
  const { product, quantity } = item
  const busy = isPending(product._id) // only THIS row is disabled while its request runs
  const overStock = quantity > product.stock // stock dropped after it was added

  const changeQuantity = async (next) => {
    const result = await updateQuantity(product._id, next)
    if (!result.ok) toast.error(result.message)
  }

  const handleRemove = async () => {
    const result = await removeFromCart(product._id)
    if (result.ok) toast.success('Removed from cart')
    else toast.error(result.message)
  }

  return (
    <tr className={`border-b border-slate-100 transition-opacity ${busy ? 'opacity-60' : ''}`}>
      <td className="py-4">
        <div className="flex items-center gap-3">
          <Link
            to={`/products/${product._id}`}
            className="flex size-16 shrink-0 items-center justify-center rounded-md bg-slate-100"
          >
            <img src={product.image} alt={product.name} className="h-12 w-auto object-contain" />
          </Link>
          <div>
            <Link
              to={`/products/${product._id}`}
              className="line-clamp-2 max-w-[200px] text-sm font-medium hover:underline"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-xs capitalize text-slate-400">{product.category}</p>
            <p className="mt-0.5 text-sm text-slate-700">₹{product.price.toFixed(2)}</p>
            {overStock && (
              <p className="mt-1 text-xs text-rose-500">
                Only {product.stock} left. Please reduce the quantity.
              </p>
            )}
          </div>
        </div>
      </td>

      <td className="text-center">
        <div className="inline-flex items-center gap-3 rounded border border-slate-200 px-2 py-1">
          <button
            type="button"
            onClick={() => changeQuantity(quantity - 1)}
            disabled={busy || quantity <= 1}
            aria-label="Decrease quantity"
            className="cursor-pointer rounded p-1 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus size={14} />
          </button>
          <span className="w-6 text-center text-sm tabular-nums">{quantity}</span>
          <button
            type="button"
            onClick={() => changeQuantity(quantity + 1)}
            disabled={busy || quantity >= product.stock}
            aria-label="Increase quantity"
            className="cursor-pointer rounded p-1 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={14} />
          </button>
        </div>
      </td>

      <td className="text-center font-medium tabular-nums">
        ₹{(product.price * quantity).toFixed(2)}
      </td>

      <td className="text-center">
        <button
          type="button"
          onClick={handleRemove}
          disabled={busy}
          className="inline-flex cursor-pointer items-center gap-1 rounded px-2 py-1.5 text-sm text-red-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 size={15} />
          <span className="max-sm:hidden">Remove</span>
        </button>
      </td>
    </tr>
  )
}