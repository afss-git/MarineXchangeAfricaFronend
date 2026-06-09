import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link href="/terms" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-navy transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Legal Documents
        </Link>

        <div className="mb-10">
          <span className="text-ocean text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Legal</span>
          <h1 className="text-navy font-extrabold mb-3" style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.03em" }}>
            Platform Compliance Manual
          </h1>
          <p className="text-text-secondary text-sm">HARBOURS360 COMPLIANCE FRAMEWORK</p>
        </div>

        <div className="prose prose-sm max-w-none text-text-secondary space-y-8">

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">1. Corporate Compliance</h2>
            <p className="leading-relaxed">
              Harbour Limited shall at all times operate in full and strict compliance with the provisions of the Companies and Allied Matters Act (CAMA 2020), which serves as the primary legal framework governing corporate formation, management, governance, and accountability within the Federal Republic of Nigeria. In adherence to CAMA, the Company shall maintain proper corporate records, including statutory registers, financial statements, and filings as required by the Corporate Affairs Commission (CAC). The Company shall ensure that all corporate actions, decision-making processes, and operational structures are aligned with its Memorandum and Articles of Association, and that its activities are conducted within the scope of its registered objects. Furthermore, Harbour Limited shall ensure transparency in its financial reporting, maintain proper accounting standards, and comply with all statutory obligations such as annual returns, tax compliance, and regulatory disclosures.
            </p>
            <p className="leading-relaxed mt-3">
              In addition, the Company shall implement and maintain effective Board oversight procedures to ensure sound corporate governance and strategic direction. The Board of Directors shall be responsible for the overall management and supervision of the Company&rsquo;s affairs, exercising its powers in accordance with CAMA 2020 and the Company&rsquo;s internal governance policies. This includes oversight of risk management, regulatory compliance, financial stewardship, and operational performance. The Board shall hold regular meetings, make decisions collectively or through duly authorized committees, and ensure that all actions taken are properly documented and recorded.
            </p>
            <p className="leading-relaxed mt-3">
              The Board shall also ensure that internal controls, compliance frameworks, and corporate policies are consistently enforced across all operations of the Company, including the management of Harbours360. Directors shall act in good faith, in the best interest of the Company, and shall avoid conflicts of interest in accordance with statutory duties under CAMA. Through these governance structures, Harbour Limited ensures accountability, transparency, and long-term sustainability in its operations.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">2. Industry Compliance</h2>
            <p className="leading-relaxed">
              Harbour Limited, through its Harbours360 platform, operates within a multi-layered regulatory environment governed by key Nigerian laws and industry-specific authorities across the oil &amp; gas, maritime, and port logistics sectors. The Company shall ensure strict and continuous compliance with all such frameworks, as they are critical to the lawful execution of procurement, logistics, and offshore operations.
            </p>
            <p className="leading-relaxed mt-3">
              With respect to the oil and gas sector, all activities conducted through the Platform shall comply with the provisions of the Petroleum Industry Act (PIA 2021), which serves as the principal legislation governing exploration, production, supply, and commercialization of petroleum resources in Nigeria. Users of the Platform, particularly Vendors and Buyers dealing in petroleum-related equipment or services, must adhere to all requirements imposed by sector regulators such as the Nigerian Upstream Petroleum Regulatory Commission (NUPRC) for upstream activities and the Nigerian Midstream and Downstream Petroleum Regulatory Authority (NMDPRA) for midstream and downstream operations. Additionally, compliance with the Nigerian Content Development and Monitoring Board (NCDMB) is mandatory to ensure alignment with local content requirements under the Nigerian Oil and Gas Industry Content Development Act, particularly in relation to sourcing, contracting, and utilization of local resources and expertise. Transactions involving industry procurement may also be integrated with or aligned to standards established by the Nigerian Petroleum Exchange (NIPEX) platform, which governs procurement processes within the oil and gas ecosystem.
            </p>
            <p className="leading-relaxed mt-3">
              In the maritime sector, Harbours360 ensures that all shipping, offshore deployment, and marine logistics activities comply with applicable regulations enforced by the Nigerian Maritime Administration and Safety Agency (NIMASA), including safety, vessel certification, and crew standards. In addition, compliance with the Merchant Shipping Act is required, which governs vessel operations, cargo handling, and maritime safety obligations. These laws establish operational and safety standards that must be observed by all parties engaging in offshore transportation and equipment deployment through the Platform.
            </p>
            <p className="leading-relaxed mt-3">
              With respect to port and logistics operations, all activities involving cargo movement, port entry, and terminal operations shall comply with the rules and procedures of the Nigerian Ports Authority (NPA). This includes adherence to port clearance procedures, berth allocations, cargo handling standards, and port safety requirements. Additionally, the Nigerian Shippers&rsquo; Council (NSC) plays a key role in regulating shipping costs, protecting cargo owners, and ensuring fair trade practices within Nigerian ports, and Users of the Platform must align with its guidelines where applicable.
            </p>
            <p className="leading-relaxed mt-3">
              Collectively, these regulatory frameworks establish a comprehensive compliance structure ensuring that all transactions conducted via Harbours360 are legally valid, operationally safe, and aligned with national and international industry standards. Harbour Limited reserves the right to enforce compliance checks, request regulatory documentation, and suspend or terminate any User who fails to meet these statutory obligations, in order to protect the integrity of the Platform and its stakeholders.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">3. Anti-Money Laundering (AML)</h2>
            <p className="leading-relaxed">
              Harbours360 operates a comprehensive Know Your Customer (KYC) and transaction monitoring framework designed to ensure that all participants on the Platform are properly identified, verified, and compliant with applicable legal and regulatory requirements. Accordingly, all Users, including Vendors and Buyers, are required to undergo mandatory KYC verification prior to accessing or conducting transactions on the Platform. This process involves the collection and validation of corporate and, where necessary, individual identification data, including registration documents under the Companies and Allied Matters Act (CAMA 2020), tax identification numbers, business addresses, and details of directors or authorized representatives. The purpose of this verification is to confirm the legitimacy, legal status, and operational credibility of all Users, thereby ensuring that only duly authorized and compliant entities participate within the Harbours360 ecosystem.
            </p>
            <p className="leading-relaxed mt-3">
              In addition to initial verification, Harbours360 maintains an ongoing system of continuous monitoring of user activities and transactions in order to detect and prevent suspicious or potentially unlawful conduct. This includes monitoring transaction patterns, payment flows, procurement behavior, and account activity for indicators of fraud, money laundering, sanctions violations, or any other irregular or high-risk behavior. Where any suspicious activity is identified or reasonably suspected, Harbours360 reserves the right to take immediate and proportionate action, including the suspension of accounts, freezing of transactions or escrowed funds, and notification of relevant regulatory or law enforcement authorities in accordance with applicable laws such as anti-money laundering regulations and financial compliance requirements.
            </p>
            <p className="leading-relaxed mt-3">
              Users are required to cooperate fully with any verification or investigation processes initiated by Harbours360 and to provide additional information or documentation as may be required from time to time. Failure to comply with KYC requirements, or engagement in activities deemed suspicious or unlawful, shall constitute a material breach of Platform policies and may result in termination of access, enforcement actions, and possible legal consequences. This KYC and monitoring framework is essential to maintaining a secure, transparent, and compliant marketplace environment, protecting all stakeholders and safeguarding the integrity and reputation of Harbours360.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">4. Vendor Monitoring</h2>
            <p className="leading-relaxed">
              Harbours360 shall implement a continuous and structured system of performance evaluation to ensure that all Vendors operating on the Platform maintain high standards of service delivery, reliability, and operational excellence. Under this framework, the Platform shall monitor and assess Vendor performance based on key metrics, including but not limited to timeliness of delivery, quality of goods supplied, responsiveness to Requests for Quotations (RFQs), adherence to contractual obligations, and overall customer satisfaction. These evaluations may incorporate feedback from Buyers, transaction records, inspection reports, and system-generated performance indicators. The Vendor acknowledges that such evaluations are essential to maintaining a trusted and efficient marketplace, and that performance ratings may directly influence visibility on the Platform, eligibility for transactions, and continued participation within the Harbours360 ecosystem.
            </p>
            <p className="leading-relaxed mt-3">
              In addition to performance monitoring, Harbours360 shall conduct periodic and, where necessary, unscheduled compliance audits to ensure that all Vendors and Users adhere to applicable legal, regulatory, and Platform requirements. These audits may include verification of corporate documentation, review of certifications and licenses, assessment of operational practices, and inspection of compliance with industry standards such as those applicable to maritime and oil &amp; gas operations. Harbours360 reserves the right to engage independent third-party auditors where appropriate to enhance the credibility and objectivity of such assessments.
            </p>
            <p className="leading-relaxed mt-3">
              Vendors are required to cooperate fully with all evaluation and audit processes and to promptly provide any requested documentation or clarification. Failure to meet performance thresholds or to pass compliance audits may result in corrective actions, including suspension, restriction, or termination of access to the Platform. This dual framework of performance evaluation and compliance oversight ensures that Harbours360 maintains a high-quality, trustworthy, and regulatory-compliant environment for all participants.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">5. Data Protection</h2>
            <p className="leading-relaxed">
              Harbours360 is committed to maintaining full and continuous compliance with the Nigerian Data Protection Act (NDPA) 2023 and all applicable data protection regulations, recognizing data privacy and security as critical components of its operational framework. In line with the NDPA, the Platform ensures that all personal and corporate data collected, processed, or stored is handled lawfully, fairly, and transparently. Harbours360 processes data only for specific, legitimate purposes directly related to the facilitation of transactions, regulatory compliance, and platform functionality. Appropriate safeguards are implemented to protect data against unauthorized access, accidental loss, misuse, or disclosure. These safeguards include secure data storage systems, controlled access protocols, encryption mechanisms, and continuous monitoring of data-related activities. The Platform also ensures that data retention practices comply with legal requirements, retaining only such data as is necessary for contractual, regulatory, and operational purposes.
            </p>
            <p className="leading-relaxed mt-3">
              In addition to statutory compliance, Harbours360 has established a robust system of internal data governance to oversee how data is managed across its operations. This governance framework includes clearly defined policies, procedures, and accountability structures to ensure that data is handled consistently and responsibly at all levels of the organization. Designated personnel are responsible for monitoring compliance, managing data access controls, and ensuring that all employees, contractors, and third-party partners adhere to strict confidentiality and data protection standards. Regular internal reviews and audits may be conducted to identify risks, improve processes, and ensure alignment with evolving regulatory requirements and best practices.
            </p>
            <p className="leading-relaxed mt-3">
              Through its commitment to NDPA compliance and strong internal data governance, Harbours360 ensures that all data operations are conducted with integrity, transparency, and accountability. Users can therefore engage with the Platform with confidence, knowing that their data is protected in accordance with recognized legal and industry standards.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">6. Risk Management</h2>
            <p className="leading-relaxed">
              Harbours360 maintains a comprehensive and proactive approach to risk management, designed to identify, assess, mitigate, and monitor potential risks that may arise within its procurement and digital marketplace operations. This framework is essential to ensuring the stability, reliability, and integrity of all activities conducted on the Platform. Risk management at Harbours360 encompasses financial risks, operational risks, regulatory risks, and transactional risks, all of which are continuously evaluated through internal controls, system monitoring, and structured compliance mechanisms. The Platform reserves the right to implement preventive and corrective measures, including transaction restrictions or account suspension, where any risk is identified that could adversely affect the ecosystem.
            </p>
            <p className="leading-relaxed mt-3">
              In furtherance of this framework, Harbours360 conducts ongoing transaction oversight, ensuring that all procurement activities, payment flows, and contractual engagements are monitored for consistency, compliance, and accuracy. This includes verification of transaction milestones, coordination with escrow systems, review of documentation, and monitoring for irregular patterns or deviations from agreed terms. Such oversight is designed to enhance transparency and reduce the likelihood of disputes or fraudulent activity.
            </p>
            <p className="leading-relaxed mt-3">
              Where disputes do arise, Harbours360 operates structured dispute handling procedures, including mediation and escalation protocols, to facilitate timely and fair resolution. These procedures ensure that both Buyers and Vendors are provided with an orderly and confidential mechanism for resolving disagreements while minimizing operational disruptions.
            </p>
            <p className="leading-relaxed mt-3">
              Additionally, Harbours360 places significant emphasis on reputational risk control, recognizing that trust and credibility are critical to the success of the Platform. The Company reserves the right to take immediate action against any User whose conduct may damage the reputation, reliability, or commercial standing of the Platform. This includes monitoring user behavior, enforcing compliance standards, and removing participants whose actions undermine the integrity or public perception of Harbours360.
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-text-secondary text-sm">
            For compliance enquiries, contact{" "}
            <a href="mailto:info@habours360.com" className="text-ocean hover:underline">info@habours360.com</a>.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/legal/vendor-agreement" className="text-ocean hover:underline">Vendor Agreement</Link>
            <Link href="/legal/buyer-agreement" className="text-ocean hover:underline">Buyer Agreement</Link>
            <Link href="/legal/escrow" className="text-ocean hover:underline">Escrow Agreement</Link>
            <Link href="/privacy" className="text-ocean hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
