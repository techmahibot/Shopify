import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'

export default function MainLayout({ children }) {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}