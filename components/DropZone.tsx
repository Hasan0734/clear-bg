import React from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Image, Upload } from "lucide-react"

interface DropZoneProps {
  setDragOver: React.Dispatch<React.SetStateAction<boolean>>
  handleDrop: () => void
  dragOver: boolean
  loadImage: (src: string) => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
}

const SAMPLE_IMG =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80"

const DropZone = ({
  setDragOver,
  handleDrop,
  dragOver,
  fileInputRef,
  loadImage,
}: DropZoneProps) => {
  return (
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
            {dragOver ? "Drop your image here!" : "Drag & drop your image here"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            or click to browse • PNG, JPG, WEBP up to 25MB
          </p>
        </div>
        <div className="mt-2 flex gap-3" onClick={(e) => e.stopPropagation()}>
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
  )
}

export default DropZone
