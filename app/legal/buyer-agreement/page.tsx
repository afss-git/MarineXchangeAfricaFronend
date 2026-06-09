import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BuyerAgreementPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link href="/terms" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-navy transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Legal Documents
        </Link>

        <div className="mb-10">
          <span className="text-ocean text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Legal</span>
          <h1 className="text-navy font-extrabold mb-3" style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.03em" }}>
            Buyer Agreement
          </h1>
          <div className="text-text-secondary text-sm space-y-1">
            <p>Between:</p>
            <p><strong className="text-navy">HARBOUR LIMITED</strong> (&ldquo;Platform&rdquo;)</p>
            <p>AND</p>
            <p><strong className="text-navy">Registered Buyer</strong></p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-text-secondary space-y-8">

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">1. Platform Role</h2>
            <p className="leading-relaxed">
              Harbours360 operates strictly as a digital facilitation platform and shall, at all times, be regarded solely as an intermediary providing technological infrastructure for connecting Buyers and Vendors. The Platform&rsquo;s role is limited to enabling product listings, facilitating communication, supporting procurement workflows, and, where applicable, providing ancillary services such as inspection coordination, escrow administration, and transaction management. Harbours360 does not manufacture, own, stock, or supply goods, nor does it assume the obligations of any party involved in a transaction unless expressly agreed in writing. The Buyer expressly acknowledges that the Platform&rsquo;s involvement is administrative and facilitative in nature, and that its primary purpose is to create a structured and efficient marketplace environment.
            </p>
            <p className="leading-relaxed mt-3">
              The Buyer further acknowledges and agrees that the Vendor remains the sole contracting party in respect of any transaction entered into through the Platform. All contractual obligations relating to the supply of goods and services&mdash;including but not limited to quality, specifications, delivery timelines, certifications, and warranties&mdash;rest exclusively with the Vendor. Any agreement, whether executed digitally through the Platform or otherwise, is deemed to be directly between the Buyer and the Vendor, and Harbours360 shall not be construed as a principal party to such agreement.
            </p>
            <p className="leading-relaxed mt-3">
              Accordingly, the Buyer accepts that Harbours360 does not guarantee or warrant the performance, quality, safety, or compliance of any products or services provided by Vendors. While the Platform may support due diligence processes, including third-party inspections and audits, such measures are intended to enhance transparency and do not constitute a guarantee or assumption of liability. The Buyer agrees that all procurement decisions are made at its own discretion and risk, and that Harbours360 shall not be held liable for any loss, damage, or dispute arising from Vendor performance or product-related issues.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">2. Buyer Obligations</h2>
            <p className="leading-relaxed">
              The Buyer shall bear full responsibility for ensuring that all procurement requests and transactions initiated through the Harbours360 Platform are conducted with accuracy, legality, and full regulatory compliance. In this regard, the Buyer is obligated to provide clear, detailed, and accurate specifications for all goods and services requested, including technical requirements, operational standards, and performance expectations. The Buyer acknowledges that Vendors rely on such specifications to prepare quotations and fulfill orders, and any inaccuracies, omissions, or ambiguities may result in delays, mismatched deliveries, or contractual disputes. Accordingly, the Buyer agrees that Harbours360 shall not be held responsible for any consequences arising from incomplete or incorrect information provided by the Buyer.
            </p>
            <p className="leading-relaxed mt-3">
              Furthermore, the Buyer shall ensure full compliance with all applicable import and export laws, including customs regulations, foreign exchange requirements, shipping restrictions, and documentation obligations imposed by Nigerian authorities and any relevant foreign jurisdictions. This includes adherence to rules set by the Nigeria Customs Service (NCS), Central Bank of Nigeria (CBN), and other regulatory agencies governing cross-border trade.
            </p>
            <p className="leading-relaxed mt-3">
              In addition, the Buyer is solely responsible for obtaining and maintaining all necessary regulatory approvals, permits, and clearances required for the importation, use, or deployment of goods within Nigeria, particularly in specialized sectors such as oil and gas and maritime operations. Harbours360 shall have no obligation to secure or verify such approvals on behalf of the Buyer and shall not be liable for any delays, penalties, or losses resulting from the Buyer&rsquo;s failure to meet these regulatory requirements.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">3. Payment</h2>
            <p className="leading-relaxed">
              The Buyer hereby expressly undertakes to comply with all agreed payment obligations arising from any transaction conducted on the Harbours360 Platform. The Buyer shall honor all payment timelines strictly as agreed within the commercial terms of the transaction, whether such payments are structured on a full upfront basis, milestone basis, or under an escrow arrangement. Timely payment is fundamental to the integrity of the Platform and the continuity of transactions, and the Buyer acknowledges that failure to meet payment deadlines may disrupt supply chains, impact Vendor performance, and undermine the reliability of the procurement ecosystem established by Harbours360.
            </p>
            <p className="leading-relaxed mt-3">
              In furtherance of transaction security and transparency, the Buyer agrees to comply with all escrow and milestone payment conditions as administered through the Platform. Harbours360, in partnership with Optimus Bank, shall operate as the designated escrow facilitator, whereby funds deposited by the Buyer shall be securely held in escrow accounts to which the Vendor shall have no direct or unilateral access until agreed contractual milestones have been duly satisfied and verified. This structure is intended to protect all parties, ensure accountability, and maintain confidence in high-value offshore and industrial transactions.
            </p>
            <p className="leading-relaxed mt-3">
              The Buyer further acknowledges that both Buyers and Vendors may have access to financing solutions facilitated through Optimus Bank via Harbours360, subject to eligibility and approval. Any such financing shall be governed by agreed terms, including applicable interest rates at prevailing market conditions, which shall be negotiated between the parties and the financial institution.
            </p>
            <p className="leading-relaxed mt-3">
              For avoidance of doubt, non-payment, delayed payment, or refusal to comply with agreed escrow or financing terms shall constitute a material breach of contract, entitling Harbours360 to suspend access, enforce remedies, and take appropriate legal or recovery action to protect the integrity of the Platform and its stakeholders.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">4. Inspection &amp; Acceptance</h2>
            <p className="leading-relaxed">
              The Buyer shall have the right, prior to final acceptance of any goods or equipment, to conduct inspection and verification procedures to ensure that such goods conform to the agreed technical specifications, quality requirements, and applicable industry standards. This inspection may be carried out directly by the Buyer or through designated independent third-party inspection agencies approved on the Platform. In this regard, the Buyer acknowledges that AA Heritage Navigation Limited shall act as the appointed Equipment Safety and Technical Auditor, responsible for carrying out safety inspections, technical audits, and verification of offshore and industrial equipment. Additionally, Assured Inspection Services Limited shall serve as the Quality Assurance and Quality Control (Q&amp;Q) auditors for oil and petroleum-related products, ensuring compliance with industry and regulatory standards.
            </p>
            <p className="leading-relaxed mt-3">
              These inspection processes are intended to provide an additional layer of verification and confidence within the transaction framework; however, they do not constitute a warranty by Harbours360. Upon completion of inspection and subsequent reconfirmation by the Buyer that the goods or equipment meet the required standards, the Buyer shall formally accept the goods.
            </p>
            <p className="leading-relaxed mt-3">
              Upon such acceptance, all risk, responsibility, and liability in respect of the goods&mdash;including risks of damage, loss, operational failure, or subsequent handling&mdash;shall immediately transfer to the Buyer, in accordance with the agreed contractual terms and applicable Incoterms. From this point onward, the Buyer assumes full responsibility for the goods, and Harbours360 shall have no further liability in respect of product condition, performance, or post-delivery outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">5. Regulatory Compliance</h2>
            <p className="leading-relaxed">
              The Buyer shall at all times ensure full compliance with all applicable laws, regulations, and procedural requirements governing the importation, exportation, and use of goods within Nigeria and any relevant international jurisdictions. This includes strict adherence to all Nigerian Customs Service (NCS) laws and regulations, which govern the proper classification, declaration, valuation, and clearance of imported goods. The Buyer shall be solely responsible for ensuring that all customs documentation is accurate, complete, and submitted within the prescribed timelines, including payment of all applicable duties, levies, and statutory charges. The Buyer further acknowledges that any breach of customs regulations may result in penalties, seizure of goods, or other enforcement actions for which Harbours360 shall bear no responsibility.
            </p>
            <p className="leading-relaxed mt-3">
              In addition, where transactions involve oil, gas, or petroleum-related products or equipment, the Buyer must comply fully with all applicable petroleum regulations under the Petroleum Industry Act (PIA 2021) and any directives issued by relevant regulatory bodies. This includes obtaining necessary permits, approvals, and certifications required for the importation, storage, transportation, or use of such products within the petroleum sector.
            </p>
            <p className="leading-relaxed mt-3">
              Furthermore, the Buyer shall comply with all maritime import/export procedures, including those prescribed by the Nigerian Ports Authority (NPA), NIMASA, and other relevant maritime agencies, particularly in relation to port operations, cargo handling, and safety requirements. The Buyer accepts that it is solely responsible for ensuring that all regulatory obligations are fulfilled, and Harbours360 shall not be liable for any delays, penalties, losses, or legal consequences arising from the Buyer&rsquo;s failure to comply with these requirements.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">6. Liability</h2>
            <p className="leading-relaxed">
              The Buyer shall bear full and exclusive responsibility for the proper use, application, and handling of all goods and equipment procured through the Harbours360 Platform. Accordingly, the Buyer shall be solely liable for any misuse of goods, whether arising from improper installation, incorrect operation, failure to follow manufacturer guidelines, or deployment of equipment outside its intended purpose. The Buyer acknowledges that many of the goods traded on the Platform are designed for specialized offshore, maritime, and industrial environments, and improper use may result in operational failure, environmental damage, or safety risks. Harbours360 shall not be held liable for any consequences arising from such misuse or deviation from prescribed usage standards.
            </p>
            <p className="leading-relaxed mt-3">
              In addition, the Buyer shall be fully responsible for any compliance failures related to the procurement, importation, storage, or use of goods. This includes failure to obtain necessary permits, licenses, or regulatory approvals required under applicable laws governing maritime operations, oil and gas activities, or environmental protection. The Buyer acknowledges that compliance obligations remain solely with the procuring entity and that Harbours360 has no duty to verify or enforce regulatory compliance on behalf of the Buyer beyond its facilitation role.
            </p>
            <p className="leading-relaxed mt-3">
              Furthermore, the Buyer shall be accountable for any inaccurate, incomplete, or misleading specifications provided during the procurement process. The Buyer understands that Vendors rely entirely on such specifications to manufacture, source, and supply goods, and any errors or ambiguities may lead to incorrect deliveries, project delays, or operational inefficiencies. In such instances, the Buyer shall bear all associated risks, costs, and liabilities, and Harbours360 shall not be responsible for any outcomes resulting from inaccurate information supplied by the Buyer.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">7. Dispute Resolution</h2>
            <p className="leading-relaxed">
              The Buyer hereby agrees that all disputes, claims, or controversies arising out of or in connection with any transaction conducted on the Harbours360 Platform shall be resolved in accordance with the same structured dispute resolution framework applicable to Vendors, namely mandatory mediation followed by binding arbitration. As a first step, the Buyer shall submit any dispute to Harbours360&rsquo;s internal mediation process, which shall serve as the primary and compulsory mechanism for dispute resolution. During this stage, Harbours360, acting as a neutral facilitator, shall review submissions, assess supporting documentation, and guide the parties toward an amicable settlement within a commercially reasonable timeframe. The Buyer undertakes to participate in this mediation process in good faith and to cooperate fully with all procedural requirements established by the Platform. The Buyer acknowledges that mediation is intended to provide a swift, confidential, and cost-effective resolution while minimizing disruption to ongoing commercial activities.
            </p>
            <p className="leading-relaxed mt-3">
              In the event that the dispute cannot be resolved through mediation, the Buyer agrees that the matter shall be referred to final and binding arbitration, as provided under applicable Nigerian law. The arbitration shall be conducted in accordance with recognized arbitration procedures, and the decision rendered shall be conclusive and enforceable. The Buyer expressly waives the right to initiate or pursue litigation in conventional courts, except for the limited purpose of enforcing an arbitral award or where otherwise permitted by law. This dispute resolution mechanism is designed to preserve the operational integrity of the Harbours360 ecosystem, ensure confidentiality of commercial dealings, and provide an efficient alternative to protracted legal proceedings, and the Buyer agrees to be fully bound by its terms.
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-text-secondary text-sm">
            For queries regarding this Agreement, contact{" "}
            <a href="mailto:info@habours360.com" className="text-ocean hover:underline">info@habours360.com</a>.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/legal/vendor-agreement" className="text-ocean hover:underline">Vendor Agreement</Link>
            <Link href="/legal/escrow" className="text-ocean hover:underline">Escrow Agreement</Link>
            <Link href="/legal/compliance" className="text-ocean hover:underline">Compliance Manual</Link>
            <Link href="/privacy" className="text-ocean hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
