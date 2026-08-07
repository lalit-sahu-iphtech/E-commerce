import { useState } from "react";
import "./faq.css";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How can I place an order?",
      answer:
        "Browse products, add them to your cart, and proceed to checkout to place your order.",
    },
    {
      question: "Do I need an account to purchase?",
      answer:
        "Yes, you need to sign up or log in before adding products to the cart and placing orders.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept Credit Cards, Debit Cards, UPI, Net Banking, and other supported payment methods.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Yes, orders can be canceled before they are shipped from our warehouse.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can visit our Contact page and submit your query or contact our support team directly.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-page">
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>

        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div
              className="faq-question"
              onClick={() => toggleFaq(index)}
            >
              <h3>{faq.question}</h3>
              <span>{openIndex === index ? "−" : "+"}</span>
            </div>

            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}