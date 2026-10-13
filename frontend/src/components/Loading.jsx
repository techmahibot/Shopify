export default function Loading({ text = 'Loading...' }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="size-12 border-4 border-slate-200 border-t-green-500 rounded-full animate-spin" />
      <p className="text-slate-500 text-sm">{text}</p>
    </div>
  )
}