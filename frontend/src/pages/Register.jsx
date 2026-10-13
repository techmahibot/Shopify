import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api.js'
import authImg from '../assets/reg.jpg'
import googleIcon from '../assets/google.svg'
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon
} from '../components/Icons.jsx'

function Register() {
  const inputCls =
    'w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15'

  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.fullName || !form.email || !form.phone || !form.password) {
      setError('Please fill in all required fields')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!agreed) {
      setError('Please accept the Terms of Service and Privacy Policy')
      return
    }

    try {
      setLoading(true)

      const payload = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.trim(),
      }

      await api.post('/customers/register', payload)
      navigate('/login')
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong, try again'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f6f2] font-jakarta text-slate-700">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-10">

        {/* Top bar */}
        <header className="flex items-center justify-between gap-4 py-6">
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-tight text-brand"
          >
            Shop<span className="text-brand-ink">Kart</span>
          </Link>

          <div className="text-right text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-brand hover:underline"
            >
              Login
            </Link>
          </div>
        </header>

        {/* Main Card */}
        <main className="flex flex-1 items-center py-4">
          <div className="flex min-h-[640px] w-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 lg:min-h-[780px]">

            {/* Left Visual Banner */}
            <div className="relative hidden w-5/12 md:block">
              <img
                className="absolute inset-0 size-full object-cover object-left"
                src={authImg}
                alt="Shop smarter, live better"
              />
            </div>

            {/* Right Form Panel */}
            <div className="flex w-full flex-col p-8 sm:p-12 md:w-7/12">
              <div className="mx-auto my-auto w-full max-w-sm">

                <h2 className="text-2xl font-extrabold tracking-tight text-brand-ink sm:text-3xl">
                  Create your account
                </h2>

                <p className="mb-8 mt-1 text-slate-500">
                  Join ShopKart in just a few steps.
                </p>

                {error && (
                  <div
                    role="alert"
                    className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>

                  {/* Full Name */}
                  <div className="mb-5">
                    <label
                      className="mb-1.5 block text-sm font-medium text-slate-800"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-500">
                        <UserIcon />
                      </span>

                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={inputCls}
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label
                      className="mb-1.5 block text-sm font-medium text-slate-800"
                      htmlFor="email"
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-500">
                        <MailIcon />
                      </span>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={inputCls}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="mb-5">
                    <label
                      className="mb-1.5 block text-sm font-medium text-slate-800"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-500">
                        <PhoneIcon />
                      </span>

                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={inputCls}
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-5">
                    <label
                      className="mb-1.5 block text-sm font-medium text-slate-800"
                      htmlFor="password"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-500">
                        <LockIcon />
                      </span>

                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className={inputCls}
                        autoComplete="new-password"
                      />

                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-slate-500 hover:text-slate-800"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-5">
                    <label
                      className="mb-1.5 block text-sm font-medium text-slate-800"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-500">
                        <LockIcon />
                      </span>

                      <input
                        id="confirmPassword"
                        type={showConfirm ? 'text' : 'password'}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        className={inputCls}
                      />

                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-slate-500 hover:text-slate-800"
                        onClick={() => setShowConfirm(!showConfirm)}
                        tabIndex={-1}
                        aria-label={
                          showConfirm ? 'Hide password' : 'Show password'
                        }
                      >
                        {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>

                  {/* Terms and Privacy */}
                  <label className="mb-6 flex cursor-pointer items-start gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 size-4 cursor-pointer accent-brand"
                    />

                    <span>
                      I agree to the{' '}
                      <a
                        href="#terms"
                        className="font-medium text-brand hover:underline"
                      >
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a
                        href="#privacy"
                        className="font-medium text-brand hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="mt-1 w-full cursor-pointer rounded-lg bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </button>

                  {/* OR Divider */}
                  <div className="my-5 flex items-center gap-3 text-xs font-medium text-slate-400">
                    <span className="h-px flex-1 bg-slate-200" />
                    OR
                    <span className="h-px flex-1 bg-slate-200" />
                  </div>

                  {/* Google Sign Up */}
                  <button
                    type="button"
                    disabled
                    title="Google sign-in is coming soon"
                    className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-3 text-sm font-medium text-slate-800 opacity-70"
                  >
                    <img src={googleIcon} alt="" className="size-5" />
                    Sign up with Google
                  </button>
                </form>

                {/* Login Link */}
                <p className="mt-6 text-center text-sm text-slate-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-semibold text-brand hover:underline"
                  >
                    Login
                  </Link>
                </p>

              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <div>
            © 2026 ShopKart. All rights reserved.
          </div>

          <div className="flex gap-6">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#help">Help</a>
          </div>
        </footer>

      </div>
    </div>
  )
}

export default Register
