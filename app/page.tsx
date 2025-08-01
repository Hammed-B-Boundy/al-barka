"use client"

import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import MenuGrid from "./components/MenuGrid"

interface CartItem {
  id: number
  name: string
  weight: string
  price: string
  image: string
  quantity: number
  priceNumber: number
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("plats")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const addToCart = (item: any) => {
    const priceNumber = Number.parseInt(item.price.replace(" FCFA", ""))

    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prev, { ...item, quantity: 1, priceNumber }]
      }
    })

    alert(`${item.name} ajouté au panier !`)
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.priceNumber * item.quantity, 0)
  }

  return (
    <div className="flex min-h-screen max-w-7xl mx-auto my-5 bg-white rounded-3xl overflow-hidden shadow-2xl">
      <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} cartCount={getTotalItems()} />
      <div className="flex-1 flex flex-col">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} activeCategory={activeCategory} />
        <MenuGrid
          category={activeCategory}
          searchTerm={searchTerm}
          onAddToCart={addToCart}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          getTotalPrice={getTotalPrice}
        />
      </div>
    </div>
  )
}
