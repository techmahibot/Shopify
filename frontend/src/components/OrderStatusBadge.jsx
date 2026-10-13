const STYLES = {
  PENDING_PAYMENT: 'bg-amber-50 text-amber-700',
  PLACED: 'bg-green-50 text-green-700',
  CONFIRMED: 'bg-blue-50 text-blue-700',
  SHIPPED: 'bg-violet-50 text-violet-700',
  DELIVERED: 'bg-slate-100 text-slate-700',
}

export default function OrderStatusBadge({ status }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${STYLES[status] || 'bg-slate-100 text-slate-700'}`}>
      {status.replace('_', ' ')}
    </span>
  )
}
