import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle the form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-purple-900">
            Contact Us
          </h1>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-purple-900 mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-6">
                Have questions about our song recommender? Want to share feedback? 
                We'd love to hear from you! Fill out the form and we'll get back to you 
                as soon as possible.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span>support@songrecommender.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <span>Response time: Within 24 hours</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 bg-purple-100 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-purple-900 mb-4">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">What is your typical response time?</h3>
                <p className="text-gray-700">We aim to respond to all inquiries within 24 hours during business days.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Do you offer support for business inquiries?</h3>
                <p className="text-gray-700">Yes, we handle both personal and business inquiries. Please specify your needs in the message.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Can I suggest new features?</h3>
                <p className="text-gray-700">Absolutely! We love hearing from our users. Feel free to send us your suggestions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;