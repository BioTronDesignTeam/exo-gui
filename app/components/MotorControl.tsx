"use client"
import React, {useState} from "react"
import Dropdown from './Dropdown'
import Toggle from './Toggle'

const MotorControl = () => {
    return (
        <div className="w-[320px] rounded-2xl bg-gray-800 p-5 shadow-lg border-red">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Motor Control</h2>
            </div>
            <div className="border-b border-gray-600 mb-4" />

            {/* Dropdown menus */}
            <Dropdown title="Hip">
                <MotorDropdown />
            </Dropdown>
            <Dropdown title="Knee">
                <MotorDropdown />
            </Dropdown>
        </div>
        
    )
}

const MotorDropdown = () => {
    const [angle, setAngle] = useState("")
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const angle_final = Number(angle)

        alert(`Angle Set!`)
    }

    return (
        <div className="w-[100%] rounded-2xl bg-gray-800 shadow-lg border-red">
            <Toggle label="Enable Motor"/>
            
            <form className="flex-col gap-5" onSubmit={handleSubmit} >
                <label>Target Angle (degrees)
                    <input className="bg-white text-black p-1 rounded-s" type="number" value={angle} onChange={(e) => setAngle(e.target.value)}/>
                </label>
                <button className="w-[60px] text-center border-2 border-white rounded-s m-1" type="submit">Set</button>
            </form>
        </div>
    )
}

export default MotorControl