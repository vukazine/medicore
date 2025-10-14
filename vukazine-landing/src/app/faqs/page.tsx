"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSection {
  section: string;
  questions: FAQ[];
}

const faqs: FAQSection[] = [
  {
    section: "Getting Started",
    questions: [
      {
        question: "How fast is onboarding?",
        answer: "Small to medium-sized clinics typically go live within 3-5 business days. Larger hospitals with complex EHR systems usually complete onboarding within 2-3 weeks. Our onboarding process includes: initial consultation, system integration setup, data mapping, team training, and a monitored pilot period. We handle the technical heavy lifting so your team can focus on patient care."
      },
      {
        question: "Does Vukazine replace our EHR system?",
        answer: "No. Vukazine integrates seamlessly with your existing EHR and billing systems—we don't replace them. Think of us as an intelligent layer that sits between your clinical documentation and billing workflow. We work alongside your current tools via API, CSV export, or SFTP, enhancing what you already have without disrupting your established processes. Your team continues using the same systems they know, now with AI-powered coding assistance."
      },
      {
        question: "What integrations do you support?",
        answer: "Vukazine integrates with most major EHR and practice management systems through three methods:\n\n• API Integration: Real-time, bidirectional sync with leading platforms\n• CSV/Excel Import: Scheduled batch imports for systems without API access\n• SFTP: Secure automated file transfer for enterprise deployments\n\nWe support HL7, FHIR, and custom data formats. During onboarding, our team assesses your specific systems and configures the optimal integration method. If you use a specialized or proprietary system, contact us—we've successfully integrated with custom healthcare platforms before."
      }
    ]
  },
  {
    section: "Pricing & Billing",
    questions: [
      {
        question: "How much does Vukazine cost?",
        answer: "Vukazine pricing is tailored to your clinic's size and claim volume. We offer flexible models:\n\n• Per-Claim Pricing: Pay only for claims processed, starting from as low as R80 per claim\n• Monthly Subscription: Flat monthly fee based on your average claim volume\n• Enterprise Plans: Custom pricing for hospital systems and large practices\n\nMost small to medium clinics see ROI within the first month through reduced denials and faster reimbursements. We offer transparent pricing with no hidden fees—contact us for a personalized quote and savings estimate based on your current denial rates."
      },
      {
        question: "Is there a setup fee?",
        answer: "No setup fees for standard integrations. We believe you should see value from day one without upfront costs. For complex, highly customized enterprise integrations requiring extensive development work, we discuss any implementation costs transparently during consultation. Most clinics (95%+) qualify for our zero-setup-fee onboarding."
      },
      {
        question: "Can we try before we buy?",
        answer: "Absolutely. We offer a 14-day pilot program where you can test Vukazine with real claims at no cost and no commitment. During the trial:\n\n• Process up to 100 claims\n• Full access to all features\n• Dedicated support from our team\n• Review accuracy reports and denial reduction metrics\n\nAfter the trial, you decide whether to continue. No credit card required to start. We're confident that once you see Vukazine eliminate denials and accelerate payments, you'll want to keep us."
      }
    ]
  },
  {
    section: "Security & Compliance",
    questions: [
      {
        question: "Is Vukazine POPIA compliant?",
        answer: "Yes. Vukazine is designed from the ground up for South African healthcare compliance. We adhere to POPIA (Protection of Personal Information Act) requirements through:\n\n• Data minimisation by design—we only collect what's necessary\n• Explicit consent mechanisms for data processing\n• Robust access controls and audit logging\n• Secure data retention and deletion policies\n• Regular compliance audits and third-party assessments\n\nWe're also aligned with international HIPAA standards for clients with cross-border operations. Our compliance documentation is available upon request, and we're happy to work with your legal team to address specific concerns."
      },
      {
        question: "Where is our data stored?",
        answer: "All data is stored within South Africa on secure, ISO 27001-certified infrastructure. Your patient and billing information never leaves SA borders unless you explicitly configure cross-border backup (available for enterprise clients with international operations).\n\nWe use:\n• Encryption in transit (TLS 1.3)\n• Encryption at rest (AES-256)\n• Geographically redundant backups within SA\n• SOC 2 Type II compliant data centers\n\nYou maintain full ownership of your data and can request export or deletion at any time."
      },
      {
        question: "Who has access to our data?",
        answer: "Only authorized personnel from your organization have access to your data through role-based access controls (RBAC). Within Vukazine:\n\n• Our AI models process data in a secure, isolated environment\n• Human access is strictly limited to essential support staff for troubleshooting (with your explicit permission)\n• All access is logged and auditable\n• We implement principle of least privilege—no one sees more than necessary\n\nWe never share, sell, or use your data for purposes beyond providing our service. Third-party access requires written authorization from you. Full audit trails are available showing exactly who accessed what and when."
      }
    ]
  },
  {
    section: "Features & Performance",
    questions: [
      {
        question: "What's your accuracy rate?",
        answer: "Vukazine maintains an average accuracy rate of 97-99% for ICD-10 and CPT code suggestions, validated across thousands of claims. Here's what that means:\n\n• 97%+ of suggested codes match expert coder selections\n• 95%+ first-pass claim acceptance rate from payers\n• 85%+ reduction in coding-related denials\n\nAccuracy improves over time as our AI learns from your coders' decisions. Every correction teaches the system your clinic's specific documentation patterns and payer preferences. Within 90 days, most clients see accuracy rates approaching 99% for their routine cases.\n\nWe provide weekly accuracy reports so you can track performance and identify areas for improvement."
      },
      {
        question: "How does the AI learn?",
        answer: "Vukazine uses a combination of machine learning techniques:\n\n1. Pre-trained Foundation: Our models are initially trained on millions of anonymized medical claims, clinical guidelines, and coding standards\n\n2. Your Clinic's Feedback Loop:\n• When your coders accept, modify, or reject suggestions, the system learns\n• We analyze denial patterns and payer-specific requirements\n• The AI adapts to your documentation style and specialty focus\n\n3. Continuous Improvement:\n• Weekly model updates incorporate new coding guidelines and payer rules\n• Specialty-specific training for your practice area (cardiology, orthopedics, etc.)\n• Pattern recognition improves with every claim processed\n\nThe more you use Vukazine, the smarter it becomes for YOUR specific needs. It's like having a coder who learns your preferences and never forgets."
      },
      {
        question: "Can we override AI suggestions?",
        answer: "Absolutely—and we encourage it. Your coders remain in full control. Vukazine assists; it doesn't automate blindly.\n\nYou can:\n• Accept suggestions with one click\n• Modify codes before submission\n• Reject suggestions entirely and code manually\n• Add notes explaining why you overrode the AI\n• Flag issues for review by our team\n\nEvery override makes Vukazine smarter. When you correct a suggestion, the system learns why and adjusts future recommendations. This human-in-the-loop approach ensures accuracy while maintaining your team's expertise and judgment at the center of the coding process."
      }
    ]
  },
  {
    section: "Support",
    questions: [
      {
        question: "What support do you offer?",
        answer: "Comprehensive support at every stage:\n\n**During Onboarding:**\n• Dedicated implementation specialist\n• Custom training for your team\n• Integration troubleshooting\n• Daily check-ins during pilot period\n\n**Ongoing Support:**\n• Email support: Response within 4 business hours\n• Phone support: Available during SA business hours (8am-6pm SAST)\n• Live chat: For quick questions and troubleshooting\n• Dedicated success manager (Enterprise plans)\n\n**Resources:**\n• Knowledge base with video tutorials\n• Monthly webinars on new features\n• Quarterly performance reviews\n• Coding updates and compliance alerts\n\n**Enterprise clients** receive 24/7 priority support and a dedicated Slack/Teams channel."
      },
      {
        question: "How do we report issues?",
        answer: "Multiple ways to report issues or request help:\n\n1. **In-App Support**: Click the help icon in Vukazine dashboard\n• Attach screenshots or claim examples\n• Our team receives instant notification\n• Track ticket status in real-time\n\n2. **Email**: support@vukazine.com\n• Include claim ID, screenshots, and description\n• We respond within 4 business hours\n\n3. **Phone**: [Your support number]\n• For urgent issues affecting claim submission\n• Available 8am-6pm SAST, Monday-Friday\n\n4. **Emergency Hotline** (Enterprise only): 24/7 for critical system issues\n\n**We take every issue seriously.** Critical bugs affecting claim accuracy are addressed within 24 hours. We provide regular updates until resolution and conduct post-mortem analysis to prevent recurrence."
      },
      {
        question: "Do you offer training?",
        answer: "Yes. Training is included with every Vukazine subscription:\n\n**Initial Training (Included):**\n• 2-hour onboarding session for your coding team\n• Hands-on walkthrough of the platform\n• Best practices for maximizing accuracy\n• Q&A with our coding specialists\n• Recorded session for future reference\n\n**Ongoing Training:**\n• Monthly \"office hours\" webinars (free)\n• Video tutorial library\n• Written guides and quick-start documentation\n• New feature training when updates roll out\n\n**Advanced Training (Optional):**\n• Custom workshops for large teams (charged separately)\n• Specialty-specific coding optimization\n• Denial management strategy sessions\n• Integration with your specific workflow\n\n**Training for new staff**: Free refresher sessions available anytime. Just schedule with your success manager.\n\nWe also offer certification programs for your coders to become Vukazine \"power users\"—specialists who can train others and optimize your clinic's usage."
      }
    ]
  },
  {
    section: "Additional Questions",
    questions: [
      {
        question: "What happens if Vukazine suggests the wrong code?",
        answer: "Your coders catch it before submission—that's the beauty of human-in-the-loop. Vukazine flags uncertainty levels, so high-confidence suggestions get quick approval while uncertain cases get extra review. If an incorrect suggestion does lead to a denial, we:\n\n1. Investigate immediately why the error occurred\n2. Update our models to prevent similar mistakes\n3. Work with you on the appeal process\n4. Cover any financial impact from proven Vukazine errors (per our service agreement)\n\nWe stand behind our accuracy with our 2-Week Performance Guarantee."
      },
      {
        question: "Can Vukazine handle multiple specialties?",
        answer: "Yes. Vukazine is trained across all major medical specialties. Whether you're a multi-specialty clinic or a focused practice, our AI adapts. We can configure specialty-specific coding rules, preferred code sets, and documentation patterns for each department. Many hospital clients use Vukazine across cardiology, orthopedics, internal medicine, and more—all from one platform."
      },
      {
        question: "How do updates and new coding guidelines work?",
        answer: "Automatic and seamless. When ICD-10, CPT, or payer guidelines change, Vukazine updates automatically:\n\n• You receive notification of changes\n• New codes and rules go live on the effective date\n• No downtime or manual configuration needed\n• Training materials updated to reflect changes\n\nWe monitor SAMA (South African Medical Association), medical schemes, and international coding standards to keep you compliant year-round."
      }
    ]
  }
];

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden backdrop-blur-sm bg-white/50">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-emerald-50/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {faq.answer}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="py-20 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Vukazine's AI-powered medical coding platform
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((section) => (
            <div key={section.section}>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b border-emerald-200 pb-2">
                {section.section}
              </h2>
              <div className="space-y-4">
                {section.questions.map((faq) => (
                  <FAQItem key={faq.question} faq={faq} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-emerald-100 mb-6">
            Can't find what you're looking for? Our team is here to help.
          </p>
          <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
