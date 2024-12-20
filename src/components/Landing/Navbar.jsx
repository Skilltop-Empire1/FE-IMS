import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ModalContainer from '../../modals/ModalContainer'
import { useCreateRequestDemoMutation } from '../../redux/requestDemoApi'

const Navbar = () => {
  // State to track the mobile menu visibility
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [isOpen, setIsOpen] = useState(false) // Manage dropdown visibility

  const toggleDropdown = (state) => setIsOpen(state)

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen)

  // Animation variant for mobile menu
  const mobileMenuVariant = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  // Function to handle scrolling to the section
  const handleScroll = (id) => {
    const section = document.getElementById(id) // Get the section by ID
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' }) // Smooth scrolling
    }
  }

  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <motion.nav
        className="flex max-w-7xl justify-between mx-auto items-center w-full px-2 md:px-4"
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        initial="hidden"
        animate="visible"
      >
        <img src="/images/logo.png" alt="ims-logo" className="w-20 md:w-24" />

        {/* Desktop Menu */}
        <ul className="text-sm flex-grow hidden md:flex justify-center gap-8 items-center">
          <motion.li
            whileHover={{ scale: 1.1 }} // Add hover animation
            className="cursor-pointer text-center py-4 hover:text-imsPurple"
            onClick={() => handleScroll('partners')}
          >
            About Product
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }} // Add hover animation
            className="cursor-pointer text-center py-4 hover:text-imsPurple"
            onClick={() => setShowModal(true)} // Call handleScroll with the ID
          >
            Demo
          </motion.li>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer text-center py-4 hover:text-imsPurple"
          >
            <a
              href="https://www.youtube.com/@SkilltopEmpire"
              target="_blank"
              className="text-inherit"
            >
              Videos
            </a>
          </motion.div>

          <div
            className="relative cursor-pointer"
            onClick={() => toggleDropdown(!isOpen)} // Open on hover
            // onMouseLeave={() => toggleDropdown(false)} // Close on mouse leave
          >
            {/* Support Menu Item */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-center py-4 text-sm font-semibold text-gray-900"
            >
              Support
            </motion.div>

            {/* Dropdown Menu */}
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 mt-2 w-32 bg-white border rounded-md shadow-lg"
              >
                <li className="hover:bg-gray-100 py-2 px-4 text-sm">
                  <a
                    href="mailto:support@skilltopims.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Email
                  </a>
                </li>
                <li className="hover:bg-gray-100 py-2 px-4 text-sm">
                  <a
                    href="https://wa.me/+2348062675088"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Whatsapp
                  </a>
                </li>
              </motion.ul>
            )}
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer text-center py-4 hover:text-imsPurple"
          >
            <a
              href="https://skilltopempire.com/contact"
              target="_blank"
              className="text-inherit"
            >
              Contact
            </a>
          </motion.div>
        </ul>

        {/* Login button (desktop only) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/login')}
          className="bg-imsPurple text-white px-8 py-1.5 rounded-md hidden md:inline-block"
        >
          Login
        </motion.button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden border p-2 rounded mx-2"
          onClick={toggleMobileMenu}
        >
          <Menu size={20} />
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            className="fixed md:hidden inset-0 bg-black bg-opacity-50 z-20"
            onClick={toggleMobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {/* Mobile Menu */}
        <motion.div
          className={`fixed top-0 left-0 h-3/4 w-full bg-imsPurple text-white z-30 shadow-lg p-5 md:hidden ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
          variants={mobileMenuVariant}
          initial="hidden"
          animate={isMobileMenuOpen ? 'visible' : 'hidden'}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded"
            onClick={toggleMobileMenu}
          >
            <X size={20} />
          </button>
          <ul className="flex flex-col items-center w-full mt-8 text-lg">
            <motion.li
              whileHover={{ scale: 1.1 }} // Add hover animation
              className="cursor-pointer block w-full border-b text-center py-4"
              onClick={() => {
                handleScroll('partners')
                setMobileMenuOpen(false)
              }}
            >
              About Product
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }} // Add hover animation
              className="cursor-pointer block w-full border-b text-center py-4"
              onClick={() => {
                setMobileMenuOpen(false)
                setShowModal(true)
              }} // Call handleScroll with the ID
            >
              Demo
            </motion.li>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="cursor-pointer block w-full border-b text-center py-4"
            >
              <a
                href="https://www.youtube.com/@SkilltopEmpire"
                target="_blank"
                className="text-inherit"
              >
                Videos
              </a>
            </motion.div>
            {/* <motion.li
              whileHover={{ scale: 1.1 }} // Add hover animation
              className="cursor-pointer block w-full border-b text-center py-4"
              // onClick={() => handleScroll(item.id)} // Call handleScroll with the ID
            >
              Support
            </motion.li> */}
            <div
              className="relative cursor-pointer w-full"
              onClick={() => toggleDropdown(!isOpen)} // Open on hover
              // onMouseLeave={() => toggleDropdown(false)} // Close on mouse leave
            >
              {/* Support Menu Item */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer block w-full border-b text-center py-4"
              >
                Support
              </motion.div>

              {/* Dropdown Menu */}
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-[2rem] right-[2rem] -mt-2 0 w-[calc(100%-4rem)] bg-imsPurple border rounded-md shadow-lg"
                >
                  <li className="hover:bg-gray-100 py-2 px-4 text-sm">
                    <a
                      href="mailto:support@skilltopims.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" block text-center py-1"
                    >
                      Email
                    </a>
                  </li>
                  <hr />
                  <li className="hover:bg-gray-100 py-2 px-4 text-sm">
                    <a
                      href="https://wa.me/+2348062675088"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" block text-center py-1"
                    >
                      Whatsapp
                    </a>
                  </li>
                </motion.ul>
              )}
            </div>
            <motion.li
              whileHover={{ scale: 1.1 }} // Add hover animation
              className="cursor-pointer block w-full border-b text-center py-4"
              // onClick={() => handleScroll(item.id)} // Call handleScroll with the ID
            >
              <a
                href="https://skilltopempire.com/contact"
                target="_blank"
                className="text-inherit block"
              >
                Contact
              </a>
            </motion.li>
          </ul>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-imsPurple px-8 py-2 rounded-md mt-8 w-full"
            onClick={() => {
              navigate('/login')
              setMobileMenuOpen(false)
            }} // Close menu when login is clicked
          >
            Login
          </motion.button>
        </motion.div>
      </motion.nav>
      <ModalContainer
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        content={<DemoContent />}
      />
    </>
  )
}

export default Navbar

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  state: '',
  title: '',
  company: '',
}

function validatePhoneNumber(phone) {
  // Regular expression to validate phone number
  const phoneRegex =
    /^(?:\+?\d{1,3})?[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{4,9}$/

  // Check if phone number matches the regex
  if (!phoneRegex.test(phone)) {
    return { valid: false, error: 'Invalid phone number format.' }
  }

  // Optional length validation (e.g., typical phone numbers are between 10 and 15 digits)
  const digitsOnly = phone.replace(/\D/g, '') // Remove non-numeric characters
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return {
      valid: false,
      error: 'Phone number must be between 10 and 15 digits.',
    }
  }

  return { valid: true, error: null }
}

const DemoContent = () => {
  const [formData, setFormData] = useState(initialState)

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(null)
  const [createRequestDemo, { isLoading, error }] =
    useCreateRequestDemoMutation()

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName) newErrors.firstName = 'First Name is required'
    if (!formData.lastName) newErrors.lastName = 'Last Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.phone) newErrors.phone = 'Phone Number is required'
    // if (!formData.state) newErrors.state = 'State is required'
    // if (!formData.title) newErrors.title = 'Title is required'
    if (!formData.company) newErrors.company = 'Company is required'
    return newErrors
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      if (!validatePhoneNumber(formData.phone).valid) {
        setErrors((prev) => ({ ...prev, phone: 'Phone number is invalid' }))
        return
      }
      setErrors({})
      setSuccess(null)
      console.log('Form submitted:', formData)
      try {
        const response = await createRequestDemo(formData).unwrap()
        setSuccess(response?.msg)
        setFormData(initialState)
      } catch (error) {
        setErrors({ apiError: error?.data })
        console.log('Error: ', error?.data)
      }
    }
  }

  return (
    <div className="max-w-lg w-full flex flex-col gap-4 items-center relative">
      <h2 className="text-imsPurple text-xl">Watch Our Demo Video</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* First Name */}
        {errors?.apiError && (
          <div className="text-red-400">{errors?.apiError}</div>
        )}
        {success && (
          <div className="text-green-400 md:col-span-2">{success}</div>
        )}
        <div className="col-span-2 md:col-span-1">
          <label className="mb-2 block text-sm font-semibold">
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="John"
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full block"
          />
          {errors.firstName && (
            <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="col-span-2 md:col-span-1">
          <label className="mb-2 block text-sm font-semibold">
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Georgia"
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full block"
          />
          {errors.lastName && (
            <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="col-span-2">
          <label className="mb-2 block text-sm font-semibold">
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="georgia.young@example.com"
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full"
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="col-span-2 md:col-span-1">
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
          {errors.phone && (
            <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* State */}
        <div className="col-span-2 md:col-span-1">
          <label className="mb-2 block text-sm font-semibold">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full"
          >
            <option value="">Select State</option>
            <option>ABUJA FCT</option>
            <option>ABIA</option>
            <option>ADAMAWA</option>
            <option>AKWA IBOM</option>
            <option>ANAMBRA</option>
            <option>BAUCHI</option>
            <option>BAYELSA</option>
            <option>BENUE</option>
            <option>BORNO</option>
            <option>CROSS RIVER</option>
            <option>DELTA</option>
            <option>EBONYI</option>
            <option>EDO</option>
            <option>EKITI</option>
            <option>ENUGU</option>
            <option>GOMBE</option>
            <option>IMO</option>
            <option>JIGAWA</option>
            <option>KADUNA</option>
            <option>KANO</option>
            <option>KATSINA</option>
            <option>KEBBI</option>
            <option>KOGI</option>
            <option>KWARA</option>
            <option>LAGOS</option>
            <option>NASSARAWA</option>
            <option>NIGER</option>
            <option>OGUN</option>
            <option>ONDO</option>
            <option>OSUN</option>
            <option>OYO</option>
            <option>PLATEAU</option>
            <option>RIVERS</option>
            <option>SOKOTO</option>
            <option>TARABA</option>
            <option>YOBE</option>
            <option>ZAMFARA</option>
          </select>
          {errors.state && (
            <p className="text-red-600 text-xs mt-1">{errors.state}</p>
          )}
        </div>

        {/* Title */}
        <div className="col-span-2 md:col-span-1">
          <label className="mb-2 block text-sm font-semibold">Title</label>
          <select
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full"
          >
            <option value="">Select Title</option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Dr</option>
            <option>Engr</option>
            <option>Prof</option>
            <option>Others</option>
          </select>
          {errors.title && (
            <p className="text-red-600 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        {/* Company */}
        <div className="col-span-2 md:col-span-1">
          <label className="mb-2 block text-sm font-semibold">
            Company <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Kelly Resources"
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full block"
          />
          {errors.company && (
            <p className="text-red-600 text-xs mt-1">{errors.company}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-2 items-center justify-center py-4 flex flex-col gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-imsPurple text-white rounded px-10 text-sm py-2 ${isLoading && 'cursor-not-allowed !bg-imsLightPurple'}`}
          >
            {isLoading ? 'Submitting' : 'Submit'}
          </button>
          <p className="text-xs">
            By Clicking the Button above, you are agreeing to our Privacy Policy
          </p>
        </div>
      </form>
    </div>
  )
}
