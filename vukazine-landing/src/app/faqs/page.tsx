import React from "react";

const faqs = [
  {
    section: "Getting Started",
    questions: [
      "How fast is onboarding?",
      "Does Vukazine replace our EHR system?",
      "What integrations do you support?",
    ],
  },
  {
    section: "Pricing & Billing",
    questions: [
      "How much does Vukazine cost?",
      "Is there a setup fee?",
      "Can we try before we buy?",
    ],
  },
  {
    section: "Security & Compliance",
    questions: [
      "Is Vukazine POPIA compliant?",
      "Where is our data stored?",
      "Who has access to our data?",
    ],
  },
  {
    section: "Features & Performance",
    questions: [
      "What's your accuracy rate?",
      "How does the AI learn?",
      "Can we override AI suggestions?",
    ],
  },
  {
    section: "Support",
    questions: [
      "What support do you offer?",
      "How do we report issues?",
      "Do you offer training?",
    ],
  },
];

export default function FAQPage() {
  return (
    <section className="py-20 max-w-3xl mx-auto px-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center">Frequently Asked Questions</h1>
      <div className="space-y-10">
        {faqs.map((faq) => (
          <div key={faq.section}>
            <h2 className="text-2xl font-bold mb-4">{faq.section}</h2>
            <ul className="space-y-2 list-disc list-inside">
              {faq.questions.map((q) => (
                <li key={q} className="text-lg">{q}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
