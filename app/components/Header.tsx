"use client"

import { Menu } from "lucide-react" // <-- Ajouté
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar" // <-- Ajouté

interface HeaderProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  activeCategory: string
}

export default function Header({ searchTerm, setSearchTerm, activeCategory }: HeaderProps) {
  const { isMobile } = useSidebar() // <-- Utilisation du hook useSidebar

  const getCategoryTitle = (category: string) => {
    const titles: { [key: string]: string } = {
      plats: "Plats locaux 🍽️",
      boissons: "Boissons 🥤",
      panier: "Panier 🛒",
    }
    return titles[category] || "Menu"
  }

  const getBreadcrumb = (category: string) => {
    if (category === "panier") return "Panier"
    return `Menu > ${getCategoryTitle(category)}`
  }

  return (
    <div className="p-8 border-b border-gray-200 bg-white">
      {/* Breadcrumb and Mobile Trigger */}
      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
        {isMobile && ( // <-- Affiche le bouton de menu seulement sur mobile
          <SidebarTrigger asChild>
            <button className="cursor-pointer hover:bg-gray-100 p-1 rounded">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Ouvrir le menu</span>
            </button>
          </SidebarTrigger>
        )}
        {!isMobile && ( // <-- Affiche la flèche de retour seulement sur desktop
          <span className="cursor-pointer hover:bg-gray-100 p-1 rounded">←</span>
        )}
        <span>{getBreadcrumb(activeCategory)}</span>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800">{getCategoryTitle(activeCategory)}</h1>
    </div>
  )
}
