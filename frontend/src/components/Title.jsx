import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Title({ title, description, visibleButton = true, href = '' }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
      <div className="flex items-center gap-5 text-sm text-slate-600 mt-2">
        <p className="max-w-lg text-center">{description}</p>
        {visibleButton && href && (
          <Link to={href} className="text-green-500 flex items-center gap-1 whitespace-nowrap">
            View more <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  )
}