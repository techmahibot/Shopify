import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import MainLayout from '../layout/MainLayout'
import Loading from '../components/Loading'
import PageTitle from '../components/PageTitle'
import { useCart } from '../hooks/useCart'
import { createPaymentOrder, verifyPayment } from '../services/api'
import { loadRazorpayScript } from '../utils/razorpay'

const FIELDS = [
  { name: 'fullName', label: 'Full Name', placeholder: 'Aarav Sharma', autoComplete: 'name', wide: true },
  { name: 'phone', label: 'Phone', placeholder: '9876543210', autoComplete: 'tel', inputMode: 'numeric' },
  { name: 'pincode', label: 'Pincode', placeholder: '560001', autoComplete: 'postal-code', inputMode: 'numeric' },
  { name: 'addressLine1', label: 'Address', placeholder: '22 MG Road', autoComplete: 'address-line1', wide: true },
  { name: 'city', label: 'City', placeholder: 'Bengaluru', autoComplete: 'address-level2' },
  { name: 'state', label: 'State', placeholder: 'Karnataka', autoComplete: 'address-level1' },
]

const EMPTY_FORM = { fullName: '', phone: '', addressLine1: '', city: '', state: '', pincode: '' }

// Client-side check only; the server validates again
function validate(form) {
  const errors = {}
  for (const field of FIELDS) {
    if (!form[field.name].trim()) errors[field.name] = `${field.label} is required.`
  }
  if (!errors.phone && !/^[6-9]\d{9}$/.test(form.phone.trim())) {
    errors.phone = 'Enter a valid 10-digit phone number.'
  }
  if (!errors.pincode && !/^\d{6}$/.test(form.pincode.trim())) {
    errors.pincode = 'Pincode must contain 6 digits.'
  }
  return errors
}

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, loading, error, unauthorized, cartCount, subtotal, emptyCart } = useCart()

  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)
  const verifying = useRef(false) // payment done, waiting for the backend to verify it
  const finished = useRef(false) // order confirmed: don't bounce to /cart when the cart empties

  useEffect(() => {
    if (unauthorized) navigate('/login')
    else if (!loading && !error && cartItems.length === 0 && !finished.current) navigate('/cart')
  }, [unauthorized, loading, error, cartItems.length, navigate])

  if (unauthorized) return null

  if (loading) {
    return <MainLayout><Loading text="Preparing checkout..." /></MainLayout>
  }

  if (error) {
    return (
      <MainLayout>
        <div className="mx-6 flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
          <h1 className="text-2xl font-semibold text-slate-800">Unable to load your cart.</h1>
          <button
            onClick={() => navigate('/cart')}
            className="mt-2 cursor-pointer rounded bg-slate-800 px-8 py-3 text-sm text-white transition hover:bg-slate-900 active:scale-95"
          >
            Back to Cart
          </button>
        </div>
      </MainLayout>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (placing) return

    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      toast.error('Please fix the highlighted fields.')
      return // no backend call when the form is invalid
    }

    setPlacing(true)
    try {
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        toast.error('Unable to load Razorpay. Check your connection and try again.')
        setPlacing(false)
        return
      }

      // only the address goes to the server; it works out the amount itself
      const shippingAddress = Object.fromEntries(
        Object.entries(form).map(([key, value]) => [key, value.trim()])
      )
      const { data } = await createPaymentOrder(shippingAddress)

      const razorpay = new window.Razorpay({
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'ShopKart',
        description: 'ShopKart Order',
        order_id: data.razorpayOrderId,
        prefill: { name: shippingAddress.fullName, contact: shippingAddress.phone },
        theme: { color: '#1e293b' },

        // success callback: NOT proof of payment, so the backend must verify it
        handler: async (response) => {
          verifying.current = true
          try {
            const res = await verifyPayment({
              shopKartOrderId: data.shopKartOrderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
            finished.current = true
            emptyCart() // the backend cleared the cart, mirror it so the Navbar shows Cart (0)
            navigate(`/order-success/${res.data.order._id}`)
          } catch (err) {
            verifying.current = false
            setPlacing(false)
            toast.error(err.response?.data?.message || 'Could not verify your payment. Please contact support.')
          }
        },

        modal: {
          ondismiss: () => {
            if (!verifying.current) setPlacing(false) // closed without paying: cart stays as it is
          },
        },
      })

      razorpay.on('payment.failed', () => {
        toast.error('Payment failed. Your cart has not been cleared. Please try again.')
      })

      razorpay.open()
    } catch (err) {
      if (err.response?.status === 401) navigate('/login')
      else toast.error(err.response?.data?.message || 'Unable to place your order. Please try again.')
      setPlacing(false)
    }
  }

  return (
    <MainLayout>
      <div className="mx-6 min-h-screen text-slate-800">
        <div className="mx-auto max-w-7xl">
          <PageTitle heading="Checkout" text="Enter your shipping details" path="/cart" linkText="Back to cart" />

          <div className="mb-20 flex items-start justify-between gap-8 max-lg:flex-col">
            <form
              id="checkout-form"
              onSubmit={handleSubmit}
              noValidate
              className="grid w-full max-w-3xl gap-5 sm:grid-cols-2"
            >
              <h2 className="text-lg font-semibold text-slate-700 sm:col-span-2">Shipping Details</h2>

              {FIELDS.map((field) => (
                <div key={field.name} className={field.wide ? 'sm:col-span-2' : ''}>
                  <label htmlFor={field.name} className="mb-1 block text-sm text-slate-600">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    inputMode={field.inputMode}
                    disabled={placing}
                    aria-invalid={Boolean(errors[field.name])}
                    className={`w-full rounded border px-3 py-2.5 text-sm outline-none transition focus:border-green-500 disabled:bg-slate-50 ${
                      errors[field.name] ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  {errors[field.name] && <p className="mt-1 text-xs text-rose-500">{errors[field.name]}</p>}
                </div>
              ))}
            </form>

            <aside className="w-full max-w-sm shrink-0 rounded-xl border border-slate-200 bg-slate-50/30 p-7 text-sm text-slate-500 lg:max-w-[340px]">
              <h2 className="mb-5 text-xl font-semibold text-slate-700">Order Summary</h2>

              <div className="space-y-3 border-b border-slate-200 pb-4">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="flex justify-between gap-2 text-xs">
                    <span className="line-clamp-1 flex-1">{item.product.name} × {item.quantity}</span>
                    <span className="font-medium tabular-nums text-slate-700">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-b border-slate-200 pb-4">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span className="font-medium tabular-nums text-slate-700">{cartCount}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span>Total</span>
                  <span className="font-semibold tabular-nums text-slate-800">₹{subtotal.toFixed(2)}</span>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                The final amount is confirmed by the server using the latest prices and stock.
              </p>

              <button
                type="submit"
                form="checkout-form"
                disabled={placing}
                className="mt-5 w-full cursor-pointer rounded bg-slate-800 py-3 text-center font-medium text-white transition hover:bg-slate-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {placing ? 'Processing...' : 'Place Order'}
              </button>
            </aside>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
