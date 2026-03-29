import React from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import AddMoreImage from "./AddMoreImage"
import ImageCard from "./ImageCard"

interface ImageListProps {
   fileInputRef: React.RefObject<HTMLInputElement | null>
}

const ImageList = ({fileInputRef}: ImageListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute right-0 bottom-8 left-0 mx-auto max-w-5xl"
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <AddMoreImage onClick={() => {
            fileInputRef.current?.click()
          }} />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
        </div>

        <div className="flex items-center justify-end gap-3">
          <div className="max-w-23">No Image? Try these:</div>
          <ImageCard />
          <ImageCard />
          <ImageCard />
        </div>
      </div>
    </motion.div>
  )
}

export default ImageList
