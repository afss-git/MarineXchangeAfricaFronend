import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function VendorAgreementPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link href="/terms" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-navy transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Legal Documents
        </Link>

        <div className="mb-10">
          <span className="text-ocean text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Legal</span>
          <h1 className="text-navy font-extrabold mb-3" style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.03em" }}>
            Vendor Agreement
          </h1>
          <div className="text-text-secondary text-sm space-y-1">
            <p>This Vendor Agreement (&ldquo;Agreement&rdquo;) is made between:</p>
            <p><strong className="text-navy">HARBOUR LIMITED (RC 9553415)</strong> (&ldquo;Company&rdquo; / &ldquo;Harbours360&rdquo;)</p>
            <p>AND</p>
            <p><strong className="text-navy">The Registered Vendor</strong> (&ldquo;Vendor&rdquo;)</p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-text-secondary space-y-8">

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">1. Appointment</h2>
            <p className="leading-relaxed">
              The Vendor hereby appoints Harbours360, operated by Harbour Limited, as a non-exclusive digital marketplace facilitator for the purpose of listing, promoting, and connecting the Vendor&rsquo;s products and/or services with potential Buyers. This appointment authorizes Harbours360 to provide platform-based services that enhance the visibility of the Vendor&rsquo;s offerings, facilitate requests for quotations (RFQs), and enable commercial interactions between the Vendor and interested Buyers. Being <em>non-exclusive</em>, the Vendor retains the unrestricted right to market, sell, and distribute its products or services through other platforms or channels without limitation or obligation to Harbours360.
            </p>
            <p className="leading-relaxed mt-3">
              It is expressly agreed that the relationship established under this Agreement is strictly that of an independent contractual arrangement. Nothing contained herein shall be construed as creating, implying, or giving rise to any form of partnership, whether under statutory or common law, between the Vendor and Harbours360. Similarly, this Agreement does not establish an employment relationship, and no party shall be considered an employer, employee, or agent of the other for any purpose whatsoever.
            </p>
            <p className="leading-relaxed mt-3">
              Furthermore, the parties agree that this arrangement does not constitute a joint venture or any form of shared ownership, control, or profit-sharing enterprise. Each party shall operate independently, bearing its own risks, obligations, and liabilities. Neither party shall have the authority to bind, represent, or incur obligations on behalf of the other except as expressly provided in writing.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">2. Legal Compliance Obligations</h2>
            <p className="leading-relaxed">
              The Vendor shall, at all times during the subsistence of this Agreement, ensure full compliance with all applicable laws, regulations, and industry standards governing its operations and the products or services it provides through the Platform. This includes, but is not limited to, strict adherence to the Companies and Allied Matters Act (CAMA 2020), which regulates corporate conduct and governance in Nigeria, as well as the Petroleum Industry Act (PIA 2021), which governs exploration, production, and supply activities within the oil and gas sector. Where maritime operations are involved, the Vendor shall comply with the Merchant Shipping Act, all directives issued by the Nigerian Maritime Administration and Safety Agency (NIMASA), and operational requirements of the Nigerian Ports Authority (NPA), particularly in relation to port entry, cargo handling, and equipment compliance. Additionally, the Vendor shall observe all applicable environmental, health, and safety regulations, including those relating to pollution control, offshore safety standards, and hazardous materials handling.
            </p>
            <p className="leading-relaxed mt-3">
              Furthermore, the Vendor must maintain all necessary and valid licenses, permits, and certifications required to lawfully operate within its industry. The Vendor shall ensure that all goods, particularly offshore and industrial equipment, meet recognized international standards such as API (American Petroleum Institute), ISO (International Organization for Standardization), and NACE (National Association of Corrosion Engineers) where applicable. The Vendor is also responsible for ensuring that all offshore equipment supplied is properly tested, certified, and fit for purpose in accordance with industry and regulatory requirements. Failure to maintain such compliance shall constitute a material breach of this Agreement.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">3. Products &amp; Services</h2>
            <p className="leading-relaxed">
              The Vendor hereby expressly represents and warrants that all goods, equipment, and services listed or supplied through the Platform are genuine, authentic, and legally owned or lawfully controlled by the Vendor. The Vendor further confirms that it possesses valid title, rights, or authorized distributorship over such goods, free from any encumbrances, liens, or third-party claims. The Vendor shall not offer any goods that are obtained through unlawful means, including stolen, diverted, or improperly acquired materials, and shall ensure that all transactions conducted are consistent with applicable commercial and regulatory laws.
            </p>
            <p className="leading-relaxed mt-3">
              The Vendor additionally warrants that all goods supplied are safe, functional, and fit for their intended offshore, maritime, or industrial use, and meet all applicable safety, operational, and technical standards required within the oil and gas and maritime sectors. This includes ensuring that equipment is properly tested, compliant with recognized international standards, and suitable for deployment in high-risk environments such as offshore platforms, vessels, and industrial facilities. The Vendor shall be solely responsible for ensuring that all goods meet regulatory safety requirements and shall bear full liability for any defects, failures, or hazards arising from the use of such goods.
            </p>
            <p className="leading-relaxed mt-3">
              Furthermore, the Vendor strictly undertakes not to list, supply, or distribute any counterfeit, substandard, hazardous, restricted, or prohibited items, including any goods subject to local or international sanctions, embargoes, or trade restrictions. The Vendor shall not engage in or facilitate any activities related to piracy, illegal bunkering, smuggling, or unauthorized maritime operations, and shall ensure full compliance with all anti-sanctions and anti-terrorism regulations. Any breach of this clause shall constitute a material violation and may result in immediate termination of the Vendor&rsquo;s access to the Platform, in addition to any legal consequences under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">4. Pricing &amp; Quotations</h2>
            <p className="leading-relaxed">
              The Vendor shall at all times ensure full transparency, fairness, and integrity in all pricing and commercial engagements conducted through the Platform. Accordingly, the Vendor must provide clear, accurate, and itemized pricing for all goods and services listed, including detailed breakdowns where necessary. Such pricing shall reflect the true cost of the goods, inclusive of applicable logistics, handling, and statutory charges where relevant. In addition, the Vendor expressly acknowledges and agrees that all prices quoted, whether in listings or in response to Requests for Quotation (RFQs), shall include an agreed Agency Facilitation Fee of Ten Percent (10%) payable to Harbour Limited, which forms part of the overall transaction structure. The Vendor shall not attempt to conceal, misrepresent, or exclude this fee in any direct or indirect manner.
            </p>
            <p className="leading-relaxed mt-3">
              Furthermore, the Vendor is obligated to respond to all RFQs within a commercially reasonable timeframe, taking into account the nature, technical complexity, and urgency of the request. Failure to respond consistently or within reasonable time may affect the Vendor&rsquo;s performance rating and continued participation on the Platform.
            </p>
            <p className="leading-relaxed mt-3">
              The Vendor shall also strictly refrain from engaging in any form of price manipulation, market distortion, or collusive practices, including but not limited to coordinated pricing with other Vendors, artificial inflation or suppression of prices, or any conduct intended to undermine fair competition. All pricing activities must comply with applicable competition laws and principles of good faith. Any breach of this clause shall constitute a material violation of this Agreement and may result in immediate suspension or termination of the Vendor&rsquo;s access to Harbours360.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">5. Delivery &amp; Performance</h2>
            <p className="leading-relaxed">
              The Vendor shall bear full responsibility for the execution of all delivery obligations arising from any transaction conducted through the Platform. This includes ensuring timely delivery of goods in accordance with agreed schedules and contractual milestones. The Vendor shall take all necessary steps to avoid delays and shall promptly notify the Buyer and the Platform of any circumstances that may affect delivery timelines. In addition, the Vendor is solely responsible for quality assurance, ensuring that all goods supplied meet the required specifications, industry standards, and operational integrity necessary for offshore, maritime, or industrial applications.
            </p>
            <p className="leading-relaxed mt-3">
              The Vendor shall also ensure that all goods are properly packaged, labeled, and prepared in compliance with maritime logistics standards, including requirements relating to cargo handling, hazardous materials (where applicable), and transportation safety. All shipments shall strictly comply with internationally recognized shipping rules, including proper documentation, export compliance, and adherence to port authority requirements.
            </p>
            <p className="leading-relaxed mt-3">
              All delivery obligations shall be governed by the applicable Incoterms (International Commercial Terms) as published by the International Chamber of Commerce (ICC). These include:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>EXW (Ex Works):</strong> Vendor makes goods available at its premises; Buyer bears all transport risks.</li>
              <li><strong>FCA (Free Carrier):</strong> Vendor delivers goods to a carrier nominated by Buyer.</li>
              <li><strong>FAS (Free Alongside Ship):</strong> Goods placed alongside vessel at port of shipment.</li>
              <li><strong>FOB (Free on Board):</strong> Vendor loads goods onto vessel; risk transfers once onboard.</li>
              <li><strong>CFR (Cost and Freight):</strong> Vendor pays shipping costs to destination port; risk transfers at loading.</li>
              <li><strong>CIF (Cost, Insurance and Freight):</strong> Same as CFR but includes insurance.</li>
              <li><strong>CPT (Carriage Paid To):</strong> Vendor pays freight to destination; risk transfers earlier.</li>
              <li><strong>CIP (Carriage and Insurance Paid To):</strong> Same as CPT with insurance included.</li>
              <li><strong>DAP (Delivered at Place):</strong> Vendor responsible for delivery to destination, excluding import duties.</li>
              <li><strong>DPU (Delivered at Place Unloaded):</strong> Vendor delivers and unloads at destination.</li>
              <li><strong>DDP (Delivered Duty Paid):</strong> Vendor bears all costs and risks including duties and clearance.</li>
            </ul>
            <p className="leading-relaxed mt-3">
              Notwithstanding the foregoing, Harbours360 shall, through its appointed independent inspection partner, AA Heritage Limited and Assured Inspection Services Ltd, act in the capacity of a Quality Assurance and Quality Control (Q&amp;Q) Surveyor. In this role, AA Heritage Limited shall provide third-party inspection, technical audits, safety verification, and conformity assessment services for goods supplied through the Platform. This includes pre-dispatch inspection, equipment certification verification, and compliance audits to ensure that all supplied goods meet required industry, safety, and operational standards.
            </p>
            <p className="leading-relaxed mt-3">
              Such inspection services are designed to enhance transaction confidence and safeguard quality; however, they shall not relieve the Vendor of its primary responsibility for product quality, performance, or compliance, nor shall they constitute a warranty or guarantee by Harbours360.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">6. Payment Terms</h2>
            <p className="leading-relaxed">
              The Vendor acknowledges and agrees that all financial transactions conducted through the Harbours360 Platform shall be governed by structured and transparent payment mechanisms designed to safeguard both Vendors and Buyers while ensuring regulatory compliance. Payments may be executed through one or more of the following models, depending on the nature and terms of the transaction: escrow-based payments, where funds are held securely until contractual obligations are satisfied; milestone-based payments, where funds are released in stages upon completion of agreed deliverables; or direct payments between the Vendor and the Buyer, where such structure is expressly agreed and permitted under the Platform. Each payment structure shall be clearly defined prior to the commencement of any transaction.
            </p>
            <p className="leading-relaxed mt-3">
              The Vendor further agrees that all platform-related financial transactions shall be processed through designated financial channels approved by Harbours360. In this regard, Optimus Bank shall serve as the primary banking partner for all Vendors registered on the Platform, and Vendors are required to maintain valid and active accounts with Optimus Bank for settlement of local transactions where applicable. For international transactions, including cross-border payments and foreign exchange conversions, the Platform shall utilize BankiPay as its designated online payment gateway, which facilitates secure international payments, including conversion of foreign currency (such as United States Dollars) into Nigerian Naira as required by applicable transaction terms and Central Bank of Nigeria (CBN) regulations.
            </p>
            <p className="leading-relaxed mt-3">
              The Vendor expressly agrees to all applicable platform service fees, commissions, and transaction charges imposed by Harbours360, including the agreed agency fee structure, which shall be integrated into pricing and payment arrangements. Where financing or credit facilities are extended to Buyers, including procurement financing or deferred payment arrangements, the applicable interest rates, repayment terms, and financing conditions shall be determined and agreed upon during commercial negotiations between the relevant parties, subject to prevailing financial regulations and institutional policies.
            </p>
            <p className="leading-relaxed mt-3">
              Failure by the Vendor to comply with any agreed payment structure, fee obligation, or financial regulation shall constitute a material breach of this Agreement and may result in suspension, withholding of payments, or termination of access to the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">7. Liability</h2>
            <p className="leading-relaxed">
              The Vendor expressly acknowledges and agrees that it shall bear full and exclusive responsibility and liability for all goods, services, and obligations arising from any transaction conducted through the Harbours360 Platform. Accordingly, the Vendor shall be solely liable for any defective, substandard, or non-conforming products, whether such defects relate to design, manufacturing, certification, performance, or suitability for offshore, maritime, or industrial use. The Vendor further undertakes to ensure that all goods supplied meet agreed specifications and industry standards, and shall be fully accountable for any loss, damage, injury, or operational failure resulting from defective products.
            </p>
            <p className="leading-relaxed mt-3">
              In addition, the Vendor shall be solely responsible for any breach of contract, including failure to deliver goods within agreed timelines, failure to meet quality or performance standards, or failure to comply with any contractual obligations entered into with a Buyer. The Vendor acknowledges that such breaches may give rise to claims for damages, termination of contracts, or other remedies available under Nigerian law.
            </p>
            <p className="leading-relaxed mt-3">
              Furthermore, the Vendor shall bear full liability for any regulatory violations, including non-compliance with applicable laws, regulations, standards, and licensing requirements governing maritime, oil and gas, environmental, and commercial operations. This includes liability arising from non-compliance with statutory authorities such as NIMASA, NPA, or regulatory bodies under the Petroleum Industry Act.
            </p>
            <p className="leading-relaxed mt-3">
              Notwithstanding the foregoing, the Vendor expressly agrees that Harbours360 operates solely as a digital facilitation platform and shall bear no liability whatsoever for the performance, conduct, or obligations of the Vendor. The Platform does not guarantee the quality, delivery, or legality of goods supplied, and shall not be held responsible for any disputes, losses, or damages arising from Vendor performance.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">8. Intellectual Property</h2>
            <p className="leading-relaxed">
              The Vendor shall at all times retain full ownership of all intellectual property rights associated with its products, services, trademarks, technical data, specifications, images, documentation, and any proprietary materials submitted or made available on the Platform. Nothing contained in this Agreement shall be construed as transferring or assigning any intellectual property rights from the Vendor to Harbours360. The Vendor&rsquo;s ownership remains intact and protected under applicable intellectual property laws.
            </p>
            <p className="leading-relaxed mt-3">
              Notwithstanding the foregoing, the Vendor hereby irrevocably grants to Harbours360 a fully paid, worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, display, and distribute all content, materials, and data provided by the Vendor for the purposes of operating, managing, promoting, and scaling the Platform. This includes, without limitation, the right to display Vendor listings across the Platform, integrate such listings into digital catalogs, search systems, and procurement workflows, and utilize such materials in marketing, advertising, investor presentations, analytics systems, and platform-related communications.
            </p>
            <p className="leading-relaxed mt-3">
              The Vendor further agrees that Harbours360 may format, optimize, and digitally process such content to improve visibility, user experience, and commercial efficiency on the Platform. This license extends to the use of Vendor content across affiliated systems, technology infrastructure, and partner integrations necessary for the operation of Harbours360.
            </p>
            <p className="leading-relaxed mt-3">
              For the avoidance of doubt, this license shall remain valid for the duration of the Vendor&rsquo;s presence on the Platform and for a reasonable period thereafter for archival, compliance, and transaction-related purposes. The Vendor acknowledges that such rights are essential for the effective operation, growth, and commercialization of Harbours360 and expressly waives any claim against the Platform arising from the authorized use of such materials.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">9. Termination</h2>
            <p className="leading-relaxed">
              Harbours360 reserves the full and absolute right, at its sole discretion and without prejudice to any other remedies available under law or contract, to suspend, restrict, or permanently terminate the Vendor&rsquo;s account and access to the Platform where it reasonably determines that certain risk thresholds or violations have been met. In particular, such termination rights shall apply where fraud is detected or reasonably suspected, including but not limited to misrepresentation of products, submission of false certifications, manipulation of transactions, or any conduct intended to deceive Buyers or the Platform. In such circumstances, Harbours360 shall not be obligated to provide prior notice where immediate action is necessary to protect the integrity of the Platform or its users.
            </p>
            <p className="leading-relaxed mt-3">
              Furthermore, Harbours360 may terminate or suspend a Vendor&rsquo;s account where there is a failure to maintain compliance with applicable laws, regulatory requirements, industry standards, or Platform policies. This includes, but is not limited to, non-compliance with maritime regulations, petroleum industry standards, safety certifications, or licensing obligations. The Platform shall also have the right to act where the Vendor fails to meet internal compliance thresholds, audit requirements, or verification standards established by Harbours360 or its appointed third-party auditors.
            </p>
            <p className="leading-relaxed mt-3">
              In addition, Harbours360 retains the right to act where a Vendor&rsquo;s actions, omissions, or associations create or are likely to create reputational risk to the Platform, its stakeholders, or other users. This includes any conduct that may damage trust, credibility, or the commercial standing of Harbours360 in the marketplace. The Vendor acknowledges that such determinations shall be made solely by the Platform in the interest of protecting its ecosystem, and the Vendor waives any claim arising from such good-faith actions taken for risk management, compliance, and brand protection purposes.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">10. Dispute Resolution</h2>
            <p className="leading-relaxed">
              All disputes, claims, or controversies arising out of or in connection with any transaction conducted on the Harbours360 Platform shall be resolved through a structured two-tier dispute resolution mechanism, designed to ensure efficiency, confidentiality, and preservation of commercial relationships. As a primary step, all parties agree that disputes shall first be submitted to Harbours360&rsquo;s internal mediation process. This mediation process shall be conducted by the Platform or its appointed representatives in a neutral and facilitative capacity, with the objective of achieving an amicable resolution within a commercially reasonable timeframe. The Vendor expressly acknowledges that such mediation is a mandatory pre-condition to any further dispute proceedings and agrees to participate in good faith, provide all necessary documentation, and comply with the procedural guidelines established by Harbours360. The Platform&rsquo;s mediation process shall prioritize speed, cost-efficiency, and business continuity, and any interim recommendations or determinations made during mediation may be considered persuasive in subsequent proceedings.
            </p>
            <p className="leading-relaxed mt-3">
              Where a dispute cannot be resolved through mediation, the matter shall be referred to final and binding arbitration in Abuja, Nigeria, in accordance with the applicable provisions of the Arbitration and Mediation Act of Nigeria. The arbitration shall be conducted by a single arbitrator appointed in accordance with the rules agreed or, failing such agreement, by a recognized arbitral institution. The proceedings shall be confidential, and the decision of the arbitrator shall be final and binding on all parties, enforceable in any court of competent jurisdiction. The Vendor agrees that this dispute resolution framework is intended to minimize disruption to the Platform&rsquo;s operations, protect its commercial ecosystem, and avoid protracted litigation, and hereby waives the right to initiate court proceedings except for the enforcement of arbitral awards or where expressly permitted by law.
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-text-secondary text-sm">
            For queries regarding this Agreement, contact{" "}
            <a href="mailto:info@habours360.com" className="text-ocean hover:underline">info@habours360.com</a>.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/legal/buyer-agreement" className="text-ocean hover:underline">Buyer Agreement</Link>
            <Link href="/legal/escrow" className="text-ocean hover:underline">Escrow Agreement</Link>
            <Link href="/legal/compliance" className="text-ocean hover:underline">Compliance Manual</Link>
            <Link href="/privacy" className="text-ocean hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
