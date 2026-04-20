'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  'Fly Fishing Instruction',
  'Guided Fly Fishing - Half Day',
  'Guided Fly Fishing - Full Day',
  'Guided Hike - Half Day',
  'Guided Hike - Full Day',
]

const groupSizes = ['1', '2', '3', '4+']

const contactInfo = [
  { icon: MapPin, label: '187 Watson Hollow Road, West Shokan, NY 12494', href: 'https://maps.google.com/?q=187+Watson+Hollow+Road+West+Shokan+NY+12494' },
  { icon: Phone, label: '(917) 232-9951', href: 'tel:+19172329951' },
  { icon: Mail, label: 'ashokanoutdoors@gmail.com', href: 'mailto:ashokanoutdoors@gmail.com' },
  { icon: Instagram, label: '@ashokanoutdoors', href: 'https://www.instagram.com/ashokanoutdoors/' },
]

const inputClasses = cn(
  'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3',
  'font-body text-stone-100 placeholder:text-stone-500',
  'outline-none transition-all duration-300',
  'focus:border-forest-500/60 focus:shadow-[0_0_20px_rgba(61,139,61,0.15)]',
  'hover:border-white/20'
)

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    groupSize: '',
    date: '',
    message: '',
    website: '', // honeypot
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    // Honeypot check
    if (form.website) return

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          groupSize: form.groupSize,
          date: form.date,
          message: form.message,
        }),
      })

      if (!res.ok) throw new Error('Something went wrong. Please try again.')

      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', groupSize: '', date: '', message: '', website: '' })
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Failed to send. Please try again.')
    }
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-creek-400/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-forest-500/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-forest-400 font-body font-semibold tracking-widest uppercase text-sm mb-4">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Book Your Catskill{' '}
            <span className="gradient-text">Adventure</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-forest-500 to-creek-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* LEFT: Contact info + map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Owner */}
            <div>
              <h3 className="font-display text-2xl text-white mb-1">John Yanzek</h3>
              <p className="font-body text-forest-400 text-sm font-semibold tracking-wide uppercase">
                Owner &amp; Lead Guide
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-forest-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-forest-500/25 transition-colors">
                    <item.icon className="w-5 h-5 text-forest-400" />
                  </div>
                  <span className="font-body text-stone-300 group-hover:text-white transition-colors pt-2 text-sm">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="glass rounded-2xl overflow-hidden aspect-[4/3]">
              <div className="w-full h-full bg-forest-900/50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-forest-500/40 mx-auto mb-3" />
                  <p className="font-body text-stone-500 text-sm">
                    West Shokan, NY
                  </p>
                  <p className="font-body text-stone-600 text-xs mt-1">
                    Catskill Mountains
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Booking form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden">
              {/* Gradient border top */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-500/50 to-transparent" />

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-forest-500/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-forest-400" />
                  </div>
                  <h3 className="font-display text-2xl text-white mb-3">Message Sent!</h3>
                  <p className="font-body text-stone-400 max-w-sm">
                    Thank you for reaching out. We&apos;ll get back to you shortly to confirm your
                    adventure.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 font-body text-forest-400 hover:text-forest-300 underline underline-offset-4 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-body text-stone-400 text-sm mb-2">
                        Name <span className="text-forest-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block font-body text-stone-400 text-sm mb-2">
                        Email <span className="text-forest-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-body text-stone-400 text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className={inputClasses}
                    />
                  </div>

                  {/* Service + Group Size row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-body text-stone-400 text-sm mb-2">Service</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={cn(inputClasses, 'appearance-none cursor-pointer')}
                      >
                        <option value="" className="bg-forest-950">
                          Select a service
                        </option>
                        {services.map((s) => (
                          <option key={s} value={s} className="bg-forest-950">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-body text-stone-400 text-sm mb-2">
                        Group Size
                      </label>
                      <select
                        name="groupSize"
                        value={form.groupSize}
                        onChange={handleChange}
                        className={cn(inputClasses, 'appearance-none cursor-pointer')}
                      >
                        <option value="" className="bg-forest-950">
                          Select size
                        </option>
                        {groupSizes.map((s) => (
                          <option key={s} value={s} className="bg-forest-950">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block font-body text-stone-400 text-sm mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className={cn(inputClasses, 'cursor-pointer')}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-body text-stone-400 text-sm mb-2">Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your trip..."
                      className={cn(inputClasses, 'resize-none')}
                    />
                  </div>

                  {/* Error message */}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span className="font-body text-red-300 text-sm">{errorMsg}</span>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={cn(
                      'btn-primary w-full flex items-center justify-center gap-3',
                      status === 'sending' && 'opacity-70 pointer-events-none'
                    )}
                  >
                    <span>{status === 'sending' ? 'Sending...' : 'Book Now'}</span>
                    <Send className="w-4 h-4 relative z-10" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
