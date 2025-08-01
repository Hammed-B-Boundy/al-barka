"use client"

import { useState } from "react"
import "./App.css"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import MenuGrid from "./components/MenuGrid"

function App() {
  const [activeCategory, setActiveCategory] = useState("burgers")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="app">
      <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <div className="main-content">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} activeCategory={activeCategory} />
        <MenuGrid category={activeCategory} searchTerm={searchTerm} />
      </div>
    </div>
  )
}

export default App
