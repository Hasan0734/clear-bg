import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

const checkerStyle = {
  backgroundImage:
    "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%), linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%), linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)",
  backgroundSize: "20px 20px",
  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
}

const SOLID_COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#22c55e" },
  { name: "Yellow", value: "#eab308" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#ec4899" },
  { name: "Orange", value: "#f97316" },
  { name: "Teal", value: "#14b8a6" },
]

const PRESET_BACKGROUNDS = [
  {
    name: "Gradient Purple",
    style: "linear-gradient(135deg, #7c3aed, #2563eb)",
  },
  {
    name: "Gradient Sunset",
    style: "linear-gradient(135deg, #f97316, #ec4899)",
  },
  {
    name: "Gradient Ocean",
    style: "linear-gradient(135deg, #06b6d4, #3b82f6)",
  },
  {
    name: "Gradient Forest",
    style: "linear-gradient(135deg, #22c55e, #14b8a6)",
  },
  {
    name: "Gradient Night",
    style: "linear-gradient(135deg, #1e1b4b, #312e81)",
  },
  {
    name: "Gradient Warm",
    style: "linear-gradient(135deg, #fbbf24, #f97316, #ef4444)",
  },
]

type BgMode = "transparent" | "color" | "preset"

interface ResultSectionProps {
  imageSrc: string
  onReset: () => void
}

const ResultSection = ({ imageSrc, onReset }: ResultSectionProps) => {
  const [editOpen, setEditOpen] = useState(false)
  const [bgMode, setBgMode] = useState<BgMode>("transparent")
  const [selectedColor, setSelectedColor] = useState("#ffffff")
  const [customColor, setCustomColor] = useState("#6366f1")
  const [selectedPreset, setSelectedPreset] = useState(
    PRESET_BACKGROUNDS[0].style
  )

  return (
    <div>
      <div>
        {/* Before / After */}
        <motion.div
          key="processing"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          className="glass rounded-2xl p-8 shadow-card"
        >
          <div className="relative mb-6 flex max-h-64 justify-center overflow-hidden rounded-xl">
            <div className="size-62 flex justify-center items-center">
              <img
                src={imageSrc}
                alt="Result"
                className="transition-all duration-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Edit Background Panel */}
        <AnimatePresence>
          {editOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="glass mb-4 rounded-xl p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Edit Background</h3>
                  <button
                    onClick={() => setEditOpen(false)}
                    className="rounded-lg p-1 transition-colors hover:bg-secondary"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Mode Tabs */}
                <div className="mb-4 flex gap-1 rounded-xl bg-secondary p-1">
                  {[
                    { mode: "transparent" as BgMode, label: "Transparent" },
                    { mode: "color" as BgMode, label: "Solid Color" },
                    { mode: "preset" as BgMode, label: "Presets" },
                  ].map(({ mode, label }) => (
                    <button
                      key={mode}
                      onClick={() => setBgMode(mode)}
                      className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 ${
                        bgMode === mode
                          ? "shadow-soft bg-card text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Transparent */}
                {bgMode === "transparent" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-4 text-center"
                  >
                    <div
                      className="mx-auto mb-3 h-16 w-16 rounded-xl"
                      style={checkerStyle}
                    />
                    <p className="text-xs text-muted-foreground">
                      Transparent background (PNG)
                    </p>
                  </motion.div>
                )}

                {/* Solid Color Picker */}
                {bgMode === "color" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="mb-3 grid grid-cols-5 gap-2">
                      {SOLID_COLORS.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setSelectedColor(c.value)}
                          className={`relative aspect-square w-full rounded-xl border-2 transition-all duration-200 hover:scale-110 ${
                            selectedColor === c.value
                              ? "shadow-soft scale-110 border-primary"
                              : "border-transparent"
                          }`}
                          style={{ backgroundColor: c.value }}
                          title={c.name}
                        >
                          {selectedColor === c.value && (
                            <Check
                              className={`absolute inset-0 m-auto h-4 w-4 ${c.value === "#000000" ? "text-primary-foreground" : "text-foreground"}`}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                    {/* Custom color input */}
                    <div className="flex items-center gap-2 border-t border-border pt-2">
                      <span className="text-xs text-muted-foreground">
                        Custom:
                      </span>
                      <div className="relative">
                        <input
                          type="color"
                          value={customColor}
                          onChange={(e) => {
                            setCustomColor(e.target.value)
                            setSelectedColor(e.target.value)
                          }}
                          className="h-8 w-8 cursor-pointer rounded-lg border-0 p-0"
                        />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {customColor.toUpperCase()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto h-7 text-xs"
                        onClick={() => setSelectedColor(customColor)}
                      >
                        Apply
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Preset Backgrounds */}
                {bgMode === "preset" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="grid grid-cols-3 gap-2">
                      {PRESET_BACKGROUNDS.map((bg) => (
                        <button
                          key={bg.name}
                          onClick={() => setSelectedPreset(bg.style)}
                          className={`relative h-16 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                            selectedPreset === bg.style
                              ? "shadow-soft scale-105 border-primary"
                              : "border-transparent"
                          }`}
                          style={{ background: bg.style }}
                          title={bg.name}
                        >
                          {selectedPreset === bg.style && (
                            <Check className="absolute inset-0 m-auto h-5 w-5 text-primary-foreground drop-shadow" />
                          )}
                          <span className="absolute right-0 bottom-1 left-0 text-[9px] font-medium text-primary-foreground/80 drop-shadow">
                            {bg.name.replace("Gradient ", "")}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ResultSection
