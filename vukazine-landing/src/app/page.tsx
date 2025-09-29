'use client'

import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    { title: 'Why Our Service', href: '#why-our-service' },
    { title: 'How It Works', href: '#how-it-works' },
    { title: 'Pricing', href: '#pricing' },
    { title: 'FAQ', href: '#faq' },
    { title: 'About Us', href: '#about-us' }
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
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm py-3 shadow-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#home" className="flex items-center group">
              <img src="/image/logos/logo.png" alt="Vukazine Logo" className="h-9 w-auto transition-transform group-hover:scale-105" />
              <span className="ml-3 text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Vukazine</span>
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <nav className="flex items-center space-x-6">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="relative text-gray-700 hover:text-gray-900 px-2 py-2 text-[15px] font-medium transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
              
              {/* Auth buttons */}
              <div className="flex items-center space-x-5 ml-10 pl-10 border-l border-gray-200">
                <a
                  href="#signin"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-[15px] font-medium transition-colors duration-200 hover:bg-gray-50 rounded-md"
                >
                  Sign in
                </a>
                <a
                  href="#demo"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-5 py-2 text-[15px] font-medium rounded-lg transition-all duration-200 hover:shadow-md active:scale-95"
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
              <div className="bg-white mt-2 rounded-xl shadow-xl ring-1 ring-gray-900/5 p-4">
                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-3 py-2.5 text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </a>
                  ))}
                  <div className="border-t border-gray-100 my-3"></div>
                  <a
                    href="#signin"
                    className="block px-3 py-2.5 text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign in
                  </a>
                  <a
                    href="#demo"
                    className="block px-3 py-2.5 mt-2 text-[15px] font-medium text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-200"
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
      <section id="home" className="relative bg-black overflow-hidden h-[calc(100vh-70px)]">
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
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                Cut billing denials with <span className="text-emerald-400">AI‑powered medical coding</span>
              </h1>
              <p className="mt-4 text-xl text-gray-200 md:text-2xl">
                Vukazine reads clinical notes, suggests ICD‑10/CPT codes, and flags risks before submission. Fewer rejections, faster revenue.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#book" className="rounded-xl bg-emerald-600 px-6 py-4 text-center text-lg font-medium text-white hover:bg-emerald-700">Get Started</a>
                <a href="#how" className="rounded-xl border border-white px-6 py-4 text-center text-lg font-medium text-white hover:bg-white/10">See how it works</a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-300">
                <div>⏱️ Setup in days</div>
                <div>🔒 POPIA/HIPAA‑aligned</div>
                <div>🧪 2‑week pilot available</div>
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

      {/* Our Services */}
      <section id="services" className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600">Comprehensive AI-powered solutions for medical coding and billing</p>
          </div>
          
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Service Cards */}
            <div className="grid gap-6">
              {/* Card 1 - Medical Coding Automation */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Coding Automation</h3>
                <p className="text-gray-600 mb-4">Turn free-text notes into ICD-10/CPT codes with accuracy checks.</p>
                <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                  Get Started
                </button>
              </div>

              {/* Card 2 - Denial Prevention */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Denial Prevention</h3>
                <p className="text-gray-600 mb-4">Flag missing documentation and risky claims before submission.</p>
                <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                  See How
                </button>
              </div>

              {/* Card 3 - Data Integration */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Integration</h3>
                <p className="text-gray-600 mb-4">Plug into your EHR or billing tools via API, CSV, or SFTP.</p>
                <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                  Explore Integrations
                </button>
              </div>

              {/* Card 4 - Compliance & Auditing */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Compliance & Auditing</h3>
                <p className="text-gray-600 mb-4">POPIA/HIPAA-aligned processing with audit trails and role-based access.</p>
                <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                  View Security
                </button>
              </div>
            </div>

            {/* Video */}
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <video 
                  controls 
                  className="w-full rounded-xl shadow-lg"
                  poster="/image/Doctors/image1.jpg"
                >
                  <source src="/video/doctor.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="border-y bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <p className="mb-4 text-center text-sm text-gray-600">Built with clinicians, engineers, and revenue cycle experts</p>
          <div className="grid grid-cols-2 items-center gap-6 opacity-70 sm:grid-cols-3 md:grid-cols-6">
            <div className="h-10 rounded bg-white shadow-sm" />
            <div className="h-10 rounded bg-white shadow-sm" />
            <div className="h-10 rounded bg-white shadow-sm" />
            <div className="h-10 rounded bg-white shadow-sm" />
            <div className="h-10 rounded bg-white shadow-sm" />
            <div className="h-10 rounded bg-white shadow-sm" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold">Why hospitals and clinics choose Vukazine</h2>
          <p className="mt-3 text-gray-700">Reduce manual coding time, lower denial rates, and stay compliant without breaking workflows.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'AI coding suggestions',
              body: 'Turn free‑text notes into ICD‑10/CPT suggestions with confidence indicators.'
            },
            {
              title: 'Denial prevention',
              body: 'Flags missing documentation and risky claims before submission.'
            },
            {
              title: 'Seamless integration',
              body: 'CSV, SFTP, FHIR/HL7, or API — plug into your existing EHR/billing tools.'
            },
            {
              title: 'Auditable trail',
              body: 'Every suggestion is explainable with links to source text.'
            },
            {
              title: 'Human‑in‑the‑loop',
              body: 'Coders review/approve suggestions; the system learns from feedback.'
            },
            {
              title: 'POPIA/HIPAA‑aligned',
              body: 'Encryption at rest/in transit, role‑based access, and data minimisation.'
            }
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border p-6 shadow-sm">
              <div className="mb-2 text-emerald-700">◆</div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-gray-700">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-3xl font-bold">How it works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              {
                step: '1',
                title: 'Connect',
                body: 'Choose CSV/SFTP/API. No EHR replacement required.'
              },
              {
                step: '2',
                title: 'Ingest',
                body: 'We parse notes and normalise terminology securely.'
              },
              {
                step: '3',
                title: 'Suggest & flag',
                body: 'ICD‑10/CPT suggestions + missing‑info flags and risk checks.'
              },
              {
                step: '4',
                title: 'Review & export',
                body: 'Coders approve, then export to your billing/EHR system.'
              }
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">{s.step}</div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-gray-700">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Security & compliance</h2>
            <p className="mt-3 text-gray-700">Designed for healthcare: least‑privilege access, full audit logs, data retention controls, and private deployment options.</p>
            <ul className="mt-6 list-inside list-disc space-y-2 text-gray-700">
              <li>Encryption in transit and at rest (TLS, AES‑256)</li>
              <li>Role‑based access control and SSO support</li>
              <li>POPIA/HIPAA‑aligned data handling</li>
              <li>On‑prem or VPC deployment available</li>
            </ul>
          </div>
          <div className="rounded-2xl border p-6 shadow-sm">
            <div className="mb-2 text-sm font-medium text-gray-700">Compliance checklist</div>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>☑ Data minimisation</li>
              <li>☑ Access logging</li>
              <li>☑ PHI pseudonymisation options</li>
              <li>☑ Data locality controls (EU/SA/US)</li>
            </ul>
            <a href="#book" className="mt-6 inline-block rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700">Contact us for security details</a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold">Founders’ pricing (limited to first 2 clinics)</h2>
            <p className="mt-3 text-gray-700">Get started with a low‑risk pilot and scale as you grow.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: 'Pilot', price: 'R7,500 / month', bullets: ['Up to 3 users', 'Email support', 'CSV/SFTP export'] },
              { name: 'Standard', price: 'R14,900 / month', bullets: ['Up to 10 users', 'API integration', 'Priority support'] },
              { name: 'Enterprise', price: 'Custom', bullets: ['Unlimited users', 'On‑prem/VPC', 'Dedicated success manager'] }
            ].map((p) => (
              <div key={p.name} className="rounded-2xl border bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <div className="mt-2 text-3xl font-bold text-emerald-700">{p.price}</div>
                <ul className="mt-4 list-inside list-disc space-y-1 text-gray-700">
                  {p.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <a href="#book" className="mt-6 inline-block rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700">Get Started</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold">FAQs</h2>
          <p className="mt-3 text-gray-700">Short answers, no fluff.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ['Do we replace our EHR?', 'No. Vukazine plugs into your current EHR/billing setup via API, CSV, or SFTP.'],
            ['How accurate are the suggestions?', 'Expect significant reduction in denials as coders review and the system learns from feedback.'],
            ['Is our data safe?', 'Yes—encryption, RBAC, audit logs, and private deployments are available.'],
            ['How fast is onboarding?', 'Small clinics can be live in days; larger hospitals typically within a few weeks.']
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl border p-6 shadow-sm">
              <h3 className="font-semibold">{q}</h3>
              <p className="mt-2 text-gray-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Book demo */}
            {/* Contact Form */}
      <section id="book" className="bg-emerald-600">
        <div className="mx-auto max-w-7xl px-4 py-16 text-white">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Get Started with Vukazine</h2>
              <p className="mt-2 text-emerald-100">Fill in your details and we'll get in touch to discuss how Vukazine can reduce your billing denials.</p>
              <ul className="mt-4 list-inside list-disc space-y-1 text-emerald-50">
                <li>Personalized consultation for your clinic</li>
                <li>Free assessment of your current coding process</li>
                <li>No obligation, no jargon</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-6 text-gray-900 shadow-lg">
              {submitMessage && (
                <div className={`mb-4 p-4 rounded-lg ${
                  isSuccess 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="your.email@clinic.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="+27 XX XXX XXXX"
                  />
                </div>
                
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                    Clinic/Hospital Name
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Your clinic or hospital name"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    How can we help? (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Tell us about your current coding challenges..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
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
                
                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Your information will only be used to contact you about Vukazine services.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="grid h-6 w-6 place-items-center rounded-lg bg-emerald-600 text-white">VZ</div>
            <span>© {new Date().getFullYear()} Vukazine</span>
          </div>
          <div className="text-sm text-gray-600">Contact: hello@vukazine.com • Cape Town, SA</div>
        </div>
      </footer>
    </div>
  );
}
