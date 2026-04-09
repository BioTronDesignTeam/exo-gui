"use client" 
import React, {useState} from "react"
import Dropdown from './Dropdown'


const MotorInputs = ({ title } : { title: string }) => {
    const [position, setPosition] = useState<number>(0)
    const [velocity, setVelocity] = useState<number>(0)
    const [torque, setTorque] = useState<number>(0)
    const [maxCurrent, setMaxCurrent] = useState<number>(0)
    const [maxVelocity, setMaxVelocity] = useState<number>(0)

    return (
        <div className="w-[320px] rounded-2xl bg-gray-800 p-5 shadow-lg border-red h-min">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            <div className="border-b border-gray-600 mb-4" />

            {/* Dropdown menus */}
            <Dropdown title="Inputs">
                <Field label="Set position (deg)" value={position} setState={setPosition}/>
                <Field label="Set velocity (*/s)" value={velocity} setState={setVelocity}/>
                <Field label="Set torque (N/m)" value={torque} setState={setTorque}/>
            </Dropdown>
            <Dropdown title="Output Limits" >
                <Field label="Set max velocity (*/s)" value={maxVelocity} setState={setMaxVelocity}/>
                <Field label="Set max current (A)" value={maxCurrent} setState={setMaxCurrent}/>
            </Dropdown>
        </div>
    )
}

const Field = ({ label, value, setState } : { label: string, value: number, setState: React.Dispatch<React.SetStateAction<number>>  }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        alert(`inputs applied!`)
    };
    return( 
        <form onSubmit={handleSubmit} >
            <label>{label}</label>
            <div className="flex gap-5">
                <input className="bg-white text-black p-1 rounded-s" type="number" value={value} onChange={(e) => setState(Number(e.target.value))}/>
                <button className="text-center border-2 border-white rounded px-2" type="submit">Apply</button>
            </div>
        </form>
    )
}

export default MotorInputs