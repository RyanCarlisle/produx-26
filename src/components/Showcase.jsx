import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import NetworkBackground from './NetworkBackground';

export default function Showcase() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Shuffle function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Import all images from past_event folder and shuffle them
  const images = useMemo(() => shuffleArray([
    { src: '/images/past_event/img1.jpeg', alt: 'Event Photo' },
    { src: '/images/past_event/img2.jpeg', alt: 'Event Photo' },
    { src: '/images/past_event/img3.jpeg', alt: 'Event Photo' },
    { src: '/images/past_event/img4.jpeg', alt: 'Event Photo' },
    { src: '/images/past_event/img5.jpeg', alt: 'Event Photo' },
    { src: '/images/past_event/img6.jpeg', alt: 'Event Photo' },
    { src: '/images/past_event/img7.jpeg', alt: 'Event Photo' },
    { src: '/images/past_event/img8.jpeg', alt: 'Event Photo' },
    { src: '/images/past_event/img9.jpeg', alt: 'Event Photo' },
    { src: '/images/past_event/img10.jpeg', alt: 'Event Photo' },
    { src: '/images/past_event/img11.jpeg', alt: 'Event Photo' },
    { src: '/images/past_event/img12.jpeg', alt: 'Event Photo' },
    { src: '/images/past_event/img13.jpeg', alt: 'Event Photo' },
    { src: '/images/past_event/img14.jpeg', alt: 'Event Photo' }
  ]), []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setSelectedImage(images[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1;
    setLightboxIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const goToNext = () => {
    const newIndex = lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  // Handle keyboard navigation
  const handleKeyPress = (e) => {
    if (!selectedImage) return;
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') closeLightbox();
  };

  return (
    <div 
      className="min-h-screen py-24 md:py-32 px-4 md:px-8 lg:px-16 relative"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div className="fixed inset-0 z-0">
        <NetworkBackground />
      </div>
      
      {/* Content wrapper with higher z-index */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
        <h1 className="text-5xl md:text-7xl font-bold font-tech mb-4">
          <span
            style={{
              background: 'linear-gradient(135deg, #EA912D 0%, #FFD700 50%, #c20023 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(234, 145, 45, 0.5))',
            }}
          >
            Showcase
          </span>
        </h1>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
          Relive the moments from previous editions of ProdUX
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-zinc-900"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Border effect */}
              <div className="absolute inset-0 border-2 border-orange-500/0 group-hover:border-orange-500/50 transition-all duration-300 rounded-lg pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 z-[110] p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={closeLightbox}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} className="text-white" />
            </motion.button>

            {/* Previous button */}
            <motion.button
              className="absolute left-4 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={32} className="text-white" />
            </motion.button>

            {/* Next button */}
            <motion.button
              className="absolute right-4 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={32} className="text-white" />
            </motion.button>

            {/* Image container */}
            <motion.div
              className="relative max-w-7xl max-h-[90vh] mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-white text-sm font-mono">
                  {lightboxIndex + 1} / {images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
