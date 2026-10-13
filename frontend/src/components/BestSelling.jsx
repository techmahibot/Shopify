import { useEffect, useState } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import Loading from './Loading'
import { getProducts } from '../services/api'

export default function BestSelling() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
      .then(res => setProducts((res.data.products || []).slice(0, 8)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading text="Loading products..." />
  if (products.length === 0) return null

  return (
    <div className="px-6 my-20 max-w-6xl mx-auto">
      <Title title="Featured Products" description={`Showing ${products.length} products from our catalog`} href="/products" />
      <div className="mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}