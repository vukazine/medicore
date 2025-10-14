'use client'

import { useState, useEffect } from 'react'
import { sendEmail } from '@/lib/emailjs'

// TypewriterText Component
const TypewriterText = ({ phrases }: { phrases: string[] }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [highlightIndex, setHighlightIndex] = useState(-1)

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    const typeSpeed = 100
    const deleteSpeed = 50
    const delayBetweenPhrases = 2000

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex]
      
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1))
        setHighlightIndex(-1)
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        }
      } else {
        setCurrentText(currentPhrase.slice(0, currentText.length + 1))
        setHighlightIndex(currentText.length)
        // Reset highlight after a brief delay
        setTimeout(() => setHighlightIndex(-1), 200)
        if (currentText === currentPhrase) {
          setTimeout(() => setIsDeleting(true), delayBetweenPhrases)
          return
        }
      }
    }

    const timer = setTimeout(type, isDeleting ? deleteSpeed : typeSpeed)
    return () => clearTimeout(timer)
  }, [currentText, currentPhraseIndex, isDeleting, phrases])

  return (
    <span className="text-emerald-400 relative">
      {currentText.split('').map((char, index) => (
        <span
          key={index}
          className={`transition-all duration-200 ${
            index === highlightIndex
              ? 'bg-emerald-400/20 text-white'
              : ''
          }`}
        >
          {char}
        </span>
      ))}
      <span 
        className={`ml-0.5 inline-block w-0.5 h-[1.1em] bg-emerald-400 relative top-[0.1em] transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </span>
  )
}

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // persist theme
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (saved) {
        setTheme(saved)
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark')
      }
    } catch {}
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])
  const isDark = theme === 'dark'

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    { title: 'Why Our Service', href: '/#why-our-service' },
    { title: 'How It Works', href: '/#how-it-works' },
    { title: 'About Us', href: '/about' }
  ]

  // Hero image carousel state
  const heroImages = [
    '/image/Doctors/image1.jpg',
    '/image/Doctors/image2.jpg',
    '/image/Doctors/image3.jpg'
  ]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Contact form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  // Auto-rotate images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      )
    }, 6000)

    return () => clearInterval(interval)
  }, [])


  // Animated precision component
  const AnimatedPrecision = ({ target = 98.7, duration = 8000 }: { target?: number, duration?: number }) => {
    const [value, setValue] = useState(96.0)
    useEffect(() => {
      let frame: number
      const start = performance.now()
      const startVal = 96.0
      const animate = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
        const current = startVal + (target - startVal) * eased
        setValue(parseFloat(current.toFixed(1)))
        if (progress < 1) frame = requestAnimationFrame(animate)
        else {
          // gentle micro variation every 10s to keep alive
          setTimeout(() => {
            setValue(prev => parseFloat((prev - 0.1).toFixed(1)))
            setTimeout(() => setValue(parseFloat(target.toFixed(1))), 3000)
          }, 10000)
        }
      }
      frame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(frame)
    }, [target, duration])
    return <span className="text-emerald-300 font-semibold tabular-nums">{value.toFixed(1)}% Precision</span>
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const result = await sendEmail(formData)

      if (result.success) {
        setIsSuccess(true)
        setSubmitMessage(result.message)
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          organization: '',
          message: ''
        })
      } else {
        setIsSuccess(false)
        setSubmitMessage(result.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setIsSuccess(false)
      setSubmitMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
  <div className="flex flex-col min-h-screen bg-white text-gray-900 transition-colors duration-300">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md py-3 border-b border-white/10 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#home" className="flex items-center group">
              <img src="/image/logos/logo.png" alt="Vukazine Logo" className="h-9 w-auto transition-transform group-hover:scale-105" />
              <span className="ml-3 text-lg font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Vukazine</span>
            </a>
            
            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <nav className="flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="relative text-gray-300 hover:text-white px-2 py-2 text-[15px] font-medium transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-emerald-400 after:transition-all hover:after:w-full"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
            
            {/* Theme toggle + Auth buttons */}
            <div className="hidden md:flex items-center space-x-5">
              <button
                type="button"
                onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
                className="rounded-lg px-3 py-2 text-[15px] font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Toggle theme"
                title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {isDark ? '☀️ Light' : '🌙 Dark'}
              </button>
              <a
                href="/login"
                className="text-gray-300 hover:text-white px-3 py-2 text-[15px] font-medium transition-colors duration-200 hover:bg-white/5 rounded-md"
              >
                Sign in
              </a>
              <a
                href="#book"
                className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-black hover:from-emerald-500 hover:to-emerald-600 px-5 py-2 text-[15px] font-medium rounded-lg transition-all duration-200 hover:shadow-emerald-400/20 hover:shadow-lg active:scale-95"
              >
                Demo
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'} md:hidden absolute left-0 right-0 top-full px-4 transition-all duration-200`}>
            <div className="mx-auto max-w-7xl">
          </div>
              <div className="bg-black/70 backdrop-blur-lg mt-2 rounded-xl shadow-2xl border border-white/10 p-4">
                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-3 py-2.5 text-[15px] font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </a>
                  ))}
                  <div className="border-t border-white/10 my-3"></div>
                  <a
                    href="/login"
                    className="block px-3 py-2.5 text-[15px] font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign in
                  </a>
                  <a
                    href="#book"
                    className="block px-3 py-2.5 mt-2 text-[15px] font-medium text-center bg-gradient-to-r from-emerald-400 to-emerald-500 text-black hover:from-emerald-500 hover:to-emerald-600 rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
      </header>

      {/* Hero - Fixed for persistent overlay effect */}
      <section id="home" className="fixed top-0 left-0 w-full h-screen bg-black overflow-hidden z-0">
        {/* Background Images Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Doctor ${index + 1}`}
                className="h-full w-full object-cover"
              />
              {/* Dark overlay with gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex min-h-screen items-center pt-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                Eliminate Billing Denials. Accelerate Revenue.
              </h1>
              <p className="mt-4 text-xl text-gray-200 md:text-2xl">
                <TypewriterText phrases={[
                  'Our Code is Clear',
                  'Zero Denials. Guaranteed Precision.',
                  'Faster Payments'
                ]} />
              </p>
              <div className="mt-6 max-w-2xl relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-transparent rounded-full"></div>
                <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-100 backdrop-blur-sm bg-white/5 p-6 rounded-lg border border-white/10 shadow-xl">
                  <span className="text-emerald-400 font-semibold">Vukazine</span> uses{' '}
                  <span className="font-semibold text-white">clinical intelligence</span> to suggest{' '}
                  <span className="font-semibold text-white">perfect codes</span> and{' '}
                  <span className="font-semibold text-white">flag risks</span> before you submit.{' '}
                  <span className="block mt-2 text-emerald-300 font-semibold">
                    It&apos;s guaranteed precision that pays for itself.
                  </span>
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a 
                  href="/signup" 
                  className="rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-6 py-4 text-center text-lg font-medium text-black hover:from-emerald-500 hover:to-emerald-600 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20 active:scale-95"
                >
                  Get Started Free
                </a>
                {/* <a 
                  href="/savings-estimator" 
                  className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-4 text-center text-lg font-medium text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-white/5 active:scale-95"
                >
                  Calculate My Savings
                </a> */}
                {/* <a 
                  href="#how-it-works" 
                  className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-4 text-center text-lg font-medium text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-white/5 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="text-emerald-400">▶</span> Watch the 90-Second Demo
                </a> */}
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-300">
                <div>⏱ Setup in Days</div>
                <div>🔒 HIPAA Compliant</div>
                <div>🧪 2-Week Performance Guarantee</div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-3 w-3 rounded-full transition-colors ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Content sections container - slides over the fixed hero */}
      <div className={`relative z-10 hero-overlay-content ${isDark ? 'dark' : ''}`} style={{ marginTop: '100vh' }}>

      {/* Trust & Proof (Security + ROI + FAQ) — themable */}
      <section id="trust" className={`py-20 scroll-mt-24 ${isDark ? 'bg-black/95' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-12 text-center">
            <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Trust and Compliance are Built-In.</h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Security & Compliance */}
            <div className={`flex flex-col justify-between rounded-2xl p-6 shadow-sm w-full min-h-[370px] border ${isDark ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-white border-gray-200 text-gray-900'}`} style={{margin:'0'}}>
              <div>
                <h3 className={`mb-2 text-sm font-medium ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>Compliance checklist</h3>
                <ul className="space-y-3 text-base font-medium">
                  <li className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500 min-w-[18px] min-h-[18px]"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="2"/><path d="M7 11l2.5 2.5L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Role‑based access control and SSO support
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500 min-w-[18px] min-h-[18px]"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="2"/><path d="M7 11l2.5 2.5L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Access logging and full audit trails
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500 min-w-[18px] min-h-[18px]"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="2"/><path d="M7 11l2.5 2.5L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    PHI pseudonymisation options
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500 min-w-[18px] min-h-[18px]"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="2"/><path d="M7 11l2.5 2.5L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Data locality controls (EU/SA/US)
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500 min-w-[18px] min-h-[18px]"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="2"/><path d="M7 11l2.5 2.5L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Regular security audits and penetration testing
                  </li>
                </ul>
              </div>
            </div>

            {/* Trust Indicators (styled as Compliance checklist) */}
            <div id="faq" className={`flex flex-col justify-between rounded-2xl p-6 shadow-sm w-full min-h-[370px] border ${isDark ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-white border-gray-200 text-gray-900'}`} style={{margin:'0'}}>
              <div>
                <h3 className={`mb-2 text-sm font-medium ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>Trust Indicators</h3>
                <div className={`mb-4 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Enterprise Security Standards</div>
                <ul className="space-y-3 text-base font-medium">
                  <li className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500 min-w-[18px] min-h-[18px]"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="2"/><path d="M7 11l2.5 2.5L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    POPIA Ready
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500 min-w-[18px] min-h-[18px]"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="2"/><path d="M7 11l2.5 2.5L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    HIPAA Aligned
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500 min-w-[18px] min-h-[18px]"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="2"/><path d="M7 11l2.5 2.5L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    AES-256 Encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500 min-w-[18px] min-h-[18px]"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="2"/><path d="M7 11l2.5 2.5L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    99.9% Uptime
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500 min-w-[18px] min-h-[18px]"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="2"/><path d="M7 11l2.5 2.5L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Purpose-Built for Healthcare
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Our Service Section Title */}
      <section className={`py-12 ${isDark ? 'bg-black/95' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="text-center">
            <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Why Our Service</h2>
          </div>
        </div>
      </section>

      {/* Why Our Service - Alternating Layout */}
  <section id="why-our-service" className={`scroll-mt-24 ${isDark ? 'bg-black/95' : 'bg-white'}`}>
    
    {/* SECTION 1: Image Right - 60/40 Split */}
    <div className={`py-20 ${isDark ? 'bg-black/95' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-5 lg:items-center">
          {/* Left: Content (60%) */}
          <div className="lg:col-span-3">
            <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide uppercase mb-6 ${isDark ? 'border border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
              <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} /> CLINICAL INTELLIGENCE
            </div>
            <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Code Smarter. <span className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Get Paid Faster.</span>
            </h2>
            <p className={`text-lg md:text-xl leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Stop billing denials at the source. We turn messy, unstructured clinical documentation into perfect, auditable claims before they ever leave your office.
            </p>
            <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Our platform analyzes clinical notes in real-time, suggesting accurate codes while flagging potential issues before submission. Your team stays in control, while our system learns and improves with every review.
            </p>
            <a href="#how-it-works" className={`inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-semibold transition-all duration-300 active:scale-95 ${isDark ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 text-black hover:brightness-110 shadow-lg' : 'bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 hover:shadow-xl'}`}>
              See How It Works
            </a>
          </div>

          {/* Right: Image with Precision Badge (40%) */}
          <div className="lg:col-span-2">
            <div className="relative group">
              <div className={`relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'border border-white/10 bg-white/5' : 'border border-gray-200 bg-white'}`}>
                <div className="aspect-[4/5] w-full relative">
                  <img src="/image/billing/image2.jpg" alt="Billing intelligence" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000" />
                  {/* Precision Badge Overlay */}
                  <div className={`absolute bottom-8 right-8 rounded-xl px-5 py-4 shadow-xl backdrop-blur-sm ${isDark ? 'bg-black/80 border border-white/20 text-gray-100' : 'bg-white/90 border border-gray-200 text-gray-800'}`}>
                    <div className="text-xs font-medium mb-1">Coding Accuracy</div>
                    <AnimatedPrecision />
                    <div className={`mt-1 text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Last 7 days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* SECTION 2: Full-Width 4-Column Feature Cards */}
    <div className={`py-20 ${isDark ? 'bg-gradient-to-b from-black/95 to-gray-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Zero-Error Prevention',
              desc: "Flag and fix risky claims before they're ever submitted to the payer.",
              icon: (
                <svg className='h-12 w-12' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'><path d='M12 3l7 4v5.2c0 4.2-2.8 8-7 9-4.2-1-7-4.8-7-9V7l7-4z'/><path d='M9.5 12.5l2 2 3.5-4'/></svg>
              ),
            },
            {
              title: 'Precision Coding',
              desc: 'Generate perfect ICD-10 / CPT codes with full rationale for every suggestion.',
              icon: (
                <svg className='h-12 w-12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M5 3l1.8 4.2L11 9 6.8 10.8 5 15l-1.8-4.2L-1 9l4.2-1.8L5 3z'/><path d='M16 13l1 2.2L20 16l-3 1-1 3-1-3-3-1 3-.8L16 13z'/><path d='M14 3l.6 1.4L16 5l-1.4.6L14 7l-.6-1.4L12 5l1.4-.6L14 3z'/></svg>
              ),
            },
            {
              title: 'Seamless Integration',
              desc: 'Plug into your EHR/billing system via API, CSV, or SFTP sync in days.',
              icon: (
                <svg className='h-12 w-12' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'><path d='M10.5 13.5l3-3'/><path d='M8 12a4 4 0 010-5.7l2.3-2.3a4 4 0 015.7 5.7l-.7.7'/><path d='M16 12a4 4 0 010 5.7l-2.3 2.3a4 4 0 01-5.7-5.7l.7-.7'/></svg>
              ),
            },
            {
              title: 'Human-in-the-Loop',
              desc: 'Your coders keep control while the system learns from their expertise.',
              icon: (
                <svg className='h-12 w-12' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'><path d='M16 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2'/><circle cx='9' cy='7' r='4'/><path d='M16.5 11.5l1.5 1.5 3-3'/></svg>
              ),
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 flex flex-col items-center text-center ${
                isDark 
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-3' 
                  : 'bg-white border border-gray-200 shadow-lg hover:border-emerald-400 hover:shadow-2xl hover:-translate-y-3'
              }`}
            >
              <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${isDark ? 'ring-2 ring-white/20' : 'ring-2 ring-emerald-200/50'}`}>
                {feature.icon}
              </div>
              <h4 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h4>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{feature.desc}</p>
              <div className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl ${isDark ? 'bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent' : 'bg-gradient-to-br from-emerald-50 via-emerald-100/50 to-transparent'}`} />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* SECTION 3: Enterprise-Ready - Centered Content */}
    <div className={`py-20 ${isDark ? 'bg-black/95' : 'bg-white'}`}>
      <div className="mx-auto max-w-4xl px-6 md:px-10 text-center">
        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide uppercase mb-6 ${isDark ? 'border border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
          <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} /> BUILT FOR HEALTHCARE
        </div>
        <h3 className={`text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Enterprise-Ready from Day One
        </h3>
        <p className={`text-lg leading-relaxed mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Built with healthcare compliance at its core. POPIA-ready, HIPAA-aligned, and designed for the demanding requirements of modern medical practices.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { label: 'Role-based access control', sublabel: 'Granular permissions for your entire team' },
            { label: 'Full audit trails', sublabel: 'Track every change, every review, every decision' },
            { label: 'Data locality controls', sublabel: 'Your data stays where you need it: EU, SA, or US' },
          ].map((benefit, idx) => (
            <div key={idx} className={`p-6 rounded-xl transition-colors text-center ${isDark ? 'hover:bg-white/5 border border-white/10' : 'hover:bg-gray-50 border border-gray-200'}`}>
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white mx-auto mb-4`}>
                <svg className='h-6 w-6' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'><path d='M5 13l4 4L19 7'/></svg>
              </div>
              <div>
                <div className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{benefit.label}</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{benefit.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  </section>

      {/* Trust Logos removed per request */}

      {/* How it works — themable */}
  <section id="how-it-works" className={`py-20 scroll-mt-24 ${isDark ? 'bg-black/95' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-14 text-center">
            <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>How it works</h2>
            <p className={`mt-4 text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Connect quickly, analyze accurately, and export clean, denial‑resistant claims.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: '1', title: 'Connect Securely', body: 'No EHR replacement required. We integrate securely via API, CSV, or SFTP file export in days.' },
              { step: '2', title: 'Analyze Notes', body: 'Clinical intelligence securely parses and normalizes your documentation.' },
              { step: '3', title: 'Suggest & Flag', body: 'Accurate ICD‑10/CPT codes are suggested, with red flags on risks and missing info.' },
              { step: '4', title: 'Finalize & Export', body: 'Your coders review/approve in the system, then export the clean claim.' }
            ].map((s, i) => (
              <div key={s.step} className={`group relative overflow-hidden p-6 transition-all duration-300 rounded-2xl ${isDark ? 'border border-white/10 bg-white/5 hover:border-emerald-400/40 hover:bg-emerald-400/10' : 'border border-gray-200 bg-white shadow-sm hover:border-emerald-300 hover:bg-emerald-50/30'}`}>
                <div className={`mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-semibold text-white shadow-inner ${isDark ? 'ring-1 ring-white/20' : 'ring-1 ring-emerald-200/50'}`}>
                  {s.step}
                </div>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{s.body}</p>
                {/* subtle progress indicator underline */}
                <div className={`pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition ${isDark ? 'bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-teal-400/0' : 'bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-teal-400/0'}`} />
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a href="#book" className={`inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm font-semibold transition active:scale-95 ${isDark ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 text-black hover:brightness-105' : 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'}`}>
              Start in Days — Book a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Security — themable */}
  <section id="security" className={`py-20 scroll-mt-24 ${isDark ? 'bg-black/95' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-2 items-start">
            <div className={``}>
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide uppercase ${isDark ? 'border border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} /> Security
              </div>
              <h2 className={`mt-4 text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Security & compliance</h2>
              <p className={`mt-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Designed for healthcare: least‑privilege access, full audit logs, data retention controls, and private deployment options.</p>
              <ul className={`mt-6 list-inside list-disc space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>Encryption in transit and at rest (TLS, AES‑256)</li>
                <li>Role‑based access control and SSO support</li>
                <li>POPIA/HIPAA‑aligned data handling</li>
                <li>On‑prem or VPC deployment available</li>
                <li>Regular security audits and penetration testing</li>
              </ul>
            </div>
            <div className={`rounded-2xl p-6 shadow-sm ${isDark ? 'border border-white/10 bg-white/5 text-gray-200' : 'border border-gray-200 bg-white text-gray-800'}`}>
              <div className={`mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Compliance checklist</div>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>☑ Data minimisation</li>
                <li>☑ Access logging and full audit trails</li>
                <li>☑ PHI pseudonymisation options</li>
                <li>☑ Data locality controls (EU/SA/US)</li>
                <li>☑ SOC 2 Type II compliant</li>
              </ul>
              <a href="#book" className={`mt-6 inline-block rounded-xl px-4 py-2 text-sm font-semibold ${isDark ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:brightness-110' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>Contact us for security details</a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing removed per request */}

      {/* CTA Section - Start Free Trial */}
      <section className={`py-20 ${isDark ? 'bg-gradient-to-r from-emerald-900/20 via-black/95 to-teal-900/20' : 'bg-gradient-to-r from-emerald-50 via-white to-teal-50'}`}>
        <div className="mx-auto max-w-4xl px-6 md:px-10 text-center">
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide uppercase mb-6 ${isDark ? 'border border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
            <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} /> Ready to Get Started?
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Start Your Free Trial Today
          </h2>
          
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Join leading clinics across South Africa who trust Vukazine to eliminate billing denials. 
            Setup takes days, not months.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/signup" 
              className={`rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-lg active:scale-95 ${isDark ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-black hover:from-emerald-500 hover:to-emerald-600 hover:shadow-emerald-400/20' : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 hover:shadow-emerald-500/20'}`}
            >
              Start Free Trial
            </a>
            
            <a 
              href="/login" 
              className={`rounded-xl border px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-lg active:scale-95 ${isDark ? 'border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30' : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-400'}`}
            >
              Sign In
            </a>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              14-day free trial
            </div>
            <div className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card required
            </div>
            <div className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Setup in days
            </div>
          </div>
        </div>
      </section>

      {/* Standalone FAQ removed per request; FAQ now lives in Trust section */}

      {/* Link to FAQ page before Get started section */}
      <div className="py-10 text-center">
        <a href="/faqs" className={`inline-block rounded-xl px-6 py-3 text-lg font-semibold transition active:scale-95 ${isDark ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 text-black hover:brightness-105' : 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'}`}>View All FAQs</a>
      </div>

      {/* Contact — themable */}
      <section id="book" className={`py-20 ${isDark ? 'bg-black/95' : 'bg-gray-50'}`}>
        <div className="mx-auto max-w-7xl px-4 md:px-10">
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div className={``}>
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide uppercase ${isDark ? 'border border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} /> Get Started
              </div>
              <h2 className={`mt-4 text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Get Started with Vukazine</h2>
              <p className={`mt-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Fill in your details and we'll get in touch to discuss how Vukazine can reduce your billing denials.</p>
              <ul className={`mt-4 list-inside list-disc space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>Personalized consultation for your clinic</li>
                <li>Free assessment of your current coding process</li>
                <li>No obligation, no jargon</li>
              </ul>
            </div>
            <div className={`rounded-2xl p-6 shadow-sm ${isDark ? 'border border-white/10 bg-white/5 text-white' : 'border border-gray-200 bg-white text-gray-900'}`}>
              {submitMessage && (
                <div className={`${
                  isSuccess 
                    ? (isDark ? 'mb-4 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-4 text-emerald-200' : 'mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800') 
                    : (isDark ? 'mb-4 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-red-200' : 'mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800')
                }`}>
                  {submitMessage}
                </div>
              )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Full Name *</label>
                    <input type="text" id="fullName" name="fullName" required value={formData.fullName} onChange={handleInputChange} className={`w-full rounded-lg px-3 py-2 placeholder:text-gray-400 border ${isDark ? 'border-white/10 bg-white/5 text-white focus:border-emerald-500' : 'border-gray-300 bg-white text-gray-900 focus:border-emerald-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`} placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Email Address *</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className={`w-full rounded-lg px-3 py-2 placeholder:text-gray-400 border ${isDark ? 'border-white/10 bg-white/5 text-white focus:border-emerald-500' : 'border-gray-300 bg-white text-gray-900 focus:border-emerald-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`} placeholder="your.email@hospital.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Contact Number *</label>
                    <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} className={`w-full rounded-lg px-3 py-2 placeholder:text-gray-400 border ${isDark ? 'border-white/10 bg-white/5 text-white focus:border-emerald-500' : 'border-gray-300 bg-white text-gray-900 focus:border-emerald-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`} placeholder="+27 XX XXX XXXX" />
                  </div>
                  <div>
                    <label htmlFor="organization" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Clinic/Hospital Name</label>
                    <input type="text" id="organization" name="organization" value={formData.organization} onChange={handleInputChange} className={`w-full rounded-lg px-3 py-2 placeholder:text-gray-400 border ${isDark ? 'border-white/10 bg-white/5 text-white focus:border-emerald-500' : 'border-gray-300 bg-white text-gray-900 focus:border-emerald-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`} placeholder="Your clinic or hospital name" />
                  </div>
                  <div>
                    <label htmlFor="message" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>How can we help? (Optional)</label>
                    <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleInputChange} className={`w-full rounded-lg px-3 py-2 placeholder:text-gray-400 border ${isDark ? 'border-white/10 bg-white/5 text-white focus:border-emerald-500' : 'border-gray-300 bg-white text-gray-900 focus:border-emerald-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`} placeholder="Tell us about your current coding challenges..." />
                  </div>
                  <button type="submit" className={`w-full rounded-lg px-4 py-3 font-medium flex items-center justify-center transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`} disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Request Demo'}</button>
                  <p className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>By submitting this form, you agree to our{' '}
                    <button 
                      type="button"
                      onClick={() => setShowPrivacyModal(true)}
                      className={`underline hover:no-underline ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}
                    >
                      Privacy Policy
                    </button>.
                  </p>
                </form>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPrivacyModal(false)}>
          <div className={`max-w-2xl w-full rounded-xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</h2>
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className={`text-2xl font-bold hover:opacity-70 transition-opacity ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              >
                ×
              </button>
            </div>
            
            <div className={`space-y-4 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p>
                <strong className={isDark ? 'text-yellow-400' : 'text-yellow-700'}>Last updated: 9 October 2025</strong>
              </p>
              
              <div>
                <h3 className={`font-bold text-base mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Beta Testing Phase</h3>
                <p>Vukazine is currently validating market demand before official registration.</p>
              </div>

              <div>
                <h3 className={`font-bold text-base mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>What we collect</h3>
                <p>Name, email, phone, clinic name, and your inquiry details.</p>
              </div>

              <div>
                <h3 className={`font-bold text-base mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>How we use it</h3>
                <p>To contact you about Vukazine and schedule a personalized demo to understand your coding challenges.</p>
              </div>

              <div>
                <h3 className={`font-bold text-base mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Storage</h3>
                <p>Your information is sent directly to our team via secure email and stored only in our email system. Data stays in South Africa.</p>
              </div>

              <div>
                <h3 className={`font-bold text-base mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Your rights</h3>
                <p>Request deletion anytime at <a href="mailto:info@vukazine.com" className={`underline hover:no-underline ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>info@vukazine.com</a>.</p>
              </div>

              <div>
                <h3 className={`font-bold text-base mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Next steps</h3>
                <p>Once we validate demand with clinics like yours, we&apos;ll officially register Vukazine (Pty) Ltd and publish a full POPIA-compliant Privacy Policy.</p>
              </div>

              <div className={`mt-6 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Questions?</p>
                <p className="mt-1">Contact us at <a href="mailto:info@vukazine.com" className={`underline hover:no-underline ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>info@vukazine.com</a></p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${isDark ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer removed per request */}
      </div>
    </div>
  );
}
