"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AboutPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    try {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (saved) return saved
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
      return 'light'
    } catch { return 'light' }
  })

  useEffect(() => {
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])
  const isDark = theme === 'dark'

  // Hero image carousel state (copied from main page)
  const heroImages = [
    '/image/Doctors/image1.jpg',
    '/image/Doctors/image2.jpg',
    '/image/Doctors/image3.jpg'
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // TypewriterText (copied from main page)
  const TypewriterText = ({ phrases }: { phrases: string[] }) => {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const [highlightIndex, setHighlightIndex] = useState(-1);

    useEffect(() => {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
      return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
      const typeSpeed = 100;
      const deleteSpeed = 50;
      const delayBetweenPhrases = 2000;
      const type = () => {
        const currentPhrase = phrases[currentPhraseIndex];
        if (isDeleting) {
          setCurrentText(prev => prev.slice(0, -1));
          setHighlightIndex(-1);
          if (currentText === '') {
            setIsDeleting(false);
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        } else {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
          setHighlightIndex(currentText.length);
          setTimeout(() => setHighlightIndex(-1), 200);
          if (currentText === currentPhrase) {
            setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
            return;
          }
        }
      };
      const timer = setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
      return () => clearTimeout(timer);
    }, [currentText, currentPhraseIndex, isDeleting, phrases]);

    return (
      <span className="text-emerald-400 relative">
        {currentText.split('').map((char, index) => (
          <span
            key={index}
            className={`transition-all duration-200 ${index === highlightIndex ? 'bg-emerald-400/20 text-white' : ''}`}
          >
            {char}
          </span>
        ))}
        <span
          className={`ml-0.5 inline-block w-0.5 h-[1.1em] bg-emerald-400 relative top-[0.1em] transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
        />
      </span>
    );
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black/95 text-white' : 'bg-white text-gray-900'}`}>
      {/* Keep the same top bar look & feel */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md py-3 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <img src="/image/logos/logo.png" alt="Vukazine Logo" className="h-9 w-auto transition-transform group-hover:scale-105" />
            <span className="ml-3 text-lg font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Vukazine</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/#why-our-service" className="text-gray-300 hover:text-white">Why Our Service</Link>
            <Link href="/#how-it-works" className="text-gray-300 hover:text-white">How It Works</Link>
            <Link href="/#faq" className="text-gray-300 hover:text-white">FAQ</Link>
            <Link href="/about" className="text-white font-medium">About Us</Link>
          </nav>
          <div className="hidden md:flex items-center space-x-5 ml-10 pl-10 border-l border-white/10">
            <button
              onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
              className="rounded-lg px-3 py-2 text-[15px] font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
            <Link href="/#book" className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-black px-5 py-2 text-[15px] font-medium rounded-lg hover:from-emerald-500 hover:to-emerald-600">Demo</Link>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" />

      {/* Hero Section (copied from main page) */}
      <section className="relative bg-black overflow-hidden min-h-[60vh] md:min-h-screen">
        {/* Background Images Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={image} alt={`Doctor ${index + 1}`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
            </div>
          ))}
        </div>
        {/* Content Overlay */}
        <div className="relative z-10 flex min-h-[60vh] md:min-h-screen items-center pt-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">Eliminate Billing Denials. Accelerate Revenue.</h1>
              <p className="mt-4 text-xl text-gray-200 md:text-2xl">
                <TypewriterText phrases={["Our Code is Clear", "Zero Denials", "Faster Payments"]} />
              </p>
              <div className="mt-6 max-w-2xl relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-transparent rounded-full"></div>
                <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-100 backdrop-blur-sm bg-white/5 p-6 rounded-lg border border-white/10 shadow-xl">
                  <span className="text-emerald-400 font-semibold">Vukazine</span> uses{' '}
                  <span className="font-semibold text-white">clinical intelligence</span> to suggest{' '}
                  <span className="font-semibold text-white">perfect codes</span> and{' '}
                  <span className="font-semibold text-white">flag risks</span> before you submit.{' '}
                  <span className="block mt-2 text-emerald-300 font-semibold">It's guaranteed precision that pays for itself.</span>
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/savings-estimator" className="rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-6 py-4 text-center text-lg font-medium text-black hover:from-emerald-500 hover:to-emerald-600 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20 active:scale-95">Calculate My Savings</Link>
                <Link href="/#how-it-works" className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-4 text-center text-lg font-medium text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-white/5 active:scale-95 flex items-center justify-center gap-2"><span className="text-emerald-400">▶</span> Watch the 90-Second Demo</Link>
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
              className={`h-3 w-3 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About content */}
      <main className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Vukazine: Our Story</h1>
        <p className="mt-2 text-lg text-emerald-600">Putting Precision Back into Healthcare</p>

        <div className="mt-8 space-y-5 text-lg leading-8">
          <p>At its core, Vukazine was founded on a simple, powerful belief: The people who save lives should never have to lose revenue to administrative errors.</p>
          <p>Our story begins in South Africa, with our founder, Bongani Somba. Bongani saw firsthand the silent crisis facing doctors and medical coders: the enormous time sink and financial drain caused by complex, manual medical coding and the resulting billing denials. He recognized that this wasn't just a billing problem; it was a distraction pulling healthcare professionals away from their most important work, patient care.</p>
        </div>

        <h2 className="mt-10 text-2xl font-bold">The Vukazine Mission</h2>
        <p className="mt-3 text-lg leading-8">Bongani set out to build a solution that was more than just software; it had to be a guarantee. He named the company Vukazine (a name that speaks to rising up and gaining clarity/vision) to reflect our purpose: to give medical professionals the clarity and confidence they need to succeed.</p>
        <p className="mt-3 text-lg leading-8">We exist to simplify the complex and guarantee the correct.</p>

        <h2 className="mt-10 text-2xl font-bold">How We Deliver</h2>
        <div className="mt-3 space-y-3 text-lg leading-8">
          <p>Vukazine is a clinical intelligence platform built specifically to support, not replace, the medical coder and doctor. We don't just suggest codes; we provide a safety net. Our system:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Makes the coder's life easy by automating the tedious review of clinical notes.</li>
            <li>Makes the doctor's life easier by ensuring their patient focus isn't disrupted by billing disputes.</li>
            <li>Guarantees precision by auditing claims for missing information, compliance risks, and payer-specific edits before submission.</li>
          </ul>
        </div>

        <p className="mt-6 text-lg leading-8">We are proud to be a South African company driving global standards in medical precision. Vukazine is your partner in eliminating billing friction, accelerating revenue, and returning the focus to what truly matters: exceptional patient care.</p>

        <div className="mt-10">
          <Link href="/#book" className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700">Book a Demo</Link>
        </div>
      </main>
    </div>
  )
}
