import { Link } from 'react-router-dom'
import OrderStatusBadge from './OrderStatusBadge'

// One order in the My Orders list. Uses the saved snapshot, not live product data.
export default function OrderCard({ order }) {
  const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="rounded-xl border border-slate-200 p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium text-slate-800">Order #{order._id.slice(-8)}</p>
          <p className="text-xs text-slate-400">{date}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <ul className="mt-4 space-y-1 text-sm text-slate-600">
        {order.items.map((item) => (
          <li key={item.product} className="flex justify-between gap-3">
            <span className="line-clamp-1">{item.name} × {item.quantity}</span>
            <span className="tabular-nums">₹{(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="text-sm text-slate-500">
          Total: <span className="font-semibold text-slate-800">₹{order.totalAmount.toFixed(2)}</span>
        </p>
        <Link
          to={`/orders/${order._id}`}
          className="rounded bg-slate-800 px-5 py-2 text-xs text-white transition hover:bg-slate-900 active:scale-95"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
