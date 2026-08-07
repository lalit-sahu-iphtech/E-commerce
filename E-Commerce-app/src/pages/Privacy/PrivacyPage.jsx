import "./privacy.css";

export default function PrivacyPage() {
  return (
    <section className="privacy-page">
      <div className="privacy-container">
        <h1>Privacy Policy</h1>

        <p className="privacy-intro">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information when you use our
          website.
        </p>

        <div className="privacy-section">
          <h2>1. Information We Collect</h2>
          <p>
            We may collect your name, email address, phone number, shipping
            address, and payment information when you place an order or create
            an account.
          </p>
        </div>

        <div className="privacy-section">
          <h2>2. How We Use Your Information</h2>
          <p>
            Your information is used to process orders, improve our services,
            provide customer support, and send important updates related to your
            account or purchases.
          </p>
        </div>

        <div className="privacy-section">
          <h2>3. Data Protection</h2>
          <p>
            We take appropriate security measures to protect your personal data
            from unauthorized access, alteration, or disclosure.
          </p>
        </div>

        <div className="privacy-section">
          <h2>4. Cookies</h2>
          <p>
            Our website may use cookies to improve your browsing experience and
            analyze website traffic.
          </p>
        </div>

        <div className="privacy-section">
          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about our Privacy Policy, please contact
            us through our Contact page.
          </p>
        </div>
      </div>
    </section>
  );
}