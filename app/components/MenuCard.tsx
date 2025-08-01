"use client"

interface MenuItem {
  id: number
  name: string
  weight: string
  price: string
  image: string
}

interface MenuCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
}

export default function MenuCard({ item, onAddToCart }: MenuCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{item.weight}</p>
        <div className="text-xl font-bold text-red-500 mb-4">{item.price}</div>
        <button
          onClick={() => onAddToCart(item)}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  )
}
