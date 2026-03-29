import React, { useState } from "react"
import { Download, Palette, RotateCcw } from "lucide-react"
import { Button } from "./ui/button"

interface ActionTabProps {
    reset: () => void;
}

const ActionTab = ({reset}: ActionTabProps) => {

    const [editOpen, setEditOpen] = useState(false)

  return (
    <div className="max-w-2xl glass mx-auto mb-10 shadow-card flex flex-wrap justify-center gap-3 rounded-full bg-card px-3 py-1">
      <Button variant="gradient" size="lg">
        <Download className="h-4 w-4" /> Download HD
      </Button>
      <Button variant="glass" size="lg" className="opacity-70">
        <Download className="h-4 w-4" /> Preview
      </Button>
      <Button
          variant={editOpen ? "default" : "glass"}
        size="lg"
          onClick={() => setEditOpen(!editOpen)}
      >
        <Palette className="h-4 w-4" />{" "}
        {editOpen ? "Close Editor" : "Edit Background"}
      </Button>
      <Button variant="ghost" size="lg" onClick={reset}>
        <RotateCcw className="h-4 w-4" /> New Image
      </Button>
    </div>
  )
}

export default ActionTab
