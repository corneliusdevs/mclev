const TermsAndContitionsPage = () => {
  return (
    <main className="lg:mt-[70px]">
      <div className="mt-4 px-2 md:px-4">
        <h1 className="text-xl font-bold">Terms and Conditions</h1>

        {/* INTRODUCTION */}
        <div className="mb-3">
          <h2 className="font-bold">1. Introduction</h2>
          <p>
            These Terms and Conditions govern your use of our website and the
            services we provide.
          </p>
          <p>
            By using our website, you agree to be bound by these Terms and
            Conditions.
          </p>
        </div>

        {/* SERVICES */}
        <div className="mb-3">
          <h2 className="font-bold">2. Services</h2>
          <ul className="list-disc pl-6">
            <li>We provide cleaning services to our customers.</li>
            <li>
              The specific services and pricing are outlined on our website and
              may be subject to change.
            </li>
            <li>
              We reserve the right to refuse service to any customer for any
              reason.
            </li>
          </ul>
        </div>

        {/* SCHEDULING AND CANCELLATION */}
        <div className="mb-3">
          <h2 className="font-bold">3. Scheduling and Cancellation</h2>
          <ul className="list-disc pl-6">
            <li>
              You can schedule cleaning services through our website or by
              contacting our customer service.
            </li>
            <li>
              We require at least 24 hours&#39; notice for any cancellations or
              rescheduling requests.
            </li>
            <li>
              Failure to provide adequate notice may result in a cancellation
              fee.
            </li>
          </ul>
        </div>

        {/* PAYMENT */}
        <div className="mb-3">
          <h2 className="font-bold">4. Payment</h2>
          <ul className="pl-6 list-disc">
            <li>
              You agree to pay the fees for the services you request, as
              outlined on our website or in your service agreement.
            </li>
            <li>
              We accept various payment methods, including credit/debit cards
              and online payment platforms.
            </li>
            <li>
              Payments are due at the time of service or upon receipt of an
              invoice.
            </li>
          </ul>
        </div>

        {/* LIABILITY */}
        <div className="mb-3">
          <h2 className="font-bold">5. Liability</h2>
          <ul className="list-disc pl-6">
            <li>
              We will make every effort to provide high-quality cleaning
              services, but we cannot guarantee the results.
            </li>
            <li>
              We are not liable for any damage or loss caused by our cleaning
              services, unless it is due to our negligence or willful
              misconduct.
            </li>
            <li>
              You are responsible for securing or removing any valuable items or
              sensitive information before our cleaning services are provided.
            </li>
          </ul>
        </div>

        {/* INTELLECTUAL PROPERTY */}
        <div className="mb-3">
          <h2 className="font-bold">6. Intellectual Property</h2>
          <ul className="list-disc pl-6">
            <li>
              Our website and all its content, including text, graphics, logos,
              and images, are the property of our company and are protected by
              copyright and other intellectual property laws.
            </li>
            <li>
              You may not reproduce, modify, or distribute any content from our
              website without our prior written permission.
            </li>
          </ul>
        </div>

        {/* TERMINATION */}
        <div className="mb-3">
          <h2 className="font-bold">7. Termination</h2>
          <ul className="list-disc pl-6">
            <li>
              We reserve the right to terminate or suspend your access to our
              website or services at any time, for any reason, without notice.
            </li>
            <li>
              You may also terminate your use of our website or services at any
              time, but you will remain responsible for any outstanding payments
              or obligations.
            </li>
          </ul>
        </div>

        {/* CHANGES TO TERMS AND CONDITIONS */}
        <div className="mb-3">
          <h2 className="font-bold">8. Changes to Terms and Conditions</h2>
          <p>
            We may update these Terms and Conditions from time to time. Any
            changes will be posted on this page, and the revised version will be
            effective immediately upon posting.
          </p>
        </div>

        {/* GOVERNING LAW AND JURISDICTION */}
        <div className="mb-3">
          <h2 className="font-bold">9. Governing Law and Jurisdiction</h2>
          <p>
            These Terms and Conditions are governed by the laws of &#91;insert
            relevant jurisdiction&#93;, and any disputes arising from them will
            be resolved in the courts of &#91;insert relevant jurisdiction&#93;.
          </p>
        </div>
      </div>
    </main>
  );
};

export default TermsAndContitionsPage;
