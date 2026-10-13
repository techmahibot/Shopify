import { Truck, ShieldCheck, RotateCcw, Headphones, CreditCard, Tag } from 'lucide-react'
import Title from './Title'

const specs = [
  {
    title: 'Free Shipping',
    description: 'Free shipping on all orders above ₹500. Fast and reliable delivery to your doorstep.',
    icon: Truck,
    accent: '#00C950',
  },
  {
    title: 'Secure Payment',
    description: '100% secure and encrypted payment processing. Your financial data is always safe.',
    icon: CreditCard,
    accent: '#6366F1',
  },
  {
    title: '24/7 Support',
    description: 'Our customer support team is available around the clock to assist you with any queries.',
    icon: Headphones,
    accent: '#F59E0B',
  },
  {
    title: 'Easy Returns',
    description: 'Hassle-free 30-day return policy. Not satisfied? We make returns simple.',
    icon: RotateCcw,
    accent: '#EF4444',
  },
  {
    title: 'Quality Guarantee',
    description: 'All products are quality-checked and verified before dispatch.',
    icon: ShieldCheck,
    accent: '#0EA5E9',
  },
  {
    title: 'Best Prices',
    description: "We guarantee the best prices on all products. Find it cheaper? We'll match it.",
    icon: Tag,
    accent: '#EC4899',
  },
]

export default function OurSpec() {
  return (
    <div className="px-6 my-20 max-w-6xl mx-auto">
      <Title
        visibleButton={false}
        title="Our Specifications"
        description="We offer top-tier service and convenience to ensure your shopping experience is smooth, secure and completely hassle-free."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 gap-y-10 mt-16">
        {specs.map((spec, i) => (
          <div
            key={i}
            className="relative h-44 px-8 flex flex-col items-center justify-center w-full text-center border rounded-lg group"
            style={{ backgroundColor: spec.accent + '10', borderColor: spec.accent + '30' }}
          >
            <h3 className="text-slate-800 font-medium">{spec.title}</h3>
            <p className="text-sm text-slate-600 mt-3">{spec.description}</p>
            <div
              className="absolute -top-5 text-white size-10 flex items-center justify-center rounded-md group-hover:scale-105 transition"
              style={{ backgroundColor: spec.accent }}
            >
              <spec.icon size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}