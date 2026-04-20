'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'Will you be driving us?',
    a: 'No. We will meet at beginning of our trip and from there we will move around as needed. You should bring your own vehicle and we will lead you to stream or trailhead.',
  },
  {
    q: 'Where can I change into my waders and boots?',
    a: "Most anglers slip off their waders on the roadside by their vehicles and wear whatever they have on underneath into local establishments. That said, there are lots of anglers in these parts, so you'll definitely see some wearing gear in restaurants and bars.",
  },
  {
    q: "I'm very experienced. Can you just guide me to the best locations?",
    a: "Absolutely! We have decades of experience fishing and hiking in this area and have guided anglers of all levels. We understand that the experienced angler values time on the water above all else. We'll be happy to direct you to licensing and gear providers, guide you to great (some remote) spots, show you what insects the fish are interested in, and get out of your way.",
  },
  {
    q: "I'm very inexperienced. Can you help me?",
    a: 'Yes! We have decades of experience in this area and have guided with anglers of all levels. We love teaching beginners. It is a great feeling to help a beginning angler catch their first trout on a fly.',
  },
  {
    q: 'I have a mixed group of ages and levels. Can you accommodate this?',
    a: 'Definitely. One Guide can usually handle up to three people, beyond that, we will arrange to bring in a second guide to make sure everyone gets the attention they require.',
  },
  {
    q: 'Will I have to do a lot of hiking?',
    a: 'It is up to you. We can introduce you to easy access places with fairly flat entries or we can show you some challenging off grid spots that require substantial hiking.',
  },
  {
    q: 'Is it customary to tip a fishing guide?',
    a: "Whether the fish are biting or not, it's customary to tip a helpful, hard working, and knowledgeable guide.",
  },
  {
    q: 'Will there be cell service?',
    a: 'Cellular phone service can be sketchy in the Catskills and in many of the areas we will be fishing it will be non-existent. Around the Ashokan Reservoir you will get service until just past Boiceville with occasional service in the town of Phoenicia. Be prepared to be off the network for a little while.',
  },
]

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 1, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={cn(
        'glass rounded-xl overflow-hidden transition-colors duration-300',
        open && 'border-forest-500/30'
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span
          className={cn(
            'font-display text-lg md:text-xl transition-colors duration-300',
            open ? 'text-forest-300' : 'text-white group-hover:text-forest-200'
          )}
        >
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className={cn(
              'w-5 h-5 transition-colors duration-300',
              open ? 'text-forest-400' : 'text-stone-500 group-hover:text-stone-300'
            )}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <div className="w-full h-px bg-gradient-to-r from-forest-500/40 via-forest-500/10 to-transparent mb-4" />
              <p className="font-body text-stone-300 leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" aria-label="Frequently Asked Questions" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-forest-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 1, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-forest-400 font-body font-semibold tracking-widest uppercase text-sm mb-4">
            Common Questions
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Frequently <span className="gradient-text">Asked</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-forest-500 to-creek-400 mx-auto rounded-full" />
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
