import { NavLink, useNavigate } from 'react-router-dom'
import api from '../services/api.js'
import { LogoutIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart'

const navLinkCls = ({ isActive }) =>
isActive ? 'text-green-600' : 'transition hover:text-slate-900'
function Navbar({ customer, onProfileClick }) {
  const navigate = useNavigate();
  const { cartCount, clearCart } = useCart()

  const handleLogout = async () => {
    try {
      await api.post('/customers/logout')
    } catch (err) {
      // ignore
    }
    clearCart()
    navigate('/login')
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold text-slate-800">
            Shop<span className="text-green-600">Kart</span>
          </span>
          <span className="hidden sm:inline-block text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
            Customer Portal
          </span>
        </div>

        <div className="flex items-center gap-4">
                  <nav className="flex items-center gap-3 text-xs font-medium text-slate-600 sm:gap-6 sm:text-sm">
          <NavLink to="/home" className={navLinkCls}>Home</NavLink>
          <NavLink to="/products" className={navLinkCls}>Products</NavLink>
          <NavLink to="/wishlist" className={navLinkCls}>Wishlist</NavLink>
          <NavLink to="/cart" className={navLinkCls}>Cart ({cartCount})</NavLink>
          <NavLink to="/orders" className={navLinkCls}>Orders</NavLink>
        </nav>
          {customer && (
            <button
              onClick={onProfileClick}
              className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-slate-100 transition"
              title="View profile"
            >
              <span className="size-8 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center justify-center">
                {getInitials(customer.fullName)}
              </span>
              <span className="hidden sm:inline text-sm font-medium text-slate-700">{customer.fullName}</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-full px-4 py-2 hover:bg-slate-100 hover:text-slate-900 transition"
            title="Sign out of account"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar