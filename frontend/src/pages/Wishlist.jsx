import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import toast from 'react-hot-toast'
import MainLayout from '../layout/MainLayout'
import Loading from '../components/Loading'
import PageTitle from '../components/PageTitle'
import WishlistCard from '../components/WishlistCard'
import { getWishlist, removeFromWishlist } from '../services/api'

export default function Wishlist() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadWishlist = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await getWishlist()
      setItems(res.data.wishlist)
    } catch (err) {
      if (err.response?.status === 401) navigate('/login')
      else setError(true)
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    loadWishlist()
  }, [loadWishlist])

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId)
      setItems((prev) => prev.filter((p) => p._id !== productId))
      toast.success('Removed from wishlist')
    } catch {
      toast.error('Unable to remove product. Please try again.')
    }
  }

  if (loading) {
    return <MainLayout><Loading text="Loading your wishlist..." /></MainLayout>
  }

  if (error) {
    return (
      <MainLayout>
        <div className="mx-6 flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
          <h1 className="text-2xl font-semibold text-slate-800">Something went wrong.</h1>
          <p className="text-sm text-slate-500">We couldn&apos;t load your wishlist.</p>
          <button
            onClick={loadWishlist}
            className="mt-2 cursor-pointer rounded bg-slate-800 px-8 py-3 text-sm text-white transition hover:bg-slate-900 active:scale-95"
          >
            Try Again
          </button>
        </div>
      </MainLayout>
    )
  }

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="mx-6 flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center text-slate-400">
          <Heart size={72} strokeWidth={1} className="text-rose-300" />
          <h1 className="text-2xl font-semibold text-slate-700 sm:text-3xl">Your wishlist is empty</h1>
          <p className="text-sm">Save products you love and find them here later.</p>
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
      <div className="mx-6 min-h-screen">
        <div className="mx-auto mb-20 max-w-7xl">
          <PageTitle
            heading="My Wishlist"
            text={`${items.length} product${items.length !== 1 ? 's' : ''} saved`}
            path="/products"
            linkText="Continue shopping"
          />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-10">
            {items.map((product) => (
              <WishlistCard key={product._id} product={product} onRemove={handleRemove} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}