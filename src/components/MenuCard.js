const MenuCard = ({ item }) => {
  return (
    <div className="menu-card">
      <div className="card-image">
        <img src={item.image || "/placeholder.svg"} alt={item.name} />
      </div>
      <div className="card-content">
        <h3 className="card-title">{item.name}</h3>
        <p className="card-weight">{item.weight}</p>
        <div className="card-price">{item.price}</div>
      </div>
    </div>
  )
}

export default MenuCard
