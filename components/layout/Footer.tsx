'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Phone, Mail, MapPin, Instagram, Facebook, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Prepare', href: '#prepare' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/ashokanoutdoors/' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/ashokanoutdoors' },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8 }}
      className="relative border-t border-white/5"
    >
      {/* Gradient fade at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Col 1: Logo + Tagline */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-display text-2xl text-white mb-4">
              Ashokan{' '}
              <span className="text-forest-400">Outdoors</span>
            </h3>
            <p className="font-body text-stone-400 text-sm leading-relaxed max-w-xs">
              Guided Fly Fishing and Hiking trips in The Catskill Mountains
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-body font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-stone-400 text-sm hover:text-forest-300 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="font-body font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=187+Watson+Hollow+Road+West+Shokan+NY+12494"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin className="w-4 h-4 text-forest-500 mt-0.5 flex-shrink-0" />
                  <span className="font-body text-stone-400 text-sm group-hover:text-stone-200 transition-colors">
                    187 Watson Hollow Road
                    <br />
                    West Shokan, NY 12494
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+19172329951" className="flex items-center gap-3 group">
                  <Phone className="w-4 h-4 text-forest-500 flex-shrink-0" />
                  <span className="font-body text-stone-400 text-sm group-hover:text-stone-200 transition-colors">
                    (917) 232-9951
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:ashokanoutdoors@gmail.com" className="flex items-center gap-3 group">
                  <Mail className="w-4 h-4 text-forest-500 flex-shrink-0" />
                  <span className="font-body text-stone-400 text-sm group-hover:text-stone-200 transition-colors">
                    ashokanoutdoors@gmail.com
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Social + Badge */}
          <div>
            <h4 className="font-body font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-8">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    'w-10 h-10 rounded-lg bg-white/5 border border-white/10',
                    'flex items-center justify-center',
                    'hover:bg-forest-500/20 hover:border-forest-500/30 transition-all duration-300'
                  )}
                >
                  <social.icon className="w-5 h-5 text-stone-400 hover:text-white transition-colors" />
                </a>
              ))}
            </div>

            {/* NYSOGA Badge */}
            <div>
              <p className="font-body text-stone-500 text-xs uppercase tracking-wider mb-3">
                Proud Member
              </p>
              <Image
                src="/images/nysoga-badge.png"
                alt="NYSOGA Member Badge"
                width={120}
                height={60}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-stone-500 text-sm">
            &copy; 2025 Ashokan Outdoors. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className={cn(
              'group flex items-center gap-2 font-body text-stone-500 text-sm',
              'hover:text-forest-400 transition-colors duration-300'
            )}
            aria-label="Back to top"
          >
            Back to top
            <div
              className={cn(
                'w-8 h-8 rounded-lg bg-white/5 border border-white/10',
                'flex items-center justify-center',
                'group-hover:bg-forest-500/20 group-hover:border-forest-500/30 transition-all duration-300'
              )}
            >
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </motion.footer>
  )
}
