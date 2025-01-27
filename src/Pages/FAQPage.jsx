
const FAQPage = () => {
  const faqs = [
    {
      question: "What is Click Rwanda?",
      answer:
        "Click Rwanda is a leading classified ads platform in Rwanda that enables users to buy, sell, rent, and advertise products and services within the Rwandan market.",
    },
    {
      question: "How can I post an ad on Click Rwanda?",
      answer:
        "To post an ad:\n1. Visit www.clickrwanda.com.\n2. Register or log in to your account.\n3. Click on the 'Post Ad' button.\n4. Fill in the required details about your product or service.\n5. Submit your ad for review.",
    },
    {
      question: "Is there a fee to post ads on Click Rwanda?",
      answer:
        "Yes, there are fees associated with posting ads:\n- Standard ads start from 2,000 RWF.\n- Promoting cars and houses is priced at 10,000 RWF.",
    },
    {
      question: "Can I purchase products directly through Click Rwanda?",
      answer:
        "Yes, you can purchase products through Click Rwanda. They offer delivery services to your location. For more details, contact them at 0739399391 or visit www.clickrwanda.com.",
    },
    {
      question: "How can I contact Click Rwanda for support or inquiries?",
      answer:
        "You can reach out to Click Rwanda through:\n- Phone: 0739399391\n- Social Media: Facebook, Instagram, TikTok",
    },
    {
      question: "Are there any promotional offers available?",
      answer:
        "Yes, Click Rwanda occasionally offers promotions. For instance, you can acquire a motorcycle for as low as 30,000 RWF. For the latest offers, contact them at 0727559173 or 0739399391.",
    },
    {
      question: "How do I stay updated with the latest news and offers from Click Rwanda?",
      answer:
        "To stay informed:\n- Follow their social media accounts (Facebook, Instagram, TikTok).\n- Regularly visit their website: www.clickrwanda.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Frequently Asked Questions (FAQs)
        </h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {faq.question}
              </h2>
              <p className="text-gray-600 mt-2 whitespace-pre-line">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
