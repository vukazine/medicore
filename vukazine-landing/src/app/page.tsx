'use client'

import { useState, useEffect } from 'react'

export default function LandingPage() {
  // Hero image carousel state
  const heroImages = [
    '/image/Doctors/image1.jpg',
    '/image/Doctors/image2.jpg',
    '/image/Doctors/image3.jpg'
  ]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-rotate images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      )
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="#home" className="flex items-center font-semibold">
            <img src="/image/logos/logo2.png" alt="Vukazine Logo" className="h-12 w-12 object-contain" />
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="hover:text-emerald-700">Features</a>
            <a href="#how" className="hover:text-emerald-700">How it works</a>
            <a href="#security" className="hover:text-emerald-700">Security</a>
            <a href="#pricing" className="hover:text-emerald-700">Pricing</a>
            <a href="#faq" className="hover:text-emerald-700">FAQ</a>
          </nav>
          <div className="hidden md:block">
            <a href="#book" className="rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700">Book a 15‑min demo</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative h-screen overflow-hidden">
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
              <div className="absolute inset-0 bg-black/40"></div>
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
                <a href="#book" className="rounded-xl bg-emerald-600 px-6 py-4 text-center text-lg font-medium text-white hover:bg-emerald-700">Book a 15‑min demo</a>
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
                  Book a Demo
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
            <a href="#book" className="mt-6 inline-block rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700">Request security brief</a>
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
                <a href="#book" className="mt-6 inline-block rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700">Start a pilot</a>
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
      <section id="book" className="bg-emerald-600">
        <div className="mx-auto max-w-7xl px-4 py-16 text-white">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Book a 15‑minute demo</h2>
              <p className="mt-2 text-emerald-100">We’ll review your current process and show how Vukazine reduces denials fast.</p>
              <ul className="mt-4 list-inside list-disc space-y-1 text-emerald-50">
                <li>Bring one anonymised note—we’ll run it live.</li>
                <li>No obligation, no jargon.</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-4 text-gray-900 shadow-lg">
              {/* Replace src with your Calendly or Tally form embed */}
              <div className="aspect-video w-full rounded-lg border bg-gray-50 p-4 text-center text-sm text-gray-600">
                Embed your Calendly/Tally form here
              </div>
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
