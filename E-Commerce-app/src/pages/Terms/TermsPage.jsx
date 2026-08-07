import "./terms.css";

export default function TermsPage() {
  return (
    <section className="terms-page">
      <div className="terms-container">
        <h1>Terms of Use</h1>

        <p className="terms-intro">
          Welcome to our website. By accessing or using our services, you agree
          to comply with these Terms of Use. Please read them carefully before
          using our platform.
        </p>

        <div className="terms-section">
          <h2>1. Acceptance of Terms</h2>

          <p>
            By creating an account or placing an order, you agree to follow
            these Terms of Use and all applicable laws and regulations.
          </p>
        </div>

        <div className="terms-section">
          <h2>2. User Responsibilities</h2>

          <p>
            Users are responsible for providing accurate information, keeping
            their account credentials secure, and using the website only for
            lawful purposes.
          </p>
        </div>

        <div className="terms-section">
          <h2>3. Orders & Payments</h2>

          <p>
            All orders are subject to product availability and payment
            confirmation. We reserve the right to cancel or refuse any order if
            necessary.
          </p>
        </div>

        <div className="terms-section">
          <h2>4. Returns & Refunds</h2>

          <p>
            Products may be returned according to our Return Policy. Refunds
            will be processed after the returned items have been inspected and
            approved.
          </p>
        </div>

        <div className="terms-section">
          <h2>5. Changes to Terms</h2>

          <p>
            We may update these Terms of Use at any time. Continued use of the
            website after changes are posted means you accept the updated terms.
          </p>
        </div>

        <div className="terms-section">
          <h2>6. Contact Us</h2>

          <p>
            If you have any questions regarding these Terms of Use, please
            contact us through our Contact page.
          </p>
        </div>
      </div>
    </section>
  );
}