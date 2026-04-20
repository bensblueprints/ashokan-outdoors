'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Shield, Award, Heart } from 'lucide-react'

const credentials = [
  {
    icon: Shield,
    title: 'NYS Licensed Guide',
    description: 'Certified in CPR, Water Safety & First Aid',
  },
  {
    icon: Award,
    title: 'NYSOGA Member',
    description: 'NYS Outdoor Guides Association',
  },
  {
    icon: Heart,
    title: 'Trout Unlimited',
    description: 'Ashokan-Pepacton Chapter Leaders',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36 overflow-hidden bg-forest-950"
    >
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-500/30 to-transparent" />

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')] bg-repeat pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-creek-400 font-body text-sm uppercase tracking-[0.25em] mb-4">
            Our Story
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-stone-100 mb-4">
            About Ashokan Outdoors
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-forest-500 to-creek-400 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-6"
          >
            <motion.p variants={itemVariants} className="font-body text-stone-300 text-lg leading-relaxed">
              It can take years to become familiar with Catskill rivers and mountain trails. Finding the less traveled fishing and hiking spots can be near impossible these days. In the last few years it has also been difficult to keep up with new rules, regulations, and changing public/private property boundaries in the exploding Catskill Region.
            </motion.p>

            <motion.p variants={itemVariants} className="font-body text-stone-300 text-lg leading-relaxed">
              At Ashokan Outdoors we have been hiking, fishing, and living in the Catskill Mountains for over three decades. If you are looking to fish and/or hike this area and you want to get way more out of your Catskill visit -- we are sure that we can help you find your perfect mountain or stream.
            </motion.p>

            {/* Pull quote */}
            <motion.blockquote
              variants={itemVariants}
              className="relative my-10 pl-6 border-l-2 border-amber-500/60"
            >
              <div className="absolute -left-3 -top-2 text-amber-500/20 text-6xl font-display leading-none select-none">
                &ldquo;
              </div>
              <p className="font-display text-xl md:text-2xl text-stone-100 italic leading-relaxed">
                We specialize in fly fishing. We are conveniently located on the northern banks of the Bush Kill Creek &mdash; one of the few tributaries that flows directly into the Upper Ashokan Reservoir in West Shokan, NY.
              </p>
            </motion.blockquote>

            <motion.p variants={itemVariants} className="font-body text-stone-300 text-lg leading-relaxed">
              We are also very fortunate to be very close to many of the legendary Catskill streams such as: The Esopus Creek, Woodland Valley Creek, Rondout Creek, and the many other streams and tributaries that run through the Peekamoose Valley.
            </motion.p>

            <motion.p variants={itemVariants} className="font-body text-stone-300 text-lg leading-relaxed">
              Ashokan Outdoors also offers guided hiking services. We are perfectly situated at the foot of the Burroughs Range &mdash; a series of mountains and trails that hold some of the best hiking and nature one can experience in the Catskills. Mountains such as: Slide, Peekamoose, Table, Wittenberg, and Cornell.
            </motion.p>

            <motion.p variants={itemVariants} className="font-body text-stone-300 text-lg leading-relaxed">
              We are licensed New York State Outdoor Guides which means we are trained and certified in CPR, Water Safety, Outdoor First Aid and the latest NYS Fishing and Hiking Regulations.
            </motion.p>

            <motion.p variants={itemVariants} className="font-body text-stone-300 text-lg leading-relaxed">
              We are also members of the NYS Outdoor Guides Association and we adhere to the business standards required by the NYSOGA organization.
            </motion.p>

            <motion.p variants={itemVariants} className="font-body text-stone-300 text-lg leading-relaxed">
              At Ashokan Outdoors we are dedicated Catskill conservationists. We have a strong respect for the tradition of Catskill Fly Fishing and many of us are proud leaders of local conservation groups such as the Ashokan-Pepacton Chapter of Trout Unlimited. We donate our time and money to efforts protecting the pristine rivers and streams of the Catskills.
            </motion.p>

            <motion.p variants={itemVariants} className="font-body text-stone-300 text-lg leading-relaxed">
              We embrace sustainable fishing and hiking practices, including catch/release and barbless hooks to minimize our impact. Our commitment to the environment extends beyond the water&mdash;as a rule we will always &lsquo;leave no trace&rsquo; in all of our outdoor activities and will do whatever it takes to preserve the beauty of these wild places we call home.
            </motion.p>

            <motion.p variants={itemVariants} className="font-body text-amber-500/90 text-xl font-medium italic leading-relaxed">
              At Ashokan Outdoors we love to connect people to nature, and we do it in a friendly and responsible way.
            </motion.p>

            {/* Signature */}
            <motion.div variants={itemVariants} className="pt-6 border-t border-forest-800/50">
              <p className="font-display text-xl text-stone-100">John Yanzek</p>
              <p className="font-body text-sm text-creek-400 tracking-wide uppercase">
                Owner and Head Guide
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Staggered image grid + credential badges */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-6 lg:sticky lg:top-28"
          >
            {/* Staggered images */}
            <div className="grid grid-cols-2 gap-4">
              {/* Large image - spans both columns */}
              <motion.div
                variants={imageVariants}
                className="col-span-2 relative h-72 md:h-80 rounded-2xl overflow-hidden group"
              >
                <Image
                  src="/images/about-1.jpg"
                  alt="Ashokan Outdoors guiding in the Catskills"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
              </motion.div>

              {/* Bottom-left image */}
              <motion.div
                variants={imageVariants}
                className="relative h-52 md:h-64 rounded-2xl overflow-hidden group -mt-2"
              >
                <Image
                  src="/images/esopus-casting.jpg"
                  alt="Fly casting on the Esopus Creek"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />
              </motion.div>

              {/* Bottom-right image - offset for stagger */}
              <motion.div
                variants={imageVariants}
                className="relative h-52 md:h-64 rounded-2xl overflow-hidden group mt-6"
              >
                <Image
                  src="/images/esopus-rainbow.jpg"
                  alt="Rainbow trout caught in Catskill waters"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />
              </motion.div>
            </div>

            {/* Credential badges */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4"
            >
              {credentials.map((cred) => (
                <motion.div
                  key={cred.title}
                  variants={itemVariants}
                  className={cn(
                    'group relative rounded-xl p-4 text-center',
                    'bg-white/[0.04] backdrop-blur-sm',
                    'border border-white/[0.06]',
                    'hover:bg-white/[0.07] hover:border-forest-500/20',
                    'transition-all duration-500'
                  )}
                >
                  <cred.icon className="w-6 h-6 text-amber-500/80 mx-auto mb-2 transition-colors group-hover:text-amber-400" />
                  <p className="font-display text-sm text-stone-100 mb-1">
                    {cred.title}
                  </p>
                  <p className="font-body text-xs text-stone-400 leading-snug">
                    {cred.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
