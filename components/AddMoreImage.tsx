import { Plus } from "lucide-react"
import React from "react"

const AddMoreImage = ({onClick}: {onClick: () => void;}) => {
  return (
    <div onClick={onClick} className="group flex size-16 cursor-pointer items-center justify-center rounded-md border transition-all duration-300 hover:border-primary">
      <Plus className="scale-90 transition-transform duration-300 group-hover:scale-110" />
    </div>
  )
}

export default AddMoreImage
