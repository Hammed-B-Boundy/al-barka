"use client"
import { Sheet, SheetContent } from "@/components/ui/sheet" // Importe Sheet et SheetContent

interface MobileSidebarProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
  cartCount?: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function MobileSidebar({
  activeCategory,
  setActiveCategory,
  cartCount = 0,
  isOpen,
  setIsOpen,
}: MobileSidebarProps) {
  const menuItems = [
    { id: "plats", name: "Plats locaux", icon: "🍽️" },
    { id: "boissons", name: "Boissons", icon: "🥤" },
  ]

  const otherItems = [{ id: "panier", name: "Panier", icon: "🛒", badge: cartCount.toString() }]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="w-64 bg-gray-50 p-0">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl">
              🍴
            </div>
            <span className="text-xl font-bold text-gray-800">Al Barka</span>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="flex-1 py-6">
          <div className="mb-8">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`mx-3 mb-1 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                  activeCategory === item.id
                    ? "bg-yellow-200 text-gray-800 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveCategory(item.id)
                  setIsOpen(false) // Ferme la sidebar après sélection
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="px-6 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Autres</div>
            {otherItems.map((item) => (
              <div
                key={item.id}
                className={`mx-3 mb-1 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                  activeCategory === item.id
                    ? "bg-yellow-200 text-gray-800 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveCategory(item.id)
                  setIsOpen(false) // Ferme la sidebar après sélection
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
                {item.badge && cartCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white">👨‍🍳</div>
            <div>
              <div className="text-sm font-semibold text-gray-800">Chef Al Barka</div>
              <div className="text-xs text-gray-500">Gérant • En ligne</div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
