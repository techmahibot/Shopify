import { ArrowRight, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CategoriesMarquee from './CategoriesMarquee'
import heroModel from '../assets/hero_model_img.png'
import heroImg1 from '../assets/hero_product_img1.png'
import heroImg2 from '../assets/hero_product_img2.png'

export default function Hero() {
  return (
    <div className="mx-6">
      <div className="flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10">
        <div className="relative flex-1 flex flex-col bg-green-200 rounded-3xl xl:min-h-100 group overflow-hidden">
          <div className="p-5 sm:p-16">
            <div className="inline-flex items-center gap-3 bg-green-300 text-green-600 pr-4 p-1 rounded-full text-xs sm:text-sm">
              <span className="bg-green-600 px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs">NEW</span>
              Free Shipping on Orders Above ₹500!
              <ChevronRight className="group-hover:ml-2 transition-all" size={16} />
            </div>
            <h2 className="text-3xl sm:text-5xl leading-[1.2] my-3 font-medium bg-gradient-to-r from-slate-600 to-[#A0FF74] bg-clip-text text-transparent max-w-xs sm:max-w-md">
              Products you'll love. Prices you'll trust.
            </h2>
            <div className="text-slate-800 text-sm font-medium mt-4 sm:mt-8">
              <p>Starts from</p>
              <p className="text-3xl">₹299</p>
            </div>
            <Link
              to="/products"
              className="inline-block bg-slate-800 text-white text-sm py-2.5 px-7 sm:py-5 sm:px-12 mt-4 sm:mt-10 rounded-md hover:bg-slate-900 hover:scale-103 active:scale-95 transition"
            >
              SHOP NOW
            </Link>
          </div>
          <img className="sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm object-contain" src={heroModel} alt="hero" />
        </div>

        <div className="flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600">
          <Link to="/products?category=Electronics" className="flex-1 flex items-center justify-between w-full bg-orange-200 rounded-3xl p-6 px-8 group">
            <div>
              <p className="text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#FFAD51] bg-clip-text text-transparent max-w-40">Electronics</p>
              <p className="flex items-center gap-1 mt-4">View more <ArrowRight className="group-hover:ml-2 transition-all" size={18} /></p>
            </div>
            <img className="w-32" src={heroImg1} alt="product" />
          </Link>

          <Link to="/products?sortBy=price-asc" className="flex-1 flex items-center justify-between w-full bg-blue-200 rounded-3xl p-6 px-8 group">
            <div>
              <p className="text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#78B2FF] bg-clip-text text-transparent max-w-40">Best Prices</p>
              <p className="flex items-center gap-1 mt-4">View more <ArrowRight className="group-hover:ml-2 transition-all" size={18} /></p>
            </div>
            <img className="w-32" src={heroImg2} alt="product" />
          </Link>
        </div>
      </div>

      <CategoriesMarquee />
    </div>
  )
}