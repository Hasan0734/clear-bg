import React, { useCallback, useEffect, useRef, useState } from "react"
import { Card } from "./ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Image, Upload, X } from "lucide-react"
import { Button } from "./ui/button"
import ResultSection from "./ResultSection"

type Stage = "idle" | "preview" | "processing" | "done"

interface UploadImageProps {
  imageSrc: string | null
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>
}

const SAMPLE_IMG =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80"

const PROCESSING_STEPS = [
  "Analyzing image...",
  "Detecting subject edges...",
  "Separating foreground layers...",
  "Refining hair & fine details...",
  "Generating transparent output...",
]

const checkerStyle = {
  backgroundImage:
    "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%), linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%), linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)",
  backgroundSize: "20px 20px",
  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
}

const UploadImage = ({ imageSrc, setImageSrc }: UploadImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [stage, setStage] = useState<Stage>("idle")
  const [dragOver, setDragOver] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)

  const sliderRef = useRef<HTMLDivElement>(null)
  const [sliderPos, setSliderPos] = useState(50)
  const sliderDragging = useRef(false)

  const handleSliderMove = useCallback((clientX: number) => {
    if (!sliderDragging.current || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    setSliderPos(
      Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    )
  }, [])

  useEffect(() => {
    if (stage !== "processing") return

    setProgress(0)
    setStepIdx(0)

    const duration = 3500
    const interval = 30
    let elapsed = 0

    const timer = setInterval(() => {
      elapsed += interval

      const pct = Math.min(100, (elapsed / duration) * 100)
      setProgress(pct)
      setStepIdx(
        Math.min(
          PROCESSING_STEPS.length - 1,
          Math.floor((pct / 100) * PROCESSING_STEPS.length)
        )
      )

      if (pct >= 100) {
        clearInterval(timer)
        setTimeout(() => setStage("done"), 300)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [stage])

  const loadImage = (src: string) => {
    setImageSrc(src)
    setStage("processing")
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = (e) => loadImage(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleDrop = () => {}

  const reset = () => {
    setImageSrc(null)
    setStage("idle")
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mb-12 max-w-xl"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        <AnimatePresence mode="wait">
          {/* IDLE — drag & drop zone */}
          {stage === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`glass group cursor-pointer rounded-4xl border border-dashed p-10 shadow-card transition-all duration-200 ${
                dragOver
                  ? "scale-[1.02] border-primary bg-primary/5"
                  : "border-primary/30 hover:border-primary/60"
              }`}
            >
              <div className="flex h-60 flex-col items-center justify-center gap-4">
                <div>
                  <p className="font-semibold text-foreground">
                    {dragOver
                      ? "Drop your image here!"
                      : "Drag & drop your image here"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    or click to browse • PNG, JPG, WEBP up to 25MB
                  </p>
                </div>
                <div
                  className="mt-2 flex gap-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="gradient"
                    size="lg"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" /> Upload Image
                  </Button>
                  <Button
                    variant="glass"
                    size="lg"
                    onClick={() => loadImage(SAMPLE_IMG)}
                  >
                    <Image className="h-4 w-4" /> Try Sample
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* PREVIEW — show uploaded image, confirm */}
          {stage === "preview" && imageSrc && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="glass rounded-2xl p-6 shadow-card"
            >
              <div className="relative mb-4 max-h-80 overflow-hidden rounded-xl">
                <img
                  src={imageSrc}
                  alt="Preview"
                  className="h-full max-h-80 w-full object-contain"
                />
                <button
                  onClick={reset}
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur transition-colors hover:bg-card"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {/* <div className="flex justify-center gap-3">
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={() => setStage("processing")}
                >
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground/60" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-primary-foreground" />
                  </span>
                  Remove Background
                </Button>
                <Button variant="glass" size="lg" onClick={reset}>
                  Choose Another
                </Button>
              </div> */}
            </motion.div>
          )}

          {/* PROCESSING — animated progress */}
          {stage === "processing" && imageSrc && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="glass rounded-2xl p-8 shadow-card"
            >
              <div className="relative mb-6 max-h-64 overflow-hidden rounded-xl">
                <img
                  src={imageSrc}
                  alt="Processing"
                  className="h-full max-h-64 w-full object-contain blur-[2px] brightness-75 transition-all duration-500"
                />
                {/* Scanning line */}
                <motion.div
                  className="gradient-bg shadow-glow absolute right-0 left-0 h-1"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* AI nodes overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute h-3 w-3 rounded-full bg-primary"
                        style={{
                          top: `${[30, 60, 40, 70][i]}%`,
                          left: `${[20, 70, 50, 35][i]}%`,
                        }}
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1.3, 0.8],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                    <div className="gradient-bg shadow-glow animate-pulse-glow flex h-16 w-16 items-center justify-center rounded-full">
                      <span className="text-2xl">🧠</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mx-auto max-w-md">
                <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                  <span>{PROCESSING_STEPS[stepIdx]}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="gradient-bg h-full rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="mt-4 flex justify-center gap-1">
                  {PROCESSING_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i <= stepIdx ? "gradient-bg w-6" : "w-1.5 bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* DONE — result with edit background */}
          {stage === "done" && imageSrc && (
            <ResultSection imageSrc={imageSrc} onReset={reset} />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Before/After Slider (always visible as demo) */}
      {/* {stage === "idle" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto max-w-3xl"
        >
          <div
            ref={sliderRef}
            className="relative aspect-[16/9] cursor-col-resize overflow-hidden rounded-2xl shadow-card select-none"
            onMouseDown={() => {
              sliderDragging.current = true
            }}
            onMouseUp={() => {
              sliderDragging.current = false
            }}
            onMouseLeave={() => {
              sliderDragging.current = false
            }}
            onMouseMove={(e) => handleSliderMove(e.clientX)}
            onTouchStart={() => {
              sliderDragging.current = true
            }}
            onTouchEnd={() => {
              sliderDragging.current = false
            }}
            onTouchMove={(e) => handleSliderMove(e.touches[0].clientX)}
          >
            <div className="absolute inset-0" style={checkerStyle}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="gradient-bg mx-auto mb-3 h-32 w-32 rounded-full opacity-80" />
                  <p className="text-xs font-medium text-muted-foreground">
                    Background Removed
                  </p>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div
                className="h-full w-full"
                style={{
                  width: sliderRef.current
                    ? `${sliderRef.current.offsetWidth}px`
                    : "100%",
                  background:
                    "linear-gradient(135deg, hsl(258, 70%, 85%), hsl(220, 85%, 85%), hsl(180, 60%, 85%))",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-3 h-32 w-32 rounded-full border-2 border-foreground/20 bg-foreground/10" />
                    <p className="text-xs font-medium text-muted-foreground">
                      Original
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="gradient-bg absolute top-0 bottom-0 z-10 w-1 cursor-col-resize"
              style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
            >
              <div className="gradient-bg shadow-glow absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full">
                <ArrowRight className="h-4 w-4 rotate-180 text-primary-foreground" />
                <ArrowRight className="-ml-1 h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            ↔ Drag to compare before & after
          </p>
        </motion.div>
      )} */}


      
    </>
  )
}

export default UploadImage
