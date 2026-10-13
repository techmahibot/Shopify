import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import authImg from "../assets/log.jpg";
import googleIcon from "../assets/google.svg";
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from "../components/Icons.jsx";
import { useCart } from "../hooks/useCart";

function Login() {
  const inputCls =
    "w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

  const navigate = useNavigate();
  const { refreshCart } = useCart();
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      await api.post("/customers/login", form);
      await refreshCart();
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

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
            New to ShopKart?{" "}
            <Link
              to="/register"
              className="font-semibold text-brand hover:underline"
            >
              Create account
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
                alt="Welcome back to ShopKart"
              />
            </div>

            {/* Right Form Panel */}
            <div className="flex w-full flex-col p-8 sm:p-12 md:w-7/12">
              <div className="mx-auto my-auto w-full max-w-sm">
                <h2 className="text-2xl font-extrabold tracking-tight text-brand-ink sm:text-3xl">
                  Login to ShopKart
                </h2>

                <p className="mb-8 mt-1 text-slate-500">
                  Glad to see you again!
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
                  {/* Email */}
                  <div className="mb-5">
                    <label
                      className="mb-1.5 block text-sm font-medium text-slate-800"
                      htmlFor="login-email"
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-500">
                        <MailIcon />
                      </span>

                      <input
                        id="login-email"
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

                  {/* Password */}
                  <div className="mb-5">
                    <label
                      className="mb-1.5 block text-sm font-medium text-slate-800"
                      htmlFor="login-password"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-500">
                        <LockIcon />
                      </span>

                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className={inputCls}
                        autoComplete="current-password"
                      />

                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-slate-500 hover:text-slate-800"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me Row */}
                  <div className="mb-6 flex items-center justify-between text-sm">
                    <label className="flex cursor-pointer items-center gap-2 text-slate-700">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        className="size-4 cursor-pointer accent-brand"
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />

                      <span className="select-none">Remember me</span>
                    </label>

                    <a
                      href="#forgot"
                      className="font-medium text-brand hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="mt-6 w-full cursor-pointer rounded-lg bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                  <div className="my-5 flex items-center gap-3 text-xs font-medium text-slate-400">
                    <span className="h-px flex-1 bg-slate-200" />
                    OR
                    <span className="h-px flex-1 bg-slate-200" />
                  </div>

                  <button
                    type="button"
                    disabled
                    title="Google sign-in is coming soon"
                    className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-3 text-sm font-medium text-slate-800 opacity-70"
                  >
                    <img src={googleIcon} alt="" className="size-5" />
                    Continue with Google
                  </button>
                </form>

                {/* Register Link */}
                <p className="mt-6 text-center text-sm text-slate-600">
                  New to ShopKart?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-brand hover:underline"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <div>© 2026 ShopKart. All rights reserved.</div>

          <div className="flex gap-6">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#help">Help</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Login;
