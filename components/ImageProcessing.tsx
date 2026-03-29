import { motion } from "framer-motion"

interface ImageProcessingProps {
  imageSrc: string
  PROCESSING_STEPS: string[]
  stepIdx: number
  progress: number
}

const ImageProcessing = ({
  imageSrc,
  PROCESSING_STEPS,
  stepIdx,
  progress,
}: ImageProcessingProps) => {
  return (
    <div>
      <motion.div
        key="processing"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="glass rounded-2xl p-8 shadow-card"
      >
        <div className="relative mb-6 flex max-h-64 justify-center overflow-hidden rounded-xl">
          <img
            src={imageSrc}
            alt="Processing"
            className="object-contain blur-[2px] brightness-75 transition-all duration-500"
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
      </motion.div>
      <div className="mx-auto mt-4 max-w-md">
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
    </div>
  )
}

export default ImageProcessing
