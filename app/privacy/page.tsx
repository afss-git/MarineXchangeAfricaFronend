import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-navy transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="mb-10">
          <span className="text-ocean text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Legal</span>
          <h1 className="text-navy font-extrabold mb-3" style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.03em" }}>
            Privacy Policy
          </h1>
          <p className="text-text-secondary text-sm">HARBOURS360 PRIVACY POLICY — NDPA 2023 Compliant</p>
        </div>

        <div className="prose prose-sm max-w-none text-text-secondary space-y-8">

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">1. Legal Basis</h2>
            <p className="leading-relaxed">
              This Privacy Policy is developed and implemented in full compliance with the Nigerian Data Protection Act (NDPA) 2023 and all relevant data protection regulations and guidelines applicable within the Federal Republic of Nigeria. The NDPA establishes the legal framework for the lawful collection, processing, storage, and transfer of personal and corporate data, and imposes strict obligations on data controllers and processors including digital platforms such as Harbours360 to ensure that all data handling practices are transparent, secure, and accountable. In alignment with these requirements, Harbours360 has adopted robust data governance measures designed to safeguard the integrity, confidentiality, and availability of all user data processed through its systems.
            </p>
            <p className="leading-relaxed mt-3">
              In furtherance of its compliance obligations, Harbours360 ensures that all personal and business data collected from Users, including Vendors and Buyers, is processed strictly for lawful and defined purposes, such as facilitating transactions, verifying identities, ensuring regulatory compliance, and improving platform functionality. The Platform shall only collect data that is necessary and proportionate for these purposes and shall implement appropriate technical and organizational measures to prevent unauthorized access, loss, or misuse of such data.
            </p>
            <p className="leading-relaxed mt-3">
              Additionally, Harbours360 recognizes and upholds the rights of data subjects as provided under the NDPA, including the rights to access, correct, and request the deletion of personal data where applicable. The Platform also ensures that any sharing of data with third parties, regulators, or partners is done strictly in compliance with legal requirements and on a need-to-know basis. By using the Platform, Users acknowledge and consent to the processing of their data in accordance with this Privacy Policy and the applicable data protection laws of Nigeria.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">2. Data Collected</h2>
            <p className="leading-relaxed">
              Harbours360 collects and processes certain categories of data necessary for the effective operation, security, and regulatory compliance of the Platform. This includes company registration data, which encompasses corporate identification details such as business names, incorporation numbers, registered addresses, director information, and relevant licensing or certification documents. This information is required to verify the legal status of Vendors and Buyers, ensure compliance with the Companies and Allied Matters Act (CAMA 2020), and maintain the integrity of all parties operating within the Platform.
            </p>
            <p className="leading-relaxed mt-3">
              In addition, Harbours360 collects and maintains records of transaction history conducted through the Platform. This includes details of procurement activities, contracts, quotations, orders, delivery milestones, and dispute records where applicable. Such information is essential for operational transparency, audit purposes, dispute resolution, and compliance with applicable commercial and regulatory frameworks.
            </p>
            <p className="leading-relaxed mt-3">
              The Platform also collects payment information, including transaction records, escrow details, and financial settlement data processed through designated banking and payment partners such as Optimus Bank and BankiPay. While Harbours360 does not store sensitive banking credentials beyond what is necessary, it ensures that all payment-related data is handled securely in accordance with regulatory requirements.
            </p>
            <p className="leading-relaxed mt-3">
              Furthermore, Harbours360 monitors platform activity, including user interactions, login data, usage patterns, and system engagement metrics. This data is used to improve platform functionality, enhance security, detect fraudulent activity, and optimize user experience. All data collected is processed strictly for legitimate business purposes and in compliance with applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">3. Purpose of Data Use</h2>
            <p className="leading-relaxed">
              Harbours360 collects and processes user data strictly for clearly defined, lawful, and legitimate business purposes that are essential to the effective operation of the Platform. One of the primary purposes of data collection is to facilitate transactions between Buyers and Vendors in a secure, structured, and efficient manner. This includes enabling communication, processing requests for quotations, managing procurement workflows, coordinating inspections, and supporting payment processes such as escrow and milestone releases. The availability of accurate and relevant data allows Harbours360 to ensure that transactions are executed with transparency and accountability, thereby enhancing trust across all parties within the marketplace.
            </p>
            <p className="leading-relaxed mt-3">
              In addition, Harbours360 processes data to maintain full regulatory compliance with applicable laws and industry standards. This includes verifying the identity and legal status of Users, maintaining audit trails for transactions, supporting anti-money laundering (AML) obligations, and ensuring adherence to data protection regulations such as the Nigerian Data Protection Act (NDPA 2023). Data may also be used to respond to lawful requests from regulatory authorities and to ensure that all platform activities meet required legal and compliance thresholds within the maritime and oil and gas sectors.
            </p>
            <p className="leading-relaxed mt-3">
              Furthermore, Harbours360 utilizes collected data to improve platform services and optimize user experience. This includes analyzing usage patterns, enhancing system performance, strengthening security protocols, and developing new features that better support procurement operations. By leveraging data insights, the Platform is able to continuously refine its services, increase operational efficiency, and deliver a more seamless and reliable marketplace environment for all Users.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">4. Data Storage &amp; Security</h2>
            <p className="leading-relaxed">
              Harbours360 maintains a robust and comprehensive data security framework to ensure that all information collected and processed through the Platform is stored securely and protected against unauthorized access, misuse, or disclosure. All data, including company registration records, transaction details, and operational information, is stored using secure, industry-standard systems and infrastructure, incorporating appropriate encryption protocols, controlled access environments, and data segregation mechanisms. These measures are designed to prevent data loss, corruption, or unauthorized alteration, while ensuring that only authorized personnel and systems can access sensitive information on a strictly need-to-know basis.
            </p>
            <p className="leading-relaxed mt-3">
              In addition, Harbours360 implements advanced technical and organizational safeguards to protect data against unauthorized access or cyber threats. This includes the use of firewalls, secure authentication mechanisms, access controls, continuous system monitoring, and intrusion detection systems. User accounts are protected through secure login protocols, and all platform interactions are governed by strict security policies to minimize the risk of breaches or unauthorized activity. Where third-party service providers are engaged—such as financial institutions or inspection partners—Harbours360 ensures that such entities comply with equivalent data protection and security standards.
            </p>
            <p className="leading-relaxed mt-3">
              Furthermore, Harbours360 regularly reviews and updates its security practices to align with evolving industry standards and regulatory requirements, including the Nigerian Data Protection Act (NDPA 2023). Notwithstanding these measures, Users acknowledge that while the Platform takes all reasonable steps to safeguard data, no system can be guaranteed to be entirely risk-free. Accordingly, Users are also responsible for maintaining the confidentiality of their account credentials and for promptly reporting any suspected unauthorized access or security concerns.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">5. Data Sharing</h2>
            <p className="leading-relaxed">
              Harbours360 may, in the course of operating its platform, disclose or share user data strictly on a limited and lawful basis, and only where such disclosure is necessary to enable the effective functioning of transactions or to comply with legal obligations. In the first instance, data may be shared between Vendors and Buyers where such sharing is required for transactional purposes. This includes the exchange of essential information such as company identity details, product specifications, delivery information, and relevant documentation necessary for the negotiation, execution, and fulfillment of contracts. Such data sharing is strictly confined to what is necessary to complete the transaction and is carried out in a controlled manner to ensure confidentiality and commercial integrity between the parties.
            </p>
            <p className="leading-relaxed mt-3">
              Additionally, Harbours360 may disclose user data to regulatory authorities, governmental agencies, or law enforcement bodies where such disclosure is required by law or pursuant to a valid legal process. This includes compliance with obligations under applicable statutes such as the Nigerian Data Protection Act (NDPA 2023), anti-money laundering regulations, tax laws, maritime regulations, and petroleum sector compliance requirements. In such cases, disclosure shall be made only to the extent required and in accordance with due legal procedures, including court orders, regulatory directives, or statutory mandates.
            </p>
            <p className="leading-relaxed mt-3">
              Harbours360 shall not share user data indiscriminately or for unauthorized purposes and shall ensure that all data sharing activities are conducted with appropriate safeguards to protect confidentiality, integrity, and security. By using the Platform, Users acknowledge and consent to such limited and necessary sharing of data as part of the operational and legal requirements of the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-navy font-bold text-lg mb-3">6. User Rights</h2>
            <p className="leading-relaxed">
              Under the Nigerian Data Protection Act (NDPA 2023) and applicable data protection regulations, Harbours360 recognizes and upholds the statutory rights of all Users in relation to their personal and corporate data. Accordingly, Users are entitled, subject to lawful limitations, to request access to any data held about them by the Platform. This includes the right to obtain confirmation as to whether their data is being processed, as well as access to such data in a clear and intelligible format. Harbours360 shall respond to such requests within a reasonable timeframe and in accordance with applicable legal requirements, provided that the request does not compromise the rights of other users or the integrity of the Platform.
            </p>
            <p className="leading-relaxed mt-3">
              In addition, Users have the right to request correction of any inaccurate, incomplete, or outdated data maintained by Harbours360. The Platform acknowledges that accurate data is critical to transaction integrity and regulatory compliance, and shall take reasonable steps to ensure that any verified corrections are promptly implemented across relevant systems. Users are, however, responsible for notifying the Platform of inaccuracies and providing sufficient supporting evidence to enable such corrections.
            </p>
            <p className="leading-relaxed mt-3">
              Furthermore, Users may request the deletion or erasure of their personal data where such request is lawful and permissible under applicable regulations. This right is subject to certain limitations, including where data retention is required for contractual, regulatory, audit, or legal purposes. Harbours360 may retain certain information where necessary to comply with obligations under financial regulations, dispute resolution processes, or statutory record-keeping requirements.
            </p>
            <p className="leading-relaxed mt-3">
              Harbours360 shall process all such requests in good faith, in line with the NDPA, while balancing user rights with legal and operational obligations necessary for the continued integrity, security, and lawful operation of the Platform.
            </p>
            <p className="leading-relaxed mt-3">
              To exercise any of your data rights, contact us at{" "}
              <a href="mailto:info@habours360.com" className="text-ocean hover:underline">info@habours360.com</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
