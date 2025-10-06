'use client'

import { useState, useEffect } from 'react'

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
    { title: 'FAQ', href: '/#faq' },
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        setSubmitMessage(data.message)
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
        setSubmitMessage(data.error || 'Something went wrong. Please try again.')
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
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <nav className="flex items-center space-x-6">
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
              
              {/* Theme toggle + Auth buttons */}
              <div className="flex items-center space-x-5 ml-10 pl-10 border-l border-white/10">
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
                  href="#signin"
                  className="text-gray-300 hover:text-white px-3 py-2 text-[15px] font-medium transition-colors duration-200 hover:bg-white/5 rounded-md"
                >
                  Sign in
                </a>
                <a
                  href="#demo"
                  className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-black hover:from-emerald-500 hover:to-emerald-600 px-5 py-2 text-[15px] font-medium rounded-lg transition-all duration-200 hover:shadow-emerald-400/20 hover:shadow-lg active:scale-95"
                >
                  Demo
                </a>
              </div>
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
          <div 
            className={`${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'} md:hidden absolute left-0 right-0 top-full px-4 transition-all duration-200`}
          >
            <div className="mx-auto max-w-7xl">
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
                    href="#signin"
                    className="block px-3 py-2.5 text-[15px] font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign in
                  </a>
                  <a
                    href="#demo"
                    className="block px-3 py-2.5 mt-2 text-[15px] font-medium text-center bg-gradient-to-r from-emerald-400 to-emerald-500 text-black hover:from-emerald-500 hover:to-emerald-600 rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative bg-black overflow-hidden min-h-screen">
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
                  'Zero Denials',
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
                    It's guaranteed precision that pays for itself.
                  </span>
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a 
                  href="/savings-estimator" 
                  className="rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-6 py-4 text-center text-lg font-medium text-black hover:from-emerald-500 hover:to-emerald-600 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20 active:scale-95"
                >
                  Calculate My Savings
                </a>
                <a 
                  href="#how-it-works" 
                  className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-4 text-center text-lg font-medium text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-white/5 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="text-emerald-400">▶</span> Watch the 90-Second Demo
                </a>
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

      {/* Trust & Proof (Security + ROI + FAQ) — themable */}
  <section id="trust" className={`py-20 scroll-mt-24 ${isDark ? 'bg-black/95' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-12 text-center">
            <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Trust and Compliance are Built-In.</h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Security & Compliance */}
            <div>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Security & Compliance</h3>
              <p className={`mt-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Designed for healthcare: least‑privilege access, auditability, retention controls, and private deployment options.</p>
              <ul className={`mt-6 space-y-2 list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>Encryption in transit and at rest (TLS, AES‑256)</li>
                <li>POPIA/HIPAA‑aligned data handling</li>
                <li>Data minimisation by design</li>
              </ul>
              <div className={`mt-6 rounded-2xl p-6 shadow-sm ${isDark ? 'border border-white/10 bg-white/5 text-gray-200' : 'border border-gray-200 bg-white text-gray-800'}`}>
                <div className={`mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Compliance checklist</div>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>☑ Role‑based access control and SSO support</li>
                  <li>☑ Access logging and full audit trails</li>
                  <li>☑ PHI pseudonymisation options</li>
                  <li>☑ Data locality controls (EU/SA/US)</li>
                </ul>
                <a href="#book" className={`mt-6 inline-block rounded-xl px-4 py-2 text-sm font-semibold ${isDark ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:brightness-110' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>Contact us for security details</a>
              </div>
            </div>

            {/* Results + FAQs */}
            <div className="space-y-6">
              {/* ROI / Results */}
              <div className={`rounded-2xl p-6 shadow-sm ${isDark ? 'border border-white/10 bg-white/5' : 'border border-gray-200 bg-white'}`}>
                <div className={`text-sm font-medium ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>Results</div>
                <h3 className={`mt-1 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Lower denials. Faster reimbursements. Less manual coding.</h3>
                <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>See projected impact for your workflow in minutes.</p>
                <a href="#book" className={`mt-4 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold ${isDark ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 text-black hover:brightness-105' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>Calculate My Savings</a>
              </div>

              {/* FAQs (anchor preserved for nav) */}
              <div id="faq" className={`rounded-2xl p-6 shadow-sm scroll-mt-24 ${isDark ? 'border border-white/10 bg-white/5' : 'border border-gray-200 bg-white'}`}>
                <div className={`mb-3 text-sm font-medium ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>FAQs</div>
                <div className="space-y-4">
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Do you replace our EHR?</h4>
                    <p className={`mt-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>No. Vukazine plugs into your existing EHR/billing via API, CSV, or SFTP.</p>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>How fast is onboarding?</h4>
                    <p className={`mt-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Small clinics are live in days; larger hospitals typically within a few weeks.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Clinical Intelligence Feature Banner (Hero-themed) */}
  <section id="why-our-service" className={`py-20 scroll-mt-24 ${isDark ? 'bg-black/95' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-20 text-center">
            <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Why Our Service
            </h2>
          </div>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left Visual Panel */}
            <div className="relative group">
              <div className={`relative overflow-hidden rounded-3xl shadow-xl ${isDark ? 'border border-white/10 bg-white/5' : 'border border-gray-200 bg-white'}`}>
                {/* Replace with real artwork later */}
                <div className="aspect-[4/5] w-full relative">
                  <img src="/image/billing/image2.jpg" alt="Billing intelligence" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000" />
                  {/* Floating mini cards */}
                  <div className={`absolute top-6 left-6 rounded-xl px-4 py-3 text-xs flex items-center gap-2 animate-[float_8s_ease-in-out_infinite] shadow-sm ${isDark ? 'bg-black/70 border border-white/10 text-gray-200' : 'bg-white border border-gray-200 text-gray-700'}`}>
                    <span className={`h-2 w-2 rounded-full animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
                    ICD-10 Mapping Active
                  </div>
                  <div className={`absolute bottom-10 right-6 rounded-xl px-4 py-3 text-xs shadow-sm flex flex-col gap-1 animate-[float_7s_ease-in-out_infinite_reverse] ${isDark ? 'bg-black/70 border border-white/10 text-gray-200' : 'bg-white border border-gray-200 text-gray-700'}`}>
                    <AnimatedPrecision />
                    <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Last 7 days</span>
                  </div>
                  <div className={`absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-xl px-5 py-3 text-sm font-medium shadow-sm ${isDark ? 'bg-emerald-500/15 border border-emerald-300/30 text-emerald-100' : 'bg-emerald-50 border border-emerald-200 text-emerald-800'}`}>
                    <div className="flex items-center gap-2">
                      <span>Claim Risk Scan</span>
                      <span className={`h-2 w-2 rounded-full animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
                    </div>
                    <div className={`mt-2 h-1.5 w-40 overflow-hidden rounded-full ${isDark ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
                      <div className={`h-full w-full origin-left animate-[scan_12s_linear_infinite] [background-size:200%_100%] ${isDark ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500' : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600'}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide uppercase mb-6 ${isDark ? 'border border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} /> Clinical Intelligence
              </div>
              <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Code Smarter. <span className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Get Paid Faster.</span>
              </h2>
              <p className={`mt-6 text-lg md:text-xl leading-relaxed max-w-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Stop billing denials at the source. We turn messy, unstructured clinical documentation into perfect, auditable claims before they ever leave your office.
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {[
                  {title:'Zero-Error Prevention',desc:'Flag and fix risky claims before they are ever submitted to the payer.',icon:(
                    <svg className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'><path d='M12 3l7 4v5.2c0 4.2-2.8 8-7 9-4.2-1-7-4.8-7-9V7l7-4z'/><path d='M9.5 12.5l2 2 3.5-4'/></svg>
                  )},
                  {title:'Precision Coding',desc:'Generate perfect ICD-10 / CPT codes with full rationale for every suggestion.',icon:(
                    <svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><path d='M5 3l1.8 4.2L11 9 6.8 10.8 5 15l-1.8-4.2L-1 9l4.2-1.8L5 3z'/><path d='M16 13l1 2.2L20 16l-3 1-1 3-1-3-3-1 3-.8L16 13z'/><path d='M14 3l.6 1.4L16 5l-1.4.6L14 7l-.6-1.4L12 5l1.4-.6L14 3z'/></svg>
                  )},
                  {title:'Seamless Integration',desc:'Plug into your EHR/billing system via API, CSV, or SFTP sync in days.',icon:(
                    <svg className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'><path d='M10.5 13.5l3-3'/><path d='M8 12a4 4 0 010-5.7l2.3-2.3a4 4 0 015.7 5.7l-.7.7'/><path d='M16 12a4 4 0 010 5.7l-2.3 2.3a4 4 0 01-5.7-5.7l.7-.7'/></svg>
                  )},
                  {title:'Human-in-the-Loop',desc:'Your coders keep control; the system learns from their expertise with every cycle.',icon:(
                    <svg className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'><path d='M16 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2'/><circle cx='9' cy='7' r='4'/><path d='M16.5 11.5l1.5 1.5 3-3'/></svg>
                  )},
                ].map((f,i)=>(
                  <div key={i} className={`group relative overflow-hidden rounded-xl p-5 transition-all duration-300 ${isDark ? 'border border-white/10 bg-white/5 hover:border-emerald-400/40 hover:bg-emerald-400/10' : 'border border-gray-200 bg-white shadow-sm hover:border-emerald-300 hover:bg-emerald-50/30'}` }>
                    <div className="flex items-start gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-inner ${isDark ? 'ring-1 ring-white/20' : 'ring-1 ring-emerald-200/50'}` }>
                        {f.icon}
                      </div>
                      <div>
                        <h4 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{f.title}</h4>
                        <p className={`mt-1 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{f.desc}</p>
                      </div>
                    </div>
                    <div className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 ${isDark ? 'bg-gradient-to-br from-emerald-300/0 via-emerald-300/10 to-teal-300/10' : 'bg-gradient-to-br from-emerald-200/0 via-emerald-200/20 to-teal-200/10'}`} />
                  </div>
                ))}
              </div>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <a href="#book" className={`inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm font-semibold transition active:scale-95 ${isDark ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 text-black hover:brightness-105' : 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'}`}>
                  Book a Demo
                </a>
                {/* Pricing CTA removed per request */}
              </div>
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
              { step: '1', title: 'Connect Securely', body: 'No EHR replacement. We integrate via API or file export in days.' },
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
              </ul>
            </div>
            <div className={`rounded-2xl p-6 shadow-sm ${isDark ? 'border border-white/10 bg-white/5 text-gray-200' : 'border border-gray-200 bg-white text-gray-800'}`}>
              <div className={`mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Compliance checklist</div>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>☑ Data minimisation</li>
                <li>☑ Access logging</li>
                <li>☑ PHI pseudonymisation options</li>
                <li>☑ Data locality controls (EU/SA/US)</li>
              </ul>
              <a href="#book" className={`mt-6 inline-block rounded-xl px-4 py-2 text-sm font-semibold ${isDark ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:brightness-110' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>Contact us for security details</a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing removed per request */}

      {/* Standalone FAQ removed per request; FAQ now lives in Trust section */}

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

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg px-3 py-2 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed ${isDark ? 'border border-white/10 bg-white/5 text-white disabled:bg-white/10' : 'border border-gray-300 bg-white text-gray-900 disabled:bg-gray-100'}`}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg px-3 py-2 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed ${isDark ? 'border border-white/10 bg-white/5 text-white disabled:bg-white/10' : 'border border-gray-300 bg-white text-gray-900 disabled:bg-gray-100'}`}
                    placeholder="your.email@clinic.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg px-3 py-2 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed ${isDark ? 'border border-white/10 bg-white/5 text-white disabled:bg-white/10' : 'border border-gray-300 bg-white text-gray-900 disabled:bg-gray-100'}`}
                    placeholder="+27 XX XXX XXXX"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    Clinic/Hospital Name
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg px-3 py-2 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed ${isDark ? 'border border-white/10 bg-white/5 text-white disabled:bg-white/10' : 'border border-gray-300 bg-white text-gray-900 disabled:bg-gray-100'}`}
                    placeholder="Your clinic or hospital name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    How can we help? (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg px-3 py-2 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed ${isDark ? 'border border-white/10 bg-white/5 text-white disabled:bg-white/10' : 'border border-gray-300 bg-white text-gray-900 disabled:bg-gray-100'}`}
                    placeholder="Tell us about your current coding challenges..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-lg px-4 py-3 font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center ${isDark ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:brightness-110' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Submit Details'
                  )}
                </button>

                <p className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  We respect your privacy. Your information will only be used to contact you about Vukazine services.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer removed per request */}
    </div>
  );
}
