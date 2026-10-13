import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import MainLayout from '../layout/MainLayout'
import Loading from '../components/Loading'
import OrderStatusBadge from '../components/OrderStatusBadge'
import { getOrderById } from '../services/api'

// Used for both /order-success/:id (success = true) and /orders/:id
export default function OrderDetails({ success = false }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    setError(null)
    getOrderById(id)
      .then((res) => setOrder(res.data.order))
      .catch((err) => {
        if (err.response?.status === 401) navigate('/login')
        else if (err.response?.status === 404) setError('Order not found.')
        else setError('Unable to load this order.')
      })
      .finally(() => setLoading(false))
  }, [id, navigate])

  if (loading) {
    return <MainLayout><Loading text="Loading your order..." /></MainLayout>
  }

  if (error) {
    return (
      <MainLayout>
        <div className="mx-6 flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
          <h1 className="text-2xl font-semibold text-slate-800">{error}</h1>
          <Link
            to="/orders"
            className="mt-2 rounded bg-slate-800 px-8 py-3 text-sm text-white transition hover:bg-slate-900 active:scale-95"
          >
            View My Orders
          </Link>
        </div>
      </MainLayout>
    )
  }

  const address = order.shippingAddress
  const date = new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <MainLayout>
      <div className="mx-6 min-h-screen text-slate-800">
        <div className="mx-auto max-w-3xl pb-20">
          {success ? (
            <div className="my-10 flex flex-col items-center gap-2 text-center">
              <CheckCircle2 size={64} strokeWidth={1.5} className="text-green-500" />
              <h1 className="text-2xl font-semibold sm:text-3xl">Order Placed Successfully</h1>
              <p className="text-sm text-slate-500">Your payment was verified and your order has been saved.</p>
            </div>
          ) : (
            <h1 className="my-6 text-2xl font-semibold">Order Details</h1>
          )}

          <div className="rounded-xl border border-slate-200 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 text-sm">
              <div>
                <p className="text-slate-400">Order ID</p>
                <p className="break-all font-medium">{order._id}</p>
                <p className="mt-1 text-xs text-slate-400">{date}</p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>

            <table className="mt-6 w-full text-sm text-slate-600">
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.product} className="border-b border-slate-100">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-slate-100">
                          <img src={item.image} alt={item.name} className="h-10 w-auto object-contain" />
                        </div>
                        <div>
                          <p className="line-clamp-2 font-medium text-slate-800">{item.name}</p>
                          <p className="text-xs text-slate-400">₹{item.price.toFixed(2)} × {item.quantity}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-right font-medium tabular-nums">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-between text-base font-semibold">
              <span>Total</span>
              <span className="tabular-nums">₹{order.totalAmount.toFixed(2)}</span>
            </div>

            <div className="mt-6 grid gap-6 border-t border-slate-100 pt-6 text-sm sm:grid-cols-2">
              <div>
                <p className="mb-1 font-medium text-slate-800">Shipping to</p>
                <p>{address.fullName}</p>
                <p>{address.addressLine1}</p>
                <p>{address.city}, {address.state} {address.pincode}</p>
                <p>{address.phone}</p>
              </div>
              <div>
                <p className="mb-1 font-medium text-slate-800">Payment</p>
                <p>Status: {order.paymentStatus}</p>
                {order.razorpayPaymentId && (
                  <p className="break-all text-xs text-slate-400">Ref: {order.razorpayPaymentId}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/orders"
              className="rounded bg-slate-800 px-8 py-3 text-sm text-white transition hover:bg-slate-900 active:scale-95"
            >
              View My Orders
            </Link>
            <Link
              to="/products"
              className="rounded border border-slate-300 px-8 py-3 text-sm text-slate-700 transition hover:bg-slate-100 active:scale-95"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
