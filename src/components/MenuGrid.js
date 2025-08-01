import MenuCard from "./MenuCard"

const MenuGrid = ({ category, searchTerm }) => {
  const menuData = {
    burgers: [
      {
        id: 1,
        name: "Cheeseburger",
        weight: "150 g",
        price: "2500 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 2,
        name: "Chicken-Deluxe",
        weight: "240 g",
        price: "3000 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 3,
        name: "Hamburger",
        weight: "320 g",
        price: "3500 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 4,
        name: "Big John",
        weight: "650 g",
        price: "4500 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 5,
        name: "Spicy Chicken",
        weight: "340 g",
        price: "3200 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 6,
        name: "Superstars",
        weight: "250 g",
        price: "2800 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
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
    ],
    boissons: [
      {
        id: 10,
        name: "Bissap",
        weight: "500 ml",
        price: "800 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 11,
        name: "Gingembre",
        weight: "500 ml",
        price: "700 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 12,
        name: "Coca Cola",
        weight: "330 ml",
        price: "600 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    desserts: [
      {
        id: 13,
        name: "Beignets",
        weight: "200 g",
        price: "1000 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 14,
        name: "Fruits de saison",
        weight: "250 g",
        price: "1200 FCFA",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
  }

  if (category === "dashboard") {
    return (
      <div className="dashboard">
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Commandes du jour</h3>
            <div className="dashboard-number">24</div>
          </div>
          <div className="dashboard-card">
            <h3>Revenus</h3>
            <div className="dashboard-number">45,000 FCFA</div>
          </div>
          <div className="dashboard-card">
            <h3>Plats populaires</h3>
            <div className="dashboard-number">Burgers</div>
          </div>
        </div>
      </div>
    )
  }

  const items = menuData[category] || []
  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="menu-grid">
      {filteredItems.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default MenuGrid
