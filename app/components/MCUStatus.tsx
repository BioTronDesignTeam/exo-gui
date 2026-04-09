"use client"
import React, {useState} from 'react'
const MCUStatus = () => {
  const [ESPStatus, SetESPStatus] = useState<boolean>(true)
  const [STMStatus, SetSTMStatus] = useState<boolean>(false)
  
  //TODO: change actual conditions for red yellow green
  const getBgColour = (state:boolean) => {
    if (state == false) return "bg-red-200"
    return "bg-green-200"
  }
  const getCircleColour = () => {
    if (!ESPStatus || !STMStatus) return "bg-red-500"
    return "bg-green-500"
  }

  return (
    <div className="w-[350px] rounded-2xl bg-white py-[16px] px-[16px] border-[3px] border-black h-min">
      <div className="flex justify-between items-center">
        <h2 className="text-black font-bold text-2xl">MCU Status</h2>
        <span className={`h-4 w-4 rounded-full ${getCircleColour()}`}></span> 
      </div>
      <hr className="border-black p-[8px]"></hr>
      <div className="flex flex-col gap-[8px]">
        <div className={`flex flex-col justify-center items-center border-[1px] border-black rounded-xl ${getBgColour(ESPStatus)}`}>
          <p className="text-black text-[13px]">ESP32</p>
          <h2 className="text-black text-[24px]">{ESPStatus? "Running" : "Issue"}</h2>
        </div>
        <div className={`flex flex-col justify-center items-center border-[1px] border-black rounded-xl ${getBgColour(STMStatus)}`}>
          <p className="text-black text-[13px]">STM32</p>
          <h2 className="text-black text-[24px]">{STMStatus? "Running" : "Issue"}</h2>
      </div>
      </div>
    </div>

  )
}
export default MCUStatus