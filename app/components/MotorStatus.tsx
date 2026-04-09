"use client";

import React, { useState } from "react";

interface MotorStatusProps {
  title: string;
  className?: string;
}

export default function MotorStatus({ title, className }: MotorStatusProps) {
  const [temperature, setTemperature] = useState<number>(0.0);
  const [position, setPosition] = useState<number>(0.0);
  const [velocity, setVelocity] = useState<number>(0.0);
  const [torque, setTorque] = useState<number>(0.0);
  const [error, setError] = useState("None");

  return (
    <div
      className={`w-87.5 p-4 bg-white text-black border-3 border-black rounded-xl p-3 flex flex-col h-min ${className || ""}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-400">
        <h2 className="text-[22px] font-semibold">{title}</h2>
        <div className="w-3 h-3 bg-green-300 rounded-full"></div>
      </div>

      {/* Status Boxes */}
      <div className="flex flex-col gap-4 flex-1 p-3">

        <div className="bg-green-300 border border-black rounded-lg flex flex-col items-center justify-center h-[60px]">
          <p className="text-[12px]">Temperature</p>
          <p className="text-[20px] font-bold">{temperature}</p>
        </div>

        <div className="bg-green-300 border border-black rounded-lg flex flex-col items-center justify-center h-[60px]">
          <p className="text-[12px]">Position</p>
          <p className="text-[20px] font-bold">{position}</p>
        </div>

        <div className="bg-green-300 border border-black rounded-lg flex flex-col items-center justify-center h-[60px]">
          <p className="text-[12px]">Velocity</p>
          <p className="text-[20px] font-bold">{velocity}</p>
        </div>

        <div className="bg-green-300 border border-black rounded-lg flex flex-col items-center justify-center h-[60px]">
          <p className="text-[12px]">Torque</p>
          <p className="text-[20px] font-bold">{torque}</p>
        </div>

        <div className="bg-yellow-200 border border-black rounded-lg flex flex-col items-center justify-center h-[60px]">
          <p className="text-[12px]">Error</p>
          <p className="text-[16px] font-semibold">{error}</p>
        </div>

      </div>
    </div>
  );
}