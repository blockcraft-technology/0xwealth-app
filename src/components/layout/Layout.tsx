import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Briefcase, TrendingUp, RefreshCw, PiggyBank } from 'lucide-react'
import { RouteEnums } from '../../shared/enums/route.enums';

interface NavItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

export default function Layout() {
  const location = useLocation()
  const [active, setActive] = useState(location.pathname)

  const navItems: NavItem[] = [
    { name: 'Portfolio', icon: Briefcase, path: '/' },
    { name: 'Trade', icon: TrendingUp, path: RouteEnums.Trade },
    { name: 'DCA', icon: RefreshCw, path: RouteEnums.DCA },
    { name: 'Borrow', icon: PiggyBank, path: RouteEnums.Borrow },
  ]

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
      <nav className="bg-green-400 border-t border-green-200 pb-2">
        <ul className="flex justify-around">
          {navItems.map((item) => (
            <li key={item.name} className="flex-1">
              <Link
                to={item.path}
                className={`flex flex-col items-center py-2 ${
                  active === item.path ? 'text-white-800' : 'text-black-600'
                }`}
                onClick={() => setActive(item.path)}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}