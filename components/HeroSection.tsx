"use client"
import { motion } from "framer-motion"
import UploadImage from "./UploadImage"
import { useState } from "react"
import { cn } from "@/lib/utils"
import ImageList from "./ImageList"

const HeroSection = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  return (
    <section
      className={cn("hero-gradient relative px-4 pt-32 pb-20", {
        "h-dvh": imageSrc,
      })}
    >
      <div className="mx-auto max-w-5xl text-center">
        {!imageSrc && (
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
              <span className="gradient-text">Instantly</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
              Lightning-fast, pixel-perfect background removal. Free to use, no
              signup required.
            </p>
          </motion.div>
        )}
      </div>

      <UploadImage imageSrc={imageSrc} setImageSrc={setImageSrc} />
      {imageSrc && <ImageList />}
    </section>
  )
}

export default HeroSection
