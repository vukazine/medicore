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

      {/* Redesigned Hero Section - Modern Minimal Design */}
      <section className={`relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'}`}>
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute top-20 left-10 w-32 h-32 rounded-full ${isDark ? 'bg-emerald-400/10' : 'bg-emerald-500/10'} blur-xl`}></div>
          <div className={`absolute top-40 right-20 w-48 h-48 rounded-full ${isDark ? 'bg-blue-400/10' : 'bg-blue-500/10'} blur-xl`}></div>
          <div className={`absolute bottom-20 left-1/3 w-40 h-40 rounded-full ${isDark ? 'bg-purple-400/10' : 'bg-purple-500/10'} blur-xl`}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${isDark ? 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/20' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                <span className={`h-2 w-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'} animate-pulse`}></span>
                Our Story
              </div>
              
              <div>
                <h1 className={`text-5xl md:text-6xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Building the Future of
                  <span className="block">
                    <TypewriterText phrases={["Medical Coding", "Healthcare Revenue", "Clinical Intelligence"]} />
                  </span>
                </h1>
              </div>

              <p className={`text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Founded in South Africa with a global vision: to eliminate the administrative burden that pulls healthcare professionals away from patient care.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/#book" 
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 active:scale-95 ${isDark ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-black hover:brightness-110' : 'bg-emerald-600 text-white hover:bg-emerald-700'} shadow-lg hover:shadow-xl`}
                >
                  Meet Our Team
                </Link>
                <Link 
                  href="/#how-it-works" 
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 active:scale-95 ${isDark ? 'border border-white/20 bg-white/5 text-white hover:bg-white/10' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'} backdrop-blur-sm`}
                >
                  See Our Solution
                </Link>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200/20">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>2024</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Founded</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>99.9%</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Accuracy</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>24/7</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Support</div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative">
              <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
                {/* Animated Code Editor Mockup */}
                <div className={`p-6 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className={`ml-4 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Vukazine Clinical Intelligence</div>
                  </div>
                  
                  <div className="space-y-3 font-mono text-sm">
                    <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="text-blue-500">function</span> <span className="text-green-500">analyzeClinicalNote</span>() {`{`}
                    </div>
                    <div className={`pl-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="text-purple-500">const</span> diagnosis = <span className="text-yellow-500">"Type 2 Diabetes"</span>;
                    </div>
                    <div className={`pl-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="text-purple-500">const</span> suggestedCode = <span className="text-green-500">getICD10Code</span>(diagnosis);
                    </div>
                    <div className={`pl-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="text-blue-500">return</span> {`{`} code: <span className="text-yellow-500">"E11.9"</span>, confidence: <span className="text-orange-500">99.9</span> {`}`};
                    </div>
                    <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{`}`}</div>
                  </div>
                  
                  <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-emerald-900/30 border border-emerald-500/30' : 'bg-emerald-50 border border-emerald-200'}`}>
                    <div className={`text-xs font-medium ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>✓ Code Verified • Zero Denials • Ready to Submit</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${isDark ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' : 'bg-gradient-to-br from-emerald-500 to-emerald-700'} flex items-center justify-center shadow-xl`}>
                <span className="text-2xl">🎯</span>
              </div>
              <div className={`absolute -bottom-4 -left-4 w-20 h-20 rounded-full ${isDark ? 'bg-gradient-to-br from-blue-400 to-blue-600' : 'bg-gradient-to-br from-blue-500 to-blue-700'} flex items-center justify-center shadow-xl`}>
                <span className="text-xl">⚡</span>
              </div>
            </div>
          </div>
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
