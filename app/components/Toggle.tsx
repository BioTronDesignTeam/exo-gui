"use client"
import { useState } from "react"

type MotorToggleProps = {
  label?: string
}

const MotorToggle = ({ label = "Motor" }: MotorToggleProps) => {
  const [isOn, setIsOn] = useState(false)

  return (
    <div className="flex items-center justify-between">
      {/* Label */}
      <span className="text-gray-300 text-sm font-medium">
        {label}
      </span>

      {/* Toggle */}
      <button
        onClick={() => setIsOn(!isOn)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${isOn ? "bg-green-500" : "bg-gray-600"}
        `}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${isOn ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  )
}

export default MotorToggle
