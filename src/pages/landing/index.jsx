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
import ClientLogoCarousel from '../../components/Landing/ClientLogoCarousel'
import PricingPlan from '../../components/Landing/PricingPlan'
import { Link } from 'react-router-dom'

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

  // Function to handle scrolling to the section
  const handleScroll = (id) => {
    const section = document.getElementById(id) // Get the section by ID
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' }) // Smooth scrolling
    }
  }

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
          <div className="w-full flex items-center justify-center px-2 gap-4 mx-auto flex-col max-w-xl py-24 min-h-[400px]">
            <motion.h1 className="text-center text-3xl md:text-4xl">
              Streamline Your Business with Skilltop IMS
            </motion.h1>
            <motion.p className="text-center text-sm text-gray-600">
              Take control of your business operations with Skilltop IMS—your
              all-in-one business management solution. Simplify inventory
              management, automate routine tasks, and enhance customer
              satisfaction, all from one easy-to-use platform.
            </motion.p>
            <div className="justify-between md:justify-center flex items-center w-full md:w-auto gap-4 mt-10">
              <motion.button
                className="bg-imsPurple border font-light border-imsPurple text-white px-4 md:px-8 py-3 rounded-md flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  handleScroll('pricing')
                }}
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </motion.button>
              <motion.button
                className="border-imsPurple border text-imsPurple px-4 md:px-8 py-3 rounded-md"
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
          <div className="flex items-center justify-center px-2">
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
            className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-5 flex-wrap mt-10"
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
                icon: <Clock5 size={40} />,
                title: 'Real-Time Inventory Management',
                description:
                  'Keep track of your stock and overall product management.',
              },
              {
                icon: <BriefcaseBusiness size={40} />,
                title: 'General Business Management',
                description:
                  "Manage your business with full control and streamline access for staff's easy workflow.",
              },
              {
                icon: <TriangleAlert size={40} />,
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
            <div className="flex items-center justify-center px-2 md:px-0">
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
        <div
          className="flex flex-col w-full max-w-7xl mx-auto my-10"
          id="partners"
        >
          <h2 className="text-2xl font-bold text-center">
            Our Partners/Clients
          </h2>
          <div className="">
            <ClientLogoCarousel />
          </div>
        </div>
        <div className="flex flex-col gap-8 items-center w-full max-w-5xl px-2 mx-auto my-10">
          <h2 className="px-2 text-center text-2xl font-bold">
            Easily Manage Your Business in Real-Time with Skilltop IMS
          </h2>
          <p className="text-center text-gray-700 text-base">
            Skilltop IMS offers powerful features that let you manage your
            business, inventory, and operations effortlessly—without the hassle
            of complex systems. Simplify your workflow and keep your business
            running smoothly, all in one place.
          </p>

          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 max-w-6xl my-10 w-full mx-auto">
            <div className="flex px-2 items-center justify-center">
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
          <div className="flex flex-col gap-8 items-center w-full max-w-5xl mx-auto my-10 px-2">
            <h2 className="text-2xl text-center font-bold">
              Unlock Seamless Inventory Management with Skilltop IMS
            </h2>
            <p className="text-center text-gray-700 text-base">
              Discover how our users have transformed their business operations
              and streamlined workflows with real-time updates and powerful
              features
            </p>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-4 mx-auto max-w-sm">
                <img src="/images/testimony.png" />
                <h2 className="font-bold">Sunny Fidelis</h2>
                <p className="text-center text-sm">
                  Skilltop offers your business access to ease in business
                  transaction models. They're prompt and very reliable, and I
                  strongly recommend them.
                </p>
                <p className="text-center text-sm">
                  They're easily accessible, and they prioritize customer
                  satisfaction at its peak.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 mx-auto max-w-sm">
                <img src="/images/testimony.png" />
                <h2 className="font-bold">Goodness Chinaza</h2>
                <p className="text-center text-sm">
                  Good service rendered. The ability to monitor my business
                  activities through their web application is a good one for me.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Pricing Section */}
        <div className="w-full bg-black py-10" id="pricing">
          <PricingPlan />
          {/* <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10"> */}
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 px-2 md:px-0 mb-8 gap-10">
            <div className="flex gap-3 col-span-1 items-start px-2 md:max-w-lg mx-auto w-full relative">
              <div className="w-8 h-8 flex-shrink-0 flex justify-center items-center bg-green-500 rounded-full text-white">
                ?
              </div>
              <div className="text-white flex flex-col gap-4">
                <h3 className="text-lg font-medium">What is Skilltop IMS?</h3>
                <p className="text-gray-600">
                  Skilltop IMS is a comprehensive business management solution
                  designed to help businesses manage inventories, streamline
                  operations, and improve customer satisfaction. It provides
                  real-time tracking and ensures that businesses maintain
                  efficiency.
                </p>
                <Link to="" className="text-green-500">
                  Click to learn more
                </Link>
              </div>
            </div>
            <div className="flex gap-3 col-span-1 items-start px-2 md:max-w-lg  mx-auto w-full relative">
              <div className="w-8 h-8 flex-shrink-0 flex justify-center items-center bg-green-500 rounded-full text-white">
                ?
              </div>
              <div className="text-white flex flex-col gap-4">
                <h3 className="text-lg font-medium">
                  What support options are available for Skilltop IMS?
                </h3>
                <p className="text-gray-600">
                  Our team at Skilltop Empire offers full support, including
                  onboarding, installation, integration, customization, and
                  troubleshooting. We also provide training resources to help
                  you get the most out of our systems and solutions.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 px-4 md:px-0 gap-10">
            <div className="flex gap-3 items-start max-w-lg w-full relative">
              <div className="w-8 h-8 flex-shrink-0 flex justify-center items-center bg-green-500 rounded-full text-white">
                ?
              </div>
              <div className="text-white flex flex-col gap-4">
                <h3 className="text-lg font-medium">
                  Is Skilltop IMS scalable for growing businesses?
                </h3>
                <p className="text-gray-600">
                  Yes, Skilltop IMS is designed to scale with your business as
                  it grows. Whether you're managing a small or large business,
                  the system can handle the demands of a growing organization.
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start max-w-lg">
              <div className="w-8 h-8 flex-shrink-0 flex justify-center items-center bg-green-500 rounded-full text-white">
                ?
              </div>
              <div className="text-white flex flex-col gap-4">
                <h3 className="text-lg font-medium">
                  How can I get started with Skilltop IMS?
                </h3>
                <p className="text-gray-600">
                  You can get started by contacting us at +234-806-2675-088 or
                  visiting our website at skilltopempire.com. We will provide a
                  detailed guide and set up a demo tailored to your business
                  needs.
                </p>
              </div>
            </div>
            </div>
            <div className="mt-4">
            <div className="col-span-2 text-center text-white px-2 mb-10">
              Haven't got your answer?{' '}
              <span className="text-green-500">Contact our support now</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl w-full mx-auto bg-white">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
            <div className="col-span-1 flex flex-col gap-4 px-2">
              <h2 className="text-2xl px-2 text-center font-bold">
                Streamline Your Business Operations and Management Fast
              </h2>
              <p className="text-sm text-gray-600">
                With a variety of powerful tools, you can efficiently manage
                your business operations, including inventory, without complex
                setups. Simplify your entire workflow today
              </p>
              <div className="flex items-center gap-4">
                <img src="/images/logo.png" alt="ims-logo" className="w-20" />
                <p className="font-semibold text-gray-600">
                  Product of Skilltop Empire
                </p>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <a
                  href="https://www.facebook.com/profile.php?id=61560962855881"
                  target="_blank"
                >
                  <img src="/images/socials/facebook.png" />
                </a>
                <a
                  href="https://www.youtube.com/@SkilltopEmpire"
                  target="_blank"
                >
                  <img src="/images/socials/youtube.png" />
                </a>
                <a
                  href="https://x.com/Skilltopempire?t=Ufx26aerHIdhxQO7rtmsRA&s=08"
                  target="_blank"
                >
                  <img src="/images/socials/twitter.png" />
                </a>
                <a
                  href="https://www.linkedin.com/company/skilltop-empire/"
                  target="_blank"
                >
                  <img src="/images/socials/linkedin.png" />
                </a>
                <a
                  href="https://www.instagram.com/skilltopempire?igsh=YzljYTk1ODg3Zg=="
                  target="_blank"
                >
                  <img src="/images/socials/instagram.png" />
                </a>
              </div>
            </div>
            <div className="col-span-1">
              <div className="justify-between md:justify-center px-2 flex items-center gap-4 md:mt-10">
                <motion.button
                  className="border-imsPurple border text-imsPurple px-4 md:px-8 py-3 text-sm rounded-md flex items-center gap-4 font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>Learn More</span>
                  <ArrowRight size={16} />
                </motion.button>
                <motion.button
                  className="bg-imsPurple border border-imsPurple text-white text-sm px-4 md:px-8 py-3 rounded-md flex items-center gap-4 font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>Get it now</span>
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>
          </div>
          <div className="text-center w-full py-4 text-sm border-t-2">
            Copyrights - © 2024 Skilltop Empire Concept
          </div>
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
