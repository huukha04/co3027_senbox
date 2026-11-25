import { Link } from "react-router-dom"

const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "Pet Box", href: "/pet-profile" },
      { label: "Food & Treats", href: "/shop/food-treats" },
      { label: "Toys & Accessories", href: "/shop/accessories" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping & Returns", href: "/support/shipping" },
      { label: "Track Order", href: "/account/orders/SB-10281" },
      { label: "Contact Us", href: "/support/contact" },
    ],
  },
]

export default function CustomerFooter() {
  return (
    <footer className="bg-[#263238] text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Link to="/" className="text-sm font-bold text-[#fb4b1f]">
            SENBOX
          </Link>
          <p className="mt-2 text-xs leading-5 text-slate-300">
            Personalized boxes and trusted pet care products.
          </p>
          <p className="mt-2 text-xs">Hotline: 1900 8868</p>
        </div>

        {footerGroups.map(({ title, links }) => (
          <div key={title}>
            <h2 className="text-xs font-bold uppercase text-white">{title}</h2>
            <ul className="mt-3 space-y-2">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-xs text-slate-300 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-xs font-bold uppercase text-white">Trust & Payment</h2>
          <ul className="mt-3 space-y-2 text-xs text-slate-300">
            <li>✓ Secure checkout</li>
            <li>✓ Authentic products</li>
            <li>VISA · MASTERCARD · COD</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-slate-600 px-4 py-4 text-[11px] text-slate-400 sm:px-6">
        © 2026 SenBox. Marketplace for happier pets.
      </div>
    </footer>
  )
}