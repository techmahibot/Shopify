import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PageTitle({ heading, text, path = '/', linkText }) {
  return (
    <div className="my-6">
      <h2 className="text-2xl font-semibold text-slate-800">{heading}</h2>
      <div className="flex items-center gap-3">
        <p className="text-slate-600">{text}</p>
        {linkText && (
          <Link to={path} className="flex items-center gap-1 text-green-500 text-sm">
            {linkText} <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  )
}