import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Truck, CreditCard, ShieldCheck, ChevronRight } from 'lucide-react'
import MainLayout from '../layout/MainLayout'
import Loading from '../components/Loading'
import { getProductById } from '../services/api'
import toast from 'react-hot-toast'
import { useCart } from '../hooks/useCart'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, getQuantity, isPending } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleAddToCart = async () => {
  const result = await addToCart(product._id)
  if (result.ok) toast.success('Added to cart')
  else if (result.status === 401) navigate('/login')
  else toast.error(result.message)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    setError(false)
    getProductById(id)
      .then(res => setProduct(res.data.product))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <MainLayout><Loading text="Loading product…" /></MainLayout>
  if (error || !product) return (
    <MainLayout>
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400 text-xl">
        Product not found.
      </div>
    </MainLayout>
  )

  return (
    <MainLayout>
      <div className="mx-6">
        <div className="max-w-7xl mx-auto">

          <nav className="text-gray-500 text-sm mt-8 mb-5 flex items-center gap-1 flex-wrap">
            <Link to="/home" className="hover:text-green-600 transition">Home</Link>
            <ChevronRight size={14} />
            <Link to="/products" className="hover:text-green-600 transition">Products</Link>
            <ChevronRight size={14} />
            <span className="capitalize text-slate-600">{product.category}</span>
          </nav>

          <div className="flex max-lg:flex-col gap-12">
            <div className="flex justify-center items-center h-80 sm:size-96 bg-slate-100 rounded-lg p-6">
              <img src={product.image} alt={product.name} className="max-h-full w-auto object-contain" />
            </div>

            <div className="flex-1">
              <p className="text-xs text-slate-400 capitalize mb-2 border border-slate-200 inline-block px-3 py-1 rounded-full">
                {product.category}
              </p>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 leading-snug">
                {product.name}
              </h1>

              <div className="flex items-end gap-3 my-6">
                <p className="text-3xl font-semibold text-slate-800">₹{product.price.toFixed(2)}</p>
              </div>

              <p className="text-sm text-slate-500 mb-6">
                {product.stock > 0 ? `${product.stock} units left` : 'Out of stock'}
              </p>

              <button
                disabled={product.stock === 0 || isPending(product._id) || getQuantity(product._id) >= product.stock}
                onClick={handleAddToCart}
                className="flex items-center gap-2 bg-slate-800 text-white px-8 py-3 rounded hover:bg-slate-900 active:scale-95 transition text-sm font-medium disabled:opacity-50"
              >
                <ShoppingCart size={16} /> {isPending(product._id) ? 'Adding...' : 'Add to Cart'}
              </button>

              <hr className="border-gray-200 my-6" />

              <div className="flex flex-col gap-3 text-slate-500 text-sm">
                <p className="flex items-center gap-3"><Truck size={16} className="text-slate-400" /> Free shipping on orders above ₹500</p>
                <p className="flex items-center gap-3"><CreditCard size={16} className="text-slate-400" /> 100% Secured Payment</p>
                <p className="flex items-center gap-3"><ShieldCheck size={16} className="text-slate-400" /> Quality Guaranteed</p>
              </div>

              <p className="mt-8 max-w-2xl leading-relaxed text-slate-600">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}