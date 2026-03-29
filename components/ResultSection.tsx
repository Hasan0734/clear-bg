import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Palette, RotateCcw, Check, ImageIcon, X } from "lucide-react";

const checkerStyle = {
  backgroundImage:
    "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%), linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%), linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)",
  backgroundSize: "20px 20px",
  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
};

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
];

const PRESET_BACKGROUNDS = [
  { name: "Gradient Purple", style: "linear-gradient(135deg, #7c3aed, #2563eb)" },
  { name: "Gradient Sunset", style: "linear-gradient(135deg, #f97316, #ec4899)" },
  { name: "Gradient Ocean", style: "linear-gradient(135deg, #06b6d4, #3b82f6)" },
  { name: "Gradient Forest", style: "linear-gradient(135deg, #22c55e, #14b8a6)" },
  { name: "Gradient Night", style: "linear-gradient(135deg, #1e1b4b, #312e81)" },
  { name: "Gradient Warm", style: "linear-gradient(135deg, #fbbf24, #f97316, #ef4444)" },
];

type BgMode = "transparent" | "color" | "preset";

interface ResultSectionProps {
  imageSrc: string;
  onReset: () => void;
}

const ResultSection = ({ imageSrc, onReset }: ResultSectionProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [bgMode, setBgMode] = useState<BgMode>("transparent");
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [customColor, setCustomColor] = useState("#6366f1");
  const [selectedPreset, setSelectedPreset] = useState(PRESET_BACKGROUNDS[0].style);

  const getResultBgStyle = (): React.CSSProperties => {
    switch (bgMode) {
      case "transparent":
        return checkerStyle;
      case "color":
        return { backgroundColor: selectedColor };
      case "preset":
        return { background: selectedPreset };
    }
  };

  return (
    <motion.div
      key="done"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="glass rounded-2xl p-6 shadow-card"
    >
      {/* Before / After */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="rounded-xl overflow-hidden relative">
          <img src={imageSrc} alt="Original" className="w-full h-48 object-cover" />
          <span className="absolute top-2 left-2 text-[10px] font-semibold bg-card/80 backdrop-blur px-2 py-0.5 rounded-full">
            Original
          </span>
        </div>
        <div className="rounded-xl overflow-hidden relative transition-all duration-300" style={getResultBgStyle()}>
          <img
            src={imageSrc}
            alt="Result"
            className="w-full h-48 object-cover"
            style={{ mixBlendMode: bgMode === "transparent" ? "multiply" : "normal", opacity: 0.85 }}
          />
          <span className="absolute top-2 left-2 text-[10px] font-semibold bg-card/80 backdrop-blur px-2 py-0.5 rounded-full">
            Removed ✓
          </span>
        </div>
      </div>

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
            <div className="glass rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Edit Background</h3>
                <button onClick={() => setEditOpen(false)} className="p-1 rounded-lg hover:bg-secondary transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Mode Tabs */}
              <div className="flex gap-1 bg-secondary rounded-xl p-1 mb-4">
                {([
                  { mode: "transparent" as BgMode, label: "Transparent" },
                  { mode: "color" as BgMode, label: "Solid Color" },
                  { mode: "preset" as BgMode, label: "Presets" },
                ]).map(({ mode, label }) => (
                  <button
                    key={mode}
                    onClick={() => setBgMode(mode)}
                    className={`flex-1 text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200 ${
                      bgMode === mode
                        ? "bg-card shadow-soft text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Transparent */}
              {bgMode === "transparent" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                  <div className="w-16 h-16 mx-auto rounded-xl mb-3" style={checkerStyle} />
                  <p className="text-xs text-muted-foreground">Transparent background (PNG)</p>
                </motion.div>
              )}

              {/* Solid Color Picker */}
              {bgMode === "color" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {SOLID_COLORS.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setSelectedColor(c.value)}
                        className={`relative w-full aspect-square rounded-xl border-2 transition-all duration-200 hover:scale-110 ${
                          selectedColor === c.value ? "border-primary shadow-soft scale-110" : "border-transparent"
                        }`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      >
                        {selectedColor === c.value && (
                          <Check className={`absolute inset-0 m-auto w-4 h-4 ${c.value === "#000000" ? "text-primary-foreground" : "text-foreground"}`} />
                        )}
                      </button>
                    ))}
                  </div>
                  {/* Custom color input */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">Custom:</span>
                    <div className="relative">
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => {
                          setCustomColor(e.target.value);
                          setSelectedColor(e.target.value);
                        }}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{customColor.toUpperCase()}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto text-xs h-7"
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
                          selectedPreset === bg.style ? "border-primary shadow-soft scale-105" : "border-transparent"
                        }`}
                        style={{ background: bg.style }}
                        title={bg.name}
                      >
                        {selectedPreset === bg.style && (
                          <Check className="absolute inset-0 m-auto w-5 h-5 text-primary-foreground drop-shadow" />
                        )}
                        <span className="absolute bottom-1 left-0 right-0 text-[9px] font-medium text-primary-foreground/80 drop-shadow">
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

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="gradient" size="lg">
          <Download className="w-4 h-4" /> Download HD
        </Button>
        <Button variant="glass" size="lg" className="opacity-70">
          <Download className="w-4 h-4" /> Preview
        </Button>
        <Button
          variant={editOpen ? "default" : "glass"}
          size="lg"
          onClick={() => setEditOpen(!editOpen)}
        >
          <Palette className="w-4 h-4" /> {editOpen ? "Close Editor" : "Edit Background"}
        </Button>
        <Button variant="ghost" size="lg" onClick={onReset}>
          <RotateCcw className="w-4 h-4" /> New Image
        </Button>
      </div>
    </motion.div>
  );
};

export default ResultSection;
