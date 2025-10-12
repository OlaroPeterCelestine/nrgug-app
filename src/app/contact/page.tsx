'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { apiUtils } from '@/lib/api-utils'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    purpose: '',
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const purposeOptions = [
    'General Inquiry',
    'Partnership',
    'Event Booking',
    'Music Submission',
    'Advertising',
    'Technical Support',
    'Feedback',
    'Other'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.purpose || !formData.name || !formData.email || !formData.subject || !formData.message) {
      setMessage('Please fill in all fields')
      setIsSuccess(false)
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      await apiUtils.submitContactForm(formData)
      setMessage('Thank you for your message! We will get back to you soon.')
      setIsSuccess(true)
      setFormData({ purpose: '', name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setMessage('Network error. Please try again.')
      setIsSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative bg-black text-white min-h-screen">
      <Header createPlayer={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to partner with NRG Radio? We&apos;re here to help you reach your audience and grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="purpose" className="block text-sm font-medium mb-3">Purpose of reaching out?</label>
                  <select
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    <option value="">Select Purpose</option>
                    {purposeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-3">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Your Name"
                    className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-3">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Your Email"
                    className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-3">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Subject"
                    className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-3">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    rows={4}
                    placeholder="Your Message"
                    className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {message && (
                  <div className={`p-3 rounded ${
                    isSuccess ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {message}
                  </div>
                )}
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">Find Us</h2>
              <div className="bg-gray-800 rounded-lg p-6 mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7500!2d32.5825!3d0.3163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db8b8b8b8b8b8%3A0x8b8b8b8b8b8b8b8b!2sClement%20Hill%20Road%2C%20Kampala%2C%20Uganda!5e0!3m2!1sen!2sug!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded"
                ></iframe>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Address</h3>
                  <p className="text-gray-300">Clement Hill Road, Kampala, Uganda</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Phone</h3>
                  <p className="text-gray-300">0740674674</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <p className="text-gray-300">tech@nrgug.radio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
