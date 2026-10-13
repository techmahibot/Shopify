import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import api from "../services/api.js";
import Navbar from "../components/Navbar.jsx";
import Banner from "../components/Banner.jsx";
import Hero from "../components/Hero.jsx";
import BestSelling from "../components/BestSelling.jsx";
import OurSpec from "../components/OurSpec.jsx";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  LockIcon,
  CheckCircleIcon,
} from "../components/Icons.jsx";

function Home() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/customers/me");
        setCustomer(res.data?.customer || res.data);
      } catch (err) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="home-loading-shell">
        <div className="spinner"></div>
        <p>Loading your ShopKart experience...</p>
      </div>
    );
  }

  if (!customer) return null;

  return (
    <div className="home-page-wrapper">
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      <Banner />
      <Navbar customer={customer} onProfileClick={() => setShowProfile(true)} />

      <Hero />
      <BestSelling />
      <OurSpec />

       <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 pb-10 border-b border-slate-200">
            <div className="max-w-sm">
              <Link to="/home" className="text-3xl font-semibold text-slate-800">
                Shop<span className="text-green-600">Kart</span>
              </Link>
              <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                Your destination for electronics, fashion, books and home essentials — real prices, smooth shopping.
              </p>
            </div>

            <div className="flex flex-wrap gap-10 text-sm">
              <div>
                <h3 className="font-medium text-slate-700 mb-4">Shop by Category</h3>
                <ul className="space-y-2.5 text-slate-500">
                  <li><Link to="/products?category=Electronics" className="hover:text-slate-800 transition">Electronics</Link></li>
                  <li><Link to="/products?category=Fashion" className="hover:text-slate-800 transition">Fashion</Link></li>
                  <li><Link to="/products?category=Books" className="hover:text-slate-800 transition">Books</Link></li>
                  <li><Link to="/products?category=Home" className="hover:text-slate-800 transition">Home</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-slate-700 mb-4">Support</h3>
                <ul className="space-y-2.5 text-slate-500">
                  <li><a href="#terms" className="hover:text-slate-800 transition">Terms</a></li>
                  <li><a href="#privacy" className="hover:text-slate-800 transition">Privacy</a></li>
                  <li><a href="#help" className="hover:text-slate-800 transition">Help</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-slate-700 mb-4">Contact</h3>
                <ul className="space-y-2.5 text-slate-500">
                  <li className="flex items-center gap-2"><Mail size={14} /> support@shopkart.com</li>
                  <li className="flex items-center gap-2"><Phone size={14} /> +91 98765 43210</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="pt-6 text-sm text-slate-500">© 2026 ShopKart. All rights reserved.</p>
        </div>
      </footer>
      
      {showProfile && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.55)" }}
          onClick={() => setShowProfile(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-5 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Personal Profile & Details</h2>
                <p className="text-sm text-slate-500 mt-1">Manage your contact information and linked ShopKart credentials.</p>
              </div>
              <div className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
                <CheckCircleIcon />
                <span>Active Account</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-100 rounded-xl px-5 py-4">
                <div className="size-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                  <UserIcon />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Full Name</p>
                  <p className="text-sm font-semibold text-slate-800 truncate">{customer.fullName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-100 rounded-xl px-5 py-4">
                <div className="size-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                  <MailIcon />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Email Address</p>
                  <p className="text-sm font-semibold text-slate-800 truncate">{customer.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-100 rounded-xl px-5 py-4">
                <div className="size-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                  <PhoneIcon />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Phone Number</p>
                  <p className="text-sm font-semibold text-slate-800 truncate">{customer.phone || "+91 98765 43210"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-100 rounded-xl px-5 py-4">
                <div className="size-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                  <LockIcon />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Customer ID</p>
                  <p className="text-sm font-semibold text-slate-800 font-mono truncate">{customer._id || "SK-893421"}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowProfile(false)}
              className="mt-7 w-full text-sm font-medium py-2.5 rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;