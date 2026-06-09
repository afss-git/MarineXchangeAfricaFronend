import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"

const legalDocs = [
  {
    title: "Vendor Agreement",
    description: "Terms governing registered Vendors listing and supplying goods and services through the Harbours360 platform, including compliance obligations, pricing, delivery, payment terms, liability, and dispute resolution.",
    href: "/legal/vendor-agreement",
    clauses: "10 clauses",
  },
  {
    title: "Buyer Agreement",
    description: "Terms governing registered Buyers procuring goods and services through the platform, including platform role, buyer obligations, payment, inspection, regulatory compliance, and dispute resolution.",
    href: "/legal/buyer-agreement",
    clauses: "7 clauses",
  },
  {
    title: "Escrow Agreement",
    description: "Framework for secure financial transactions via Optimus Bank. Covers the role of Harbours360 as escrow intermediary, the step-by-step escrow process, dispute handling during escrow, and liability.",
    href: "/legal/escrow",
    clauses: "4 sections",
  },
  {
    title: "Platform Compliance Manual",
    description: "Harbours360’s compliance framework covering corporate governance (CAMA 2020), industry regulations (PIA 2021, NIMASA, NPA), anti-money laundering (AML/KYC), vendor monitoring, data protection (NDPA 2023), and risk management.",
    href: "/legal/compliance",
    clauses: "6 sections",
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-navy transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="mb-10">
          <span className="text-ocean text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Legal</span>
          <h1 className="text-navy font-extrabold mb-3" style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.03em" }}>
            Legal Documents
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed">
            Harbours360, operated by <strong className="text-navy">Harbour Limited (RC 9553415)</strong>, provides a B2B digital marketplace for maritime and industrial asset transactions in Africa. The documents below govern all use of the platform, transactions between Buyers and Vendors, data handling, and our compliance framework.
          </p>
        </div>

        <div className="space-y-4">
          {legalDocs.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className="block group border border-border rounded-2xl p-6 hover:border-ocean/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-ocean/8 flex items-center justify-center shrink-0 group-hover:bg-ocean/15 transition-colors">
                  <FileText className="w-5 h-5 text-ocean" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h2 className="text-navy font-bold text-base group-hover:text-ocean transition-colors">{doc.title}</h2>
                    <span className="text-xs text-text-secondary bg-surface px-2 py-0.5 rounded-full border border-border shrink-0">{doc.clauses}</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{doc.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-text-secondary text-sm leading-relaxed">
            The <Link href="/privacy" className="text-ocean hover:underline">Privacy Policy</Link> governs data collection and processing on the platform in accordance with the Nigerian Data Protection Act (NDPA) 2023.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed mt-3">
            For legal enquiries, contact{" "}
            <a href="mailto:info@habours360.com" className="text-ocean hover:underline">info@habours360.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
