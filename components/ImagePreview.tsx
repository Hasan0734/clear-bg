import React from "react"
import {motion} from 'framer-motion';
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Stage } from "@/lib/types";

interface ImagePreviewProps {
    imageSrc: string;
    reset: () => void;
    setStage: React.Dispatch<React.SetStateAction<Stage>>
}


const ImagePreview = ({imageSrc, reset,setStage}:ImagePreviewProps) => {
  return (
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
      <div className="flex justify-center gap-3">
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
      </div>
    </motion.div>
  )
}

export default ImagePreview
