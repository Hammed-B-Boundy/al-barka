"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Trash2 } from "lucide-react" // <-- Ajouté pour l'icône de suppression

interface CartItem {
  id: number
  name: string
  weight: string
  price: string
  image: string
  quantity: number
  priceNumber: number
}

interface CartPageProps {
  cartItems: CartItem[]
  updateQuantity: (id: number, quantity: number) => void
  removeFromCart: (id: number) => void
  getTotalPrice: () => number
}

export default function CartPage({ cartItems, updateQuantity, removeFromCart, getTotalPrice }: CartPageProps) {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  })
  const [isOrdering, setIsOrdering] = useState(false)
  const { toast } = useToast()

  const handleOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir au moins votre nom et numéro de téléphone",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    if (cartItems.length === 0) {
      toast({
        title: "Panier vide",
        description: "Votre panier est vide !",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setIsOrdering(true)

    toast({
      title: "Préparation de la commande...",
      description: "Redirection vers WhatsApp en cours",
      duration: 2000,
    })

    // Formatage du message pour WhatsApp
    const orderMessage = `*NOUVELLE COMMANDE - AL BARKA*

*Client:* ${customerInfo.name}
*Telephone:* ${customerInfo.phone}
${customerInfo.address ? `*Adresse:* ${customerInfo.address}` : ""}

*COMMANDE:*
${cartItems
  .map((item) => `- ${item.name} x${item.quantity} = ${(item.priceNumber * item.quantity).toLocaleString()} FCFA`)
  .join("\n")}

*TOTAL: ${getTotalPrice().toLocaleString()} FCFA*

${customerInfo.notes ? `*Notes:* ${customerInfo.notes}` : ""}

*Commande passee le:* ${new Date().toLocaleString("fr-FR")}`

    // 🔧 REMPLACEZ CE NUMÉRO PAR VOTRE NUMÉRO WHATSAPP
    const restaurantWhatsApp = "22389502592" // ⚠️ CHANGEZ CE NUMÉRO !
    const whatsappUrl = `https://wa.me/${restaurantWhatsApp}?text=${encodeURIComponent(orderMessage)}`

    toast({
      title: "Redirection vers WhatsApp...",
      description: "Veuillez confirmer l'envoi de votre commande sur WhatsApp.",
      duration: 3000,
    })
    // Ouvrir WhatsApp avec le message
    window.open(whatsappUrl, "_blank")

    // Simuler un délai de traitement
    setTimeout(() => {
      // Réinitialiser le formulaire
      setCustomerInfo({ name: "", phone: "", address: "", notes: "" })
      setIsOrdering(false)

      toast({
        title: "Commande envoyée !",
        description: "Votre commande a été transmise vers WhatsApp. Nous vous contacterons bientôt.",
        duration: 4000,
      })
    }, 1500)
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex-1 p-8 bg-gray-50">
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <div className="text-8xl mb-6">🛒</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Votre panier est vide</h3>
          <p className="text-gray-600 text-lg">Ajoutez des plats délicieux à votre panier !</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Items du panier */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Articles dans votre panier</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="p-6 flex items-center gap-4 relative mb-4">
                {" "}
                {/* <-- Ajout de relative et mb-4 */}
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.weight}</p>
                  <p className="text-red-500 font-semibold">{item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-semibold"
                  >
                    -
                  </button>

                  <span className="w-8 text-center font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white font-semibold"
                  >
                    +
                  </button>
                </div>
                <div className="text-right min-w-[100px]">
                  <p className="font-semibold text-gray-800">
                    {(item.priceNumber * item.quantity).toLocaleString()} FCFA
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2" // <-- Positionnement absolu
                  title="Supprimer"
                >
                  <Trash2 className="h-5 w-5" /> {/* <-- Icône de suppression */}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Informations de livraison */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Informations de livraison</h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  id="name"
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  placeholder="Votre nom"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  placeholder="Votre numéro"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse de livraison
              </label>
              <input
                id="address"
                type="text"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                placeholder="Votre adresse"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes spéciales
              </label>
              <textarea
                id="notes"
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                placeholder="Instructions particulières..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Résumé de la commande */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Résumé de la commande</h2>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Nombre d'articles:</span>
              <span className="font-semibold">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
            </div>

            <div className="flex justify-between items-center mb-6 text-xl">
              <span className="font-semibold text-gray-800">Total:</span>
              <span className="font-bold text-red-500">{getTotalPrice().toLocaleString()} FCFA</span>
            </div>

            <button
              onClick={handleOrder}
              disabled={isOrdering}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              {isOrdering ? "Envoi en cours..." : "Confirmer la commande"}
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              Livraison gratuite à Ouagadougou • Paiement à la livraison
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
