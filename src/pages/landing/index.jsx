import {
  ArrowRight,
  BriefcaseBusiness,
  Clock5,
  Menu,
  TriangleAlert,
} from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import React, { useRef } from 'react'
import Navbar from '../../components/Landing/Navbar'

const LandingPage = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Refs for in-view triggers
  const heroRef = useRef(null)
  const mainRef = useRef(null)
  const featuresRef = useRef(null)

  // useInView hooks to trigger animations on scroll
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' })
  const isMainInView = useInView(mainRef, { once: true, margin: '-100px' })
  const isFeaturesInView = useInView(featuresRef, {
    once: true,
    margin: '-100px',
  })

  return (
    <motion.div className="w-full">
      <div className="w-full flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <motion.div
          className="bg-gray-50 w-full"
          ref={heroRef}
          initial="hidden"
          animate={isHeroInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <div className="w-full flex items-center justify-center gap-4 mx-auto flex-col max-w-xl py-24 min-h-[400px]">
            <motion.h1 className="text-center text-4xl">
              Streamline Your Business with Skilltop IMS
            </motion.h1>
            <motion.p className="text-center text-sm text-gray-600">
              Take control of your business operations with Skilltop IMS—your
              all-in-one business management solution. Simplify inventory
              management, automate routine tasks, and enhance customer
              satisfaction, all from one easy-to-use platform.
            </motion.p>
            <div className="justify-center flex items-center gap-4 mt-10">
              <motion.button
                className="bg-imsPurple border font-light border-imsPurple text-white px-8 py-2 rounded-md flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </motion.button>
              <motion.button
                className="border-imsPurple border text-imsPurple px-8 py-2 rounded-md"
                whileHover={{ scale: 1.05 }}
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.main
          className="w-full my-10"
          ref={mainRef}
          initial="hidden"
          animate={isMainInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <div className="flex items-center justify-center">
            <motion.img
              src="/images/preview.png"
              alt="IMS-preview"
              initial={{ opacity: 0, y: 20 }}
              animate={isMainInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ delay: 0.4 }}
            />
          </div>
        </motion.main>

        {/* Features Section */}
        <motion.div
          className="w-full bg-gray-50 py-20 gap-8 flex flex-col items-center"
          ref={featuresRef}
          initial="hidden"
          animate={isFeaturesInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-bold">Why Choose Skilltop IMS?</h2>
          <motion.div
            className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-5 flex-wrap mt-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2, delayChildren: 0.5 },
              },
            }}
          >
            {[
              {
                icon: <Clock5 size={20} />,
                title: 'Real-Time Inventory Management',
                description:
                  'Keep track of your stock and overall product management.',
              },
              {
                icon: <BriefcaseBusiness size={20} />,
                title: 'General Business Management',
                description:
                  "Manage your business with full control and streamline access for staff's easy workflow.",
              },
              {
                icon: <TriangleAlert size={20} />,
                title: 'Improves Accuracy And Reduces Human Error',
                description:
                  'Eliminate manual mistakes with automated processes.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col gap-2 items-center px-5"
                whileHover={{ scale: 1.05 }}
                variants={fadeInUp}
              >
                {feature.icon}
                <p className="text-center font-bold">{feature.title}</p>
                <p className="text-center text-sm text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LandingPage
