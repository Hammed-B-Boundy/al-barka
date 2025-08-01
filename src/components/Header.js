"use client"

const Header = ({ searchTerm, setSearchTerm, activeCategory }) => {
  const getCategoryTitle = (category) => {
    const titles = {
      dashboard: "Tableau de bord",
      burgers: "Burgers 🍔",
      plats: "Plats locaux 🍽️",
      boissons: "Boissons 🥤",
      desserts: "Desserts 🍰",
    }
    return titles[category] || "Menu"
  }

  const getBreadcrumb = (category) => {
    if (category === "dashboard") return "Accueil"
    return `Menu > ${getCategoryTitle(category)}`
  }

  return (
    <div className="header">
      <div className="breadcrumb">
        <span className="back-arrow">←</span>
        <span className="breadcrumb-text">{getBreadcrumb(activeCategory)}</span>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <h1 className="page-title">{getCategoryTitle(activeCategory)}</h1>
    </div>
  )
}

export default Header
