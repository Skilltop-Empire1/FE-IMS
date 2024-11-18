import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ModalContainer from '../../modals/ModalContainer'

const Navbar = () => {
  // State to track the mobile menu visibility
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [isOpen, setIsOpen] = useState(false); // Manage dropdown visibility

  const toggleDropdown = (state) => setIsOpen(state);

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
        className="flex max-w-7xl justify-between mx-auto items-center w-full px-4"
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        initial="hidden"
        animate="visible"
      >
        <img src="/images/logo.png" alt="ims-logo" className="w-24" />

        {/* Desktop Menu */}
        <ul className="text-sm flex-grow hidden md:flex justify-center gap-8 items-center">
          <motion.li
            whileHover={{ scale: 1.1 }} // Add hover animation
            className="cursor-pointer text-center py-4"
            onClick={() => handleScroll('partners')}
          >
            About Product
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }} // Add hover animation
            className="cursor-pointer text-center py-4"
            onClick={() => setShowModal(true)} // Call handleScroll with the ID
          >
            Demo
          </motion.li>
          <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer text-center py-4">
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
            className="cursor-pointer text-center py-4"
          // onClick={() => handleScroll(item.id)} // Call handleScroll with the ID
          >
            Support
          </motion.li> */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => toggleDropdown(true)} // Open on hover
            onMouseLeave={() => toggleDropdown(false)} // Close on mouse leave
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
                  <a href="mailto:support@example.com" target="_blank" rel="noopener noreferrer">
                    Email
                  </a>
                </li>
                <li className="hover:bg-gray-100 py-2 px-4 text-sm">
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                    Whatsapp
                  </a>
                </li>
              </motion.ul>
            )}
          </div>
          <motion.li
            whileHover={{ scale: 1.1 }} // Add hover animation
            className="cursor-pointer text-center py-4"
          // onClick={() => handleScroll(item.id)} // Call handleScroll with the ID
          >
            Contact
          </motion.li>
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
          className={`fixed top-0 left-0 h-3/4 w-full bg-imsPurple text-white z-30 shadow-lg p-5 md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'
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
                handleScroll('partners');
                setMobileMenuOpen(false);
              }}
            >
              About Product
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }} // Add hover animation
              className="cursor-pointer block w-full border-b text-center py-4"
              onClick={() => {
                setMobileMenuOpen(false);
                setShowModal(true);
              }} // Call handleScroll with the ID
            >
              Demo
            </motion.li>
            <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer block w-full border-b text-center py-4">
              <a
                href="https://www.youtube.com/@SkilltopEmpire"
                target="_blank"
                className="text-inherit"
              >
                Videos
              </a>
            </motion.div>
            <motion.li
              whileHover={{ scale: 1.1 }} // Add hover animation
              className="cursor-pointer block w-full border-b text-center py-4"
            // onClick={() => handleScroll(item.id)} // Call handleScroll with the ID
            >
              Support
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }} // Add hover animation
              className="cursor-pointer block w-full border-b text-center py-4"
            // onClick={() => handleScroll(item.id)} // Call handleScroll with the ID
            >
              Contact
            </motion.li>
          </ul>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-imsPurple px-8 py-2 rounded-md mt-8 w-full"
            onClick={() => setMobileMenuOpen(false)} // Close menu when login is clicked
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

const DemoContent = () => {
  return (
    <div className="max-w-lg w-full flex flex-col gap-4 items-center relative">
      <h2 className="text-imsPurple text-xl">Watch Our Demo Video</h2>
      <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <label className="mb-2 block text-sm font-semibold">
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="John"
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full block"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="mb-2 block text-sm font-semibold">
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Georgia"
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full block"
          />
        </div>
        <div className="col-span-2">
          <label className="mb-2 block text-sm font-semibold">
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            placeholder="georgia.young@example.com"
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="mb-2 block text-sm font-semibold">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="(406) 555-0120"
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full block"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="mb-2 block text-sm font-semibold">
            State <span className="text-red-600">*</span>
          </label>
          <select
            placeholder="Select"
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full"
          >
            <option>State 1</option>
            <option>State 2</option>
          </select>
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="mb-2 block text-sm font-semibold">
            Title <span className="text-red-600">*</span>
          </label>
          <select
            placeholder="Select"
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full"
          >
            <option>Title 1</option>
            <option>Title 2</option>
          </select>
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="mb-2 block text-sm font-semibold">
            Company <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Kelly Resources"
            className="border border-gray-300 rounded-sm text-sm py-2 px-1 w-full block"
          />
        </div>
        <div className="col-span-2 items-center justify-center py-4 flex flex-col gap-4">
          <button className="bg-imsPurple text-white rounded px-10 text-sm py-2">
            Submit
          </button>
          <p className="text-xs">
            By Clicking the Button above, you are agreeing to our Privacy Policy
          </p>
        </div>
      </form>
    </div>
  )
}
