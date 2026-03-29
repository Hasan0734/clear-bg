"use client"
import { motion } from "framer-motion"

const Hero = () => {
  return (
    <section className="hero-gradient px-4 pt-32 pb-20">
      <div className="container mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="gradient-bg mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-semibold text-primary-foreground">
            ✨ AI-Powered Background Removal
          </span>
          <h1 className="mb-4 text-4xl leading-tight font-extrabold sm:text-5xl md:text-6xl">
            Remove Backgrounds{" "}
            <span className="gradient-text">Instantly with AI</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            Lightning-fast, pixel-perfect background removal. Free to use, no
            signup required.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
