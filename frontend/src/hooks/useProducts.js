import { useState, useEffect, useMemo } from 'react'
import { getProducts } from '../services/api'
import { useDebounce } from './useDebounce'

const CATEGORIES = ['Electronics', 'Fashion', 'Home', 'Books', 'Beauty', 'Sports', 'Groceries', 'Automotive']

const SORT_MAP = {
  'price-asc': 'price_asc',
  'price-desc': 'price_desc',
}

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const debouncedSearch = useDebounce(search, 400)
  const categories = useMemo(() => ['all', ...CATEGORIES], [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = {}
        if (debouncedSearch) params.search = debouncedSearch
        if (selectedCategory !== 'all') params.category = selectedCategory
        if (SORT_MAP[sortBy]) params.sort = SORT_MAP[sortBy]

        const res = await getProducts(params)
        setProducts(res.data.products || [])
      } catch (err) {
        setError('Failed to load products. Make sure the backend server is running.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [debouncedSearch, selectedCategory, sortBy])

  return {
    filteredProducts: products, // filtering already happened server-side
    categories,
    loading,
    error,
    search, setSearch,
    selectedCategory, setSelectedCategory,
    sortBy, setSortBy,
  }
}