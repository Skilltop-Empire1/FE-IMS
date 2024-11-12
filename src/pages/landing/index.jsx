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

import Icon1 from '../../../public/images/sb1.svg'
import ClientLogoCarousel from '../../components/Landing/ClientLogoCarousel'
import PricingPlan from '../../components/Landing/PricingPlan'
// import Icon2 from '../../public/images/sb2.svg'
// import Icon3 from '../../public/images/sb3.svg'
// import Icon4 from '../../public/images/sb4.svg'
// import Icon5 from '../../public/images/sb5.svg'
// import Icon6 from '../../public/images/sb6.svg'
// import Icon7 from '../../public/images/sb7.svg'
// import Icon8 from '../../public/images/sb8.svg'
// import Icon9 from '../../public/images/sb9.svg'

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
          className="w-full  py-20 gap-8 flex flex-col items-center"
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
        {/* Benefits Section */}
        <motion.div
          className="w-full bg-gray-50 py-20"
          ref={featuresRef}
          initial="hidden"
          animate={isFeaturesInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 max-w-6xl w-full mx-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold">Benefits of Skilltop IMS</h2>
              <ul className="flex flex-col text-sm gap-4 my-6 text-gray-700">
                {benefits.map((item, index) => (
                  <li className="flex items-center gap-2">
                    <img
                      src={item.imageSrc}
                      alt="benefit_icon"
                      className="w-6 h-6"
                    />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                className="bg-imsPurple border font-light border-imsPurple text-white px-8 py-3 rounded-md flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm">Get Started Today</span>
                <ArrowRight size={16} />
              </motion.button>
            </div>
            <div className="flex items-center justify-center">
              <motion.img
                src="/images/benefits_image.png"
                alt="IMS-preview"
                initial={{ opacity: 0, y: 20 }}
                animate={isMainInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ delay: 0.4 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Partners Section */}
        <div className="flex flex-col w-full max-w-7xl mx-auto my-10">
          <h2 className="text-2xl font-bold text-center">
            Our Partners/Clients
          </h2>
          <div className="">
            <ClientLogoCarousel />
          </div>
        </div>
        <div className="flex flex-col gap-8 items-center w-full max-w-5xl mx-auto my-10">
          <h2 className="text-2xl font-bold">
            Easily Manage Your Business in Real-Time with Skilltop IMS
          </h2>
          <p className="text-center text-gray-700 text-base">
            Skilltop IMS offers powerful features that let you manage your
            business, inventory, and operations effortlessly—without the hassle
            of complex systems. Simplify your workflow and keep your business
            running smoothly, all in one place.
          </p>

          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 max-w-6xl my-10 w-full mx-auto">
            <div className="flex items-center justify-center">
              <motion.img
                src="/images/manage_image.png"
                alt="IMS-preview"
                initial={{ opacity: 0, y: 20 }}
                animate={isMainInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ delay: 0.4 }}
              />
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 text-sm rounded-full bg-imsPurple/30">
                  1
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold">Create a store and categories.</h3>
                  <p className="text-sm text-gray-700">
                    Easily set up stores and manage your business with Skilltop
                    IMS. Add products, organize categories, and streamline your
                    workflow—no coding needed. Experience simplified business
                    management that keeps everything organized.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 text-sm rounded-full bg-imsPurple/30">
                  2
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold">Add products.</h3>
                  <p className="text-sm text-gray-700">
                    Seamlessly add products to your store or categories with
                    Skilltop IMS. Empower your team to manage inventory and
                    sales effortlessly, enhancing productivity and accuracy
                    across all business processes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 text-sm rounded-full bg-imsPurple/30">
                  3
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold">
                    Assign the right people to sell and manage the business.
                  </h3>
                  <p className="text-sm text-gray-700">
                    Effortlessly assign team members to oversee various aspects
                    of your business. With Skilltop IMS, ensure timely business
                    decisions and inventory restocks. Utilize real-time
                    monitoring to stay on track, meet deadlines, and achieve
                    your business goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-50 py-10">
          <div className="flex flex-col gap-8 items-center w-full max-w-5xl mx-auto my-10">
            <h2 className="text-2xl font-bold">
              Unlock Seamless Inventory Management with Skilltop IMS
            </h2>
            <p className="text-center text-gray-700 text-base">
              Discover how our users have transformed their business operations
              and streamlined workflows with real-time updates and powerful
              features
            </p>
          </div>
        </div>
        {/* Pricing Section */}
        <div className="w-full bg-black">
          <PricingPlan />
        </div>
      </div>
    </motion.div>
  )
}

export default LandingPage

const benefits = [
  { label: 'Optimized Order Management', imageSrc: '/images/sb1.svg' },
  {
    label: 'Increased Efficiency and Productivity',
    imageSrc: '/images/sb2.svg',
  },
  { label: 'Data-Driven Decision Making', imageSrc: '/images/sb3.svg' },
  { label: 'Better Business Reporting', imageSrc: '/images/sb4.svg' },
  {
    label: 'Supports Scalability and Cost Savings',
    imageSrc: '/images/sb5.svg',
  },
  {
    label: 'Streamlined Financial and Business Operations',
    imageSrc: '/images/sb6.svg',
  },
  { label: 'Enhances Customer Satisfaction', imageSrc: '/images/sb7.svg' },
  { label: 'More Business Visibility', imageSrc: '/images/sb8.svg' },
  { label: 'Improves Business Transparency', imageSrc: '/images/sb9.svg' },
]
