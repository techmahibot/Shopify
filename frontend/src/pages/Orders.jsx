import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Package } from 'lucide-react'
import MainLayout from '../layout/MainLayout'
import Loading from '../components/Loading'
import PageTitle from '../components/PageTitle'
import OrderCard from '../components/OrderCard'
import { getOrders } from '../services/api'

export default function Orders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadOrders = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await getOrders()
      setOrders(res.data.orders)
    } catch (err) {
      if (err.response?.status === 401) navigate('/login')
      else setError(true)
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  if (loading) {
    return <MainLayout><Loading text="Loading your orders..." /></MainLayout>
  }

  if (error) {
    return (
      <MainLayout>
        <div className="mx-6 flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
          <h1 className="text-2xl font-semibold text-slate-800">Unable to load your orders.</h1>
          <button
            onClick={loadOrders}
            className="mt-2 cursor-pointer rounded bg-slate-800 px-8 py-3 text-sm text-white transition hover:bg-slate-900 active:scale-95"
          >
            Try Again
          </button>
        </div>
      </MainLayout>
    )
  }

  if (orders.length === 0) {
    return (
      <MainLayout>
        <div className="mx-6 flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center text-slate-400">
          <Package size={72} strokeWidth={1} />
          <h1 className="text-2xl font-semibold text-slate-700 sm:text-3xl">You have not placed any orders yet.</h1>
          <Link
            to="/products"
            className="rounded bg-slate-800 px-8 py-3 text-sm text-white transition hover:bg-slate-900 active:scale-95"
          >
            Start Shopping
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="mx-6 min-h-screen text-slate-800">
        <div className="mx-auto max-w-3xl">
          <PageTitle heading="My Orders" text={`${orders.length} order${orders.length !== 1 ? 's' : ''}`} />
          <div className="mb-20 space-y-4">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
