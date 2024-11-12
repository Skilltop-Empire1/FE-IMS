import React, { useState } from 'react'

const PricingPlan = () => {
  const plans = [
    {
      title: 'Monthly',
      price: '₦25,000',
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
      buttonText: 'Contact Us',
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
            <button className="bg-imsPurple w-full text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition">
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PricingPlan
