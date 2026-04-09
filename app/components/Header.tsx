"use client"
import React, { useState } from 'react'
import EmergencyStop from './EmergencyStop'

const Header = () => {
  return (
    <header className="bg-sky-200 text-white z-50 sticky top-0 w-full h-[70px] py-[10px] px-8 flex justify-between">
      <div className="w-[200px] h-full bg-white rounded-full flex items-center justify-center">
        {/* Can replace with image of logo later, just a placeholder */}
        <a href="#"className="text-xl text-black">Logo</a>
      </div>
      {/* So far only have main page, links to other pages can be added after. Also unsure of how to add icons, can add later */}
      <nav className="bg-white text-black w-[600px] h-full p-[10px] flex justify-between items-center rounded-full">
        <a href="#" className="w-[150px] text-center rounded-full hover:font-bold">Overview</a>
        <a href="#" className="w-[150px] text-center rounded-full hover:font-bold">Data</a>
        <a href="#" className="w-[150px] text-center rounded-full hover:font-bold">Commands</a>
      </nav>
      <EmergencyStop />
    </header>
  )
}

export default Header