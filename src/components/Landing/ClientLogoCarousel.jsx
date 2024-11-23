import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

const logos = [
  { id: 1, src: '/images/partners1.png', alt: 'Client 1' },
  { id: 2, src: '/images/partners2.png', alt: 'Client 2' },
  { id: 3, src: '/images/partners3.png', alt: 'Client 3' },
  { id: 4, src: '/images/partners4.png', alt: 'Client 4' },
  { id: 1, src: '/images/partners1.png', alt: 'Client 1' },
  { id: 2, src: '/images/partners2.png', alt: 'Client 2' },
  { id: 3, src: '/images/partners3.png', alt: 'Client 3' },
  { id: 4, src: '/images/partners4.png', alt: 'Client 4' },
]

const ClientLogoCarousel = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-10">
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop={true}
      >
        {logos.map((logo) => (
          <SwiperSlide key={logo.id}>
            <motion.div
              className="flex justify-center items-center p-4 h-36 w-20 md:w-36 border-2"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full"
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ClientLogoCarousel
