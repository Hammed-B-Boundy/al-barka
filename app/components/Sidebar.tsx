"use client"

import type * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar, // <-- Ajouté pour la logique mobile
} from "@/components/ui/sidebar"
import { Sheet, SheetContent } from "@/components/ui/sheet" // <-- Ajouté pour le menu mobile
import { cn } from "@/lib/utils" // <-- Ajouté pour les classes conditionnelles

interface SidebarProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
  cartCount?: number
}

export default function AppSidebar({ activeCategory, setActiveCategory, cartCount = 0 }: SidebarProps) {
  const { isMobile, openMobile, setOpenMobile } = useSidebar() // Utilisation du hook useSidebar

  const menuItems = [
    { id: "plats", name: "Plats locaux", icon: "🍽️" },
    { id: "boissons", name: "Boissons", icon: "🥤" },
  ]

  const otherItems = [{ id: "panier", name: "Panier", icon: "🛒", badge: cartCount.toString() }]

  const sidebarContent = (
    <>
      {/* Header */}
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl">🍴</div>
          <span className="text-xl font-bold text-gray-800">Al Barka</span>
        </div>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="flex-1 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeCategory === item.id}
                    onClick={() => {
                      setActiveCategory(item.id)
                      if (isMobile) setOpenMobile(false) // Ferme la sidebar sur mobile après sélection
                    }}
                  >
                    <a href="#">
                      {" "}
                      {/* Utilisation d'un lien factice, à remplacer par Next.js Link si nécessaire */}
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm">{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-6 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Autres
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeCategory === item.id}
                    onClick={() => {
                      setActiveCategory(item.id)
                      if (isMobile) setOpenMobile(false) // Ferme la sidebar sur mobile après sélection
                    }}
                  >
                    <a href="#">
                      {" "}
                      {/* Utilisation d'un lien factice, à remplacer par Next.js Link si nécessaire */}
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm">{item.name}</span>
                      {item.badge && cartCount > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-6 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white">👨‍🍳</div>
          <div>
            <div className="text-sm font-semibold text-gray-800">Chef Al Barka</div>
            <div className="text-xs text-gray-500">Gérant • En ligne</div>
          </div>
        </div>
      </SidebarFooter>
    </>
  )

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side="left"
          className="w-(--sidebar-width-mobile) bg-gray-50 p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width-mobile": "18rem", // Ajustez si nécessaire
            } as React.CSSProperties
          }
        >
          <div className="flex h-full w-full flex-col">{sidebarContent}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sidebar
      className={cn(
        "w-72 bg-gray-50 flex flex-col border-r border-gray-200",
        "group peer hidden md:block text-sidebar-foreground", // Assure que la sidebar est cachée sur mobile par défaut
      )}
      collapsible="offcanvas" // Permet de la cacher/afficher sur desktop si on ajoute un trigger
    >
      {sidebarContent}
    </Sidebar>
  )
}
