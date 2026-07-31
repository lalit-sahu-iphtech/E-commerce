import "./contact.css";

export default function Contact() {
  return (

    <div className="contact-page">

      <h1>Contact Us</h1>

      <form className="contact-form">

        <input
          type="text"
          placeholder="Your Name"
        />

        <input
          type="email"
          placeholder="Your Email"
        />

        <input
          type="text"
          placeholder="Subject"
        />

        <textarea
          rows="6"
          placeholder="Your Message"
        ></textarea>

        <button>
          Send Message
        </button>

      </form>

    </div>

  );
}