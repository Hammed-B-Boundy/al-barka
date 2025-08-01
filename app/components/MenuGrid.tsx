import MenuCard from "./MenuCard"
import CartPage from "./CartPage"

interface MenuGridProps {
  category: string
  searchTerm: string
  onAddToCart: (item: MenuItem) => void
  cartItems: CartItem[]
  updateQuantity: (id: number, quantity: number) => void
  removeFromCart: (id: number) => void
  getTotalPrice: () => number
}

interface MenuItem {
  id: number
  name: string
  weight: string
  price: string
  image: string
}

interface CartItem extends MenuItem {
  quantity: number
  priceNumber: number
}

export default function MenuGrid({
  category,
  searchTerm,
  onAddToCart,
  cartItems,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
}: MenuGridProps) {
  const menuData: { [key: string]: MenuItem[] } = {
    plats: [
      {
        id: 7,
        name: "Riz au gras",
        weight: "400 g",
        price: "2000 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 8,
        name: "Poulet braisé",
        weight: "350 g",
        price: "2500 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 9,
        name: "Tô sauce",
        weight: "300 g",
        price: "1500 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 10,
        name: "Riz sauce",
        weight: "350 g",
        price: "1800 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 11,
        name: "Poisson braisé",
        weight: "300 g",
        price: "3000 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 12,
        name: "Ragout d'igname",
        weight: "400 g",
        price: "2200 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    boissons: [
      {
        id: 13,
        name: "Bissap",
        weight: "500 ml",
        price: "800 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 14,
        name: "Gingembre",
        weight: "500 ml",
        price: "700 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 15,
        name: "Dableni",
        weight: "500 ml",
        price: "600 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 16,
        name: "Eau fraîche",
        weight: "500 ml",
        price: "300 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
  }

  if (category === "panier") {
    return (
      <CartPage
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
      />
    )
  }

  const items = menuData[category] || []
  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <MenuCard key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  )
}
