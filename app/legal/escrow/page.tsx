import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function EscrowAgreementPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link href="/terms" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-navy transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Legal Documents
        </Link>

        <div className="mb-10">
          <span className="text-ocean text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Legal</span>
          <h1 className="text-navy font-extrabold mb-3" style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.03em" }}>
            Escrow Agreement
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed">
            This Agreement governs the escrow mechanism administered by Harbours360 through its designated banking partner, <strong className="text-navy">Optimus Bank</strong>, for all financial transactions conducted on the Platform.
          </p>
        </div>

        <div className="prose prose-sm max-w-none text-text-secondary space-y-8">

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">1. Role of Harbours360</h2>
            <p className="leading-relaxed">
              Harbours360 shall act strictly and exclusively as an escrow intermediary through its designated banking partner, Optimus Bank, for the purpose of facilitating secure and structured financial transactions between Buyers and Vendors on the Platform. In this capacity, Harbours360 does not take ownership, control, or beneficial interest in any funds deposited and held in escrow, but instead administers the escrow process as a neutral facilitator in accordance with agreed transaction terms. All escrow funds shall be deposited into and maintained within designated escrow accounts managed by Optimus Bank, which serves as the official financial custodian of such funds in compliance with applicable banking and regulatory requirements.
            </p>
            <p className="leading-relaxed mt-3">
              Under this arrangement, payments made by Buyers are securely held by Optimus Bank and are not accessible to Vendors until all agreed contractual conditions, milestones, or delivery obligations have been satisfactorily fulfilled and verified. The release of escrow funds shall be based on predefined triggers, including confirmation of delivery, acceptance of goods, or completion of specified project milestones, as agreed by the parties. Harbours360, in coordination with Optimus Bank, may oversee and administer the process to ensure transparency, accountability, and compliance with transaction terms.
            </p>
            <p className="leading-relaxed mt-3">
              The User acknowledges that Harbours360&rsquo;s role is limited to facilitating and administering the escrow mechanism and that the Platform does not act as a financial institution, nor does it assume liability for the performance of the parties. This structure is implemented to reduce transaction risk, promote trust, and safeguard the commercial interests of all stakeholders within the Harbours360 ecosystem.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">2. Escrow Process</h2>
            <p className="leading-relaxed">
              Under the Harbours360 escrow framework, all financial transactions between Buyers and Vendors shall follow a structured, sequential process designed to ensure transparency, accountability, and risk mitigation for all parties involved. The process begins when the Buyer deposits the agreed funds into a designated escrow account operated through Optimus Bank, serving as the secure financial custodian. At this stage, the funds are held in trust and are protected from access by the Vendor until all predefined transaction conditions are satisfied.
            </p>
            <p className="leading-relaxed mt-3">
              Following confirmation of fund deposit, the Vendor proceeds to deliver the agreed goods or complete specified milestones in accordance with the contractual terms. These milestones may include manufacturing completion, shipment, delivery, installation, or any other deliverable agreed between the parties. The Vendor acknowledges that performance must strictly align with agreed specifications, timelines, and compliance standards.
            </p>
            <p className="leading-relaxed mt-3">
              Upon completion of the Vendor&rsquo;s obligations, the Buyer shall inspect and confirm acceptance of the goods or delivered milestone, either directly or through approved third-party inspection agents where applicable. This confirmation acts as the trigger for the next stage of the escrow process.
            </p>
            <p className="leading-relaxed mt-3">
              Once acceptance is formally confirmed, Harbours360, in coordination with Optimus Bank, shall authorize the release of funds to the Vendor, in accordance with the agreed payment structure. This release mechanism ensures that payment is only made upon satisfactory performance and protects the Buyer from premature disbursement.
            </p>
            <p className="leading-relaxed mt-3">
              This step-by-step process&mdash;deposit, performance, confirmation, and release&mdash;is repeated as necessary in milestone-based transactions. The Buyer and Vendor acknowledge that this escrow structure is mandatory unless otherwise agreed and is designed to uphold the integrity, security, and trustworthiness of the Harbours360 procurement ecosystem.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">3. Disputes in Escrow</h2>
            <p className="leading-relaxed">
              In the event that any dispute, disagreement, or claim arises between the Buyer and the Vendor in relation to a transaction conducted through the Harbours360 Platform, the parties expressly agree that the applicable escrowed funds shall be immediately secured and held in place pending full resolution of the dispute. Such funds, which are maintained through the designated escrow arrangement with Optimus Bank, shall not be released to either party until the dispute has been resolved in accordance with the agreed procedures. This measure is designed to preserve the integrity of the transaction, prevent financial loss, and ensure that neither party gains an unfair advantage while the matter remains unresolved.
            </p>
            <p className="leading-relaxed mt-3">
              Upon notification of a dispute, Harbours360 shall initiate its formal mediation process, acting as a neutral facilitator to review the circumstances and guide the parties toward an amicable settlement. The mediation process may involve the submission of relevant documentation, including contracts, inspection reports, delivery records, and audit findings from designated third-party inspectors where applicable. The parties are required to participate in good faith, provide all requested information promptly, and cooperate fully with the mediation procedures established by the Platform.
            </p>
            <p className="leading-relaxed mt-3">
              Harbours360 reserves the right to determine the appropriate course of action during mediation, including recommending partial release, corrective actions, or retention of funds until final determination. The Vendor and Buyer acknowledge that this structured approach is essential to maintaining trust, reducing risk, and protecting the overall commercial ecosystem of Harbours360.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">4. Liability</h2>
            <p className="leading-relaxed">
              The User expressly acknowledges and agrees that Harbours360 operates solely as a neutral, technology-driven platform and does not guarantee the success, performance, or outcome of any transaction conducted through its system. While the Platform is designed to provide a structured, transparent, and efficient marketplace for Buyers and Vendors to interact, the ultimate success of any transaction depends on multiple external factors that remain outside the direct control of Harbours360. These factors may include, but are not limited to, the accuracy of specifications provided by the Buyer, the performance and reliability of the Vendor, supply chain constraints, shipping conditions, regulatory approvals, and prevailing market circumstances. Accordingly, Harbours360 expressly disclaims any responsibility or liability for failed transactions, delays, non-performance, or any losses arising from such factors.
            </p>
            <p className="leading-relaxed mt-3">
              Furthermore, Harbours360&rsquo;s role within the financial framework of the Platform is strictly limited to the administration and facilitation of escrow mechanisms through its designated banking partner, Optimus Bank. In this capacity, Harbours360 acts solely as an intermediary that coordinates the holding and release of funds based on predefined contractual conditions agreed between the Buyer and the Vendor. The Platform does not hold, own, invest, or utilize escrowed funds for its own purposes and does not function as a financial institution, lender, or insurer. Instead, its role is confined to ensuring that escrow processes are executed in accordance with agreed milestones, confirmations, and dispute resolution procedures.
            </p>
            <p className="leading-relaxed mt-3">
              The User further acknowledges that Harbours360 does not monitor, supervise, or guarantee the internal operations, financial stability, technical capabilities, or commercial conduct of any Vendor or Buyer. While the Platform may provide certain support services such as onboarding verification, third-party inspection coordination, and compliance screening, these measures are intended to enhance transparency and reduce risk, and they shall not be construed as warranties, endorsements, or assurances of performance. The decision to engage in any transaction remains solely at the discretion of the participating parties, who undertake such engagements at their own commercial risk.
            </p>
            <p className="leading-relaxed mt-3">
              In addition, Harbours360 shall not be liable for any indirect, incidental, or consequential damages arising from the use of the Platform, including but not limited to loss of profit, business interruption, reputational harm, or operational delays. The Platform&rsquo;s responsibility is strictly limited to the proper functioning of its technological infrastructure and the fair administration of its escrow processes. Any disputes relating to product quality, delivery obligations, contractual performance, or regulatory compliance shall be resolved directly between the Buyer and the Vendor in accordance with the agreed dispute resolution mechanisms.
            </p>
            <p className="leading-relaxed mt-3">
              For the avoidance of doubt, the User agrees that Harbours360&rsquo;s role as an escrow administrator is mechanical and procedural in nature, meaning that fund releases are executed only upon receipt of the required confirmations, documentation, or milestone completions as defined in the transaction terms. The Platform does not exercise independent judgment over the merits of a transaction beyond its facilitative role, except in cases of dispute where mediation processes apply.
            </p>
            <p className="leading-relaxed mt-3">
              This limitation of liability is fundamental to the operation of Harbours360 as a scalable digital marketplace and is intended to ensure that the Platform can provide a secure and efficient environment without assuming undue commercial or financial risks that properly belong to the transacting parties. By using the Platform, the User expressly agrees to these limitations and acknowledges that Harbours360&rsquo;s responsibility is confined to facilitation and escrow administration, and not to the substantive performance of any transaction.
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-text-secondary text-sm">
            For escrow enquiries, contact{" "}
            <a href="mailto:info@habours360.com" className="text-ocean hover:underline">info@habours360.com</a>.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/legal/vendor-agreement" className="text-ocean hover:underline">Vendor Agreement</Link>
            <Link href="/legal/buyer-agreement" className="text-ocean hover:underline">Buyer Agreement</Link>
            <Link href="/legal/compliance" className="text-ocean hover:underline">Compliance Manual</Link>
            <Link href="/privacy" className="text-ocean hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
