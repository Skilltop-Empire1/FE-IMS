import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = () => {
  // State to track the mobile menu visibility
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen)

  // Animation variant for mobile menu
  const mobileMenuVariant = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <motion.nav
      className="flex max-w-7xl justify-between mx-auto items-center w-full p-4"
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
    >
      <img src="/images/logo.png" alt="ims-logo" className="w-24" />

      {/* Desktop Menu */}
      <ul className="text-sm flex-grow flex-wrap hidden md:flex justify-center gap-8 items-center">
        {['About Product', 'Demo', 'Videos', 'Support', 'Contact'].map(
          (item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              className="cursor-pointer"
            >
              {item}
            </motion.li>
          ),
        )}
      </ul>

      {/* Login button (desktop only) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
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
        <ul className="flex flex-col gap-6 mt-8 text-lg divide-y-2">
          {['About Product', 'Demo', 'Videos', 'Support', 'Contact'].map(
            (item, index) => (
              <li
                key={index}
                className="cursor-pointer pt-2 text-center"
                onClick={toggleMobileMenu} // Close menu on item click
              >
                {item}
              </li>
            ),
          )}
        </ul>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-white text-imsPurple px-8 py-2 rounded-md mt-8 w-full"
          onClick={toggleMobileMenu} // Close menu when login is clicked
        >
          Login
        </motion.button>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar
