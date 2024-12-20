import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ModalContainer from '../../modals/ModalContainer'
import { useCreateSubscriberDemoMutation } from '../../redux/requestDemoApi'

const PricingPlan = () => {
  const plans = [
    {
      title: 'Monthly',
      price: '₦25,000',
      amount: 25000,
      info: 'Monthly Plan (30/31 Days)',
      buttonText: 'Get Started',
      features: [
        'Access to the IMS solution for a month.',
        'Package On-boarding',
        'Priority Email Support',
        'Basic Reporting Tools',
      ],
    },
    {
      title: 'Annual',
      price: '₦250,000',
      amount: 250000,
      info: 'Yearly Plan  (12 Months)',
      buttonText: 'Get Started',
      features: [
        'Access to the Skilltop IMS Solutions all year',
        'Access to Account manager',
        'Package On-boarding',
        'Priority Email Support',
        'Advance Reporting Tool',
        'Access to exclusive webinar',
      ],
    },
    {
      title: 'Premium',
      price: 'Custom Pricing',
      info: 'VIP Plan',
      amount: 0,
      buttonText: 'Get Started',
      features: [
        'All Yearly Plan Features',
        'Dedicated Account Manager',
        'Customized Solutions & Pricing',
        'Top Priority Support',
        'After Sales Support',
        'Enhancement Integration',
        'Custom On-boarding',
        'Unlimited Users',
        'Unlimited Storage',
        'Advanced Security',
      ],
    },
  ]
  const [showModal, setShowModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('Monthly')

  const launchModal = (plan) => {
    setSelectedPlan(plan)
    setShowModal(true)
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Pricing & Plans</h2>
      <p className="text-center font-light">
        Discover the perfect plan for your business management and operations
        needs! With Skilltop IMS, you can easily manage your business,
        inventory, and streamline your operations with ease. Choose from our
        flexible plans that fit your business and work perfectly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 my-20">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 w-full mx-auto max-w-xs flex flex-col justify-between items-center shadow-lg bg-white text-black transition-all hover:shadow-xl"
          >
            <div className="flex flex-col items-center w-full">
              <p className="text-[10px] px-2.5 py-1 mb-4 bg-imsPurple/10 text-imsPurple uppercase font-light rounded-xl">
                {plan.title}
              </p>
              <p className="font-semibold mb-6">{plan.price}</p>
              <p className="text-xs font-gray-500 mb-6">{plan.info}</p>
              <p className="font-gray-500 text-sm mb-2 w-full font-bold">
                Features:
              </p>
              <ul className="space-y-2 mb-6 w-full px-2">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="text-gray-700 text-xs list-inside list-disc"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => launchModal(plan.title)}
              className="bg-imsPurple w-full text-white px-6 py-3 rounded-md font-medium hover:bg-imsDarkPurple transition"
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
      <ModalContainer
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        content={<Content selectedPlan={selectedPlan} />}
      />
    </div>
  )
}

export default PricingPlan

const Content = ({ selectedPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subs: selectedPlan,
    amount: 0,
  })

  const [step, setStep] = useState(1)

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const [createsubscriber, { isLoading }] = useCreateSubscriberDemoMutation()

  const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  }

  const step2Variants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Business Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.phone) newErrors.phone = 'Phone Number is required'
    if (!formData.subs) newErrors.subs = 'Subscribed Plan is required'
    return newErrors
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      setSuccess(null)
      setErrors({})
      console.log('Form submitted:', formData)
      let amount = 0
      if (formData.subs == 'Monthly') {
        amount = 25000
      } else if (formData.subs == 'Annual') {
        amount = 250000
      } else {
        amount = 0
      }

      // console.log({ subs: formData.subs, amount })
      // return
      try {
        setLoading(true)
        setErrors((prev) => ({ ...prev, apiError: null }))
        const response = await createsubscriber({
          ...formData,
          amount,
        }).unwrap()
        console.log({ response })
        setSuccess(response?.msg)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subs: selectedPlan,
          amount: 0,
        })
        setStep(2)
      } catch (error) {
        setErrors((prev) => ({ ...prev, apiError: error?.data }))
        console.log('Error:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="!max-w-xl w-full flex flex-col gap-4 items-center relative z-[9999999]">
      {step === 1 && (
        <motion.div
          variants={formVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full flex flex-col items-center gap-4"
        >
          <h2 className="text-imsPurple text-xl">
            Subscribe to {selectedPlan == 'Annual' ? 'an' : 'a'} {selectedPlan}{' '}
            Plan
          </h2>
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-2 gap-4 text-black"
          >
            {/* Success and Error Messages */}
            {success && (
              <motion.div
                variants={formVariants}
                className="text-green-400 col-span-2"
              >
                {success}
              </motion.div>
            )}
            {errors?.apiError && (
              <motion.div
                variants={formVariants}
                className="text-red-400 col-span-2"
              >
                {errors.apiError}
              </motion.div>
            )}

            {/* Business Name */}
            <motion.div variants={formVariants} className="col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Business Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Business Name"
                className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full block"
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name}</p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={formVariants} className="col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
            </motion.div>

            {/* Phone Number */}
            <motion.div variants={formVariants} className="col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(406) 555-0120"
                className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full block"
              />
              {errors.phone && (
                <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={formVariants}
              className="col-span-2 flex flex-col items-center gap-4 py-4"
            >
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-imsPurple text-white rounded px-10 text-sm py-2 ${isLoading && 'cursor-not-allowed !bg-imsLightPurple'}`}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </motion.div>
          </form>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          variants={step2Variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full text-black flex flex-col gap-2"
        >
          <div>
            <h2 className="text-imsPurple text-base mb-2 text-center">
              Payment Details
            </h2>
            <hr className="mb-2" />
            <p className="text-sm">
              Bank: <span className="font-semibold">Zenith Bank PLC</span>
            </p>
            <p className="text-sm">
              Account Number: <span className="font-semibold">1017101131</span>
            </p>
            <p className="text-sm">
              Account Name:{' '}
              <span className="font-semibold">Skilltop Empire</span>
            </p>
          </div>
          <div>
            <h2 className="text-imsPurple text-base mb-2 text-center">
              Payment Instructions
            </h2>
            <hr className="mb-2" />
            <p className="text-sm text-justify">
              Please note that payments are confirmed manually for now. Once
              payment is made and confirmed your login credentials will be sent
              to your provided email. kindly send your proof of payment to our
              support via email or WhatsApp and we are always happy to help.
            </p>
            <p className="text-sm text-justify my-2">
              Thanks for your patronage
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
