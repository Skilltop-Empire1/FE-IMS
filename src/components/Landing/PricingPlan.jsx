import React, { useState } from 'react'
import ModalContainer from '../../modals/ModalContainer'
import { useCreateSubscriberDemoMutation } from '../../redux/APIs/requestDemoApi';

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
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Monthly") 

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
            <button type="button" onClick={() => launchModal(plan.title)} className="bg-imsPurple w-full text-white px-6 py-3 rounded-md font-medium hover:bg-imsDarkPurple transition">
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


const Content = ({selectedPlan}) => {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    subscribedPlan: selectedPlan,
  });

  const [errors, setErrors] = useState({});
  const [createsubscriber, { isLoading }] = useCreateSubscriberDemoMutation();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.businessName) newErrors.businessName = "Business Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    if (!formData.subscribedPlan) newErrors.subscribedPlan = "Subscribed Plan is required";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log("Form submitted:", formData);
      try {
        const response = await createsubscriber(formData).unwrap();
        console.log({ response });
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  return (
    <div className="max-w-lg w-full flex flex-col gap-4 items-center relative">
      <h2 className="text-imsPurple text-xl">Subscribe to a {selectedPlan} Plan</h2>
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
        {/* Business Name */}
        <div className="col-span-2">
          <label className="mb-2 block text-sm font-semibold">
            Business Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            placeholder="Your Business Name"
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full block"
          />
          {errors.businessName && <p className="text-red-600 text-xs mt-1">{errors.businessName}</p>}
        </div>

        {/* Email */}
        <div className="">
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
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div className="">
          <label className="mb-2 block text-sm font-semibold">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(406) 555-0120"
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full block"
          />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Subscribed Plan */}
        {/* <div className="col-span-2">
          <label className="mb-2 block text-sm font-semibold">
            Subscribed Plan <span className="text-red-600">*</span>
          </label>
          <select
            name="subscribedPlan"
            value={formData.subscribedPlan}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full"
          >
            <option value="">Select a Plan</option>
            <option>Basic</option>
            <option>Standard</option>
            <option>Premium</option>
          </select>
          {errors.subscribedPlan && <p className="text-red-600 text-xs mt-1">{errors.subscribedPlan}</p>}
        </div> */}

        {/* Submit Button */}
        <div className="col-span-2 items-center justify-center py-4 flex flex-col gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-imsPurple text-white rounded px-10 text-sm py-2 ${isLoading && "cursor-not-allowed !bg-imsLightPurple"}`}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>
    </div>
  );
};


