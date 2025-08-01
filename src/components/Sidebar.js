"use client"

const Sidebar = ({ activeCategory, setActiveCategory }) => {
  const menuItems = [
    { id: "dashboard", name: "Tableau de bord", icon: "📊" },
    { id: "burgers", name: "Burgers", icon: "🍔" },
    { id: "plats", name: "Plats locaux", icon: "🍽️" },
    { id: "boissons", name: "Boissons", icon: "🥤" },
    { id: "desserts", name: "Desserts", icon: "🍰" },
  ]

  const otherItems = [
    { id: "commandes", name: "Commandes", icon: "📋", badge: "5" },
    { id: "support", name: "Support", icon: "💬" },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🍴</span>
          <span className="logo-text">Al Barka</span>
        </div>
      </div>

      <div className="sidebar-menu">
        <div className="menu-section">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${activeCategory === item.id ? "active" : ""}`}
              onClick={() => setActiveCategory(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.name}</span>
            </div>
          ))}
        </div>

        <div className="menu-section">
          <div className="section-title">Autres</div>
          {otherItems.map((item) => (
            <div key={item.id} className="menu-item">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.name}</span>
              {item.badge && <span className="badge">{item.badge}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">👨‍🍳</div>
          <div className="user-info">
            <div className="user-name">Chef Al Barka</div>
            <div className="user-role">Gérant • En ligne</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
