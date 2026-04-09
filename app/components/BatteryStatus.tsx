"use client"

import React, { useState } from "react"

// flags
const MIN_HIGH_VOLTAGE = 20
const MIN_MEDIUM_VOLTAGE = 10

const BatteryStatus = () => {
  const [voltage, setVoltage] = useState<number>(5)
  const [current, setCurrent] = useState<number>(6)

  const getCircleColour = () => {
    if (voltage > MIN_HIGH_VOLTAGE) return "bg-red-500"
    if (voltage > MIN_MEDIUM_VOLTAGE) return "bg-yellow-400"
    return "bg-green-500"
  }

  const getBgColour = () => {
    if (voltage > MIN_HIGH_VOLTAGE) return "bg-red-500"
    if (voltage > MIN_MEDIUM_VOLTAGE) return "bg-yellow-400"
    return "bg-green-500"
  }

  return (
    <div className="border-black w-87.5 rounded-2xl bg-white p-4 border-[3px] h-min">
      <div className="flex justify-between items-center">
        <h2 className="text-black font-bold text-2xl">Battery Status</h2>
        <span className={`h-4 w-4  rounded-full ${getCircleColour()}`}></span> 
      </div>

      <hr className="border-black p-[8px]"></hr>

      <div className="flex justify-between gap-4">
        <div className={`flex flex-col w-[50%] justify-center items-center border-[1px] border-black rounded-xl ${getBgColour()}`}>
          <p className="text-black text-[13px]">Voltage</p>
          <h2 className="text-black text-[30px]">{voltage}</h2>
        </div>
        <div className={`flex flex-col w-[50%] justify-center items-center border-[1px] border-black rounded-xl ${getBgColour()}`}>
          <p className="text-black text-[13px]">Current</p>
          <h2 className="text-black text-[30px]">{current}</h2>
        </div>
      </div>
    </div>
  )
}
export default BatteryStatus
