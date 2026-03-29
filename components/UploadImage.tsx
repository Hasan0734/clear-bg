import React, { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ResultSection from "./ResultSection"
import ActionTab from "./ActionTab"
import ImageProcessing from "./ImageProcessing"
import ImagePreview from "./ImagePreview"
import { Stage } from "@/lib/types"
import DropZone from "./DropZone"
import ImageList from "./ImageList"

interface UploadImageProps {
  imageSrc: string | null
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>
}

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
    <div>
      {stage === "done" && imageSrc && <ActionTab reset={reset} />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mb-12 max-w-lg"
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
            <DropZone
              setDragOver={setDragOver}
              handleDrop={handleDrop}
              dragOver={dragOver}
              fileInputRef={fileInputRef}
              loadImage={loadImage}
            />
          )}

          {/* PREVIEW — show uploaded image, confirm */}
          {stage === "preview" && imageSrc && (
            <ImagePreview
              reset={reset}
              imageSrc={imageSrc}
              setStage={setStage}
            />
          )}

          {/* PROCESSING — animated progress */}
          {stage === "processing" && imageSrc && (
            <ImageProcessing
              imageSrc={imageSrc}
              PROCESSING_STEPS={PROCESSING_STEPS}
              stepIdx={stepIdx}
              progress={progress}
            />
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
      {imageSrc && <ImageList fileInputRef={fileInputRef} />}

    </div>
  )
}

export default UploadImage
