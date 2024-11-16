import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Briefcase, TrendingUp, PiggyBank, Activity } from 'lucide-react'
import { RouteEnums } from '../../shared/enums/route.enums'

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
    { name: 'Lend', icon: TrendingUp, path: RouteEnums.Lend },
    { name: 'Borrow', icon: PiggyBank, path: RouteEnums.Borrow },
    { name: 'Activities', icon: Activity, path: RouteEnums.Activities },
  ]

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <nav className="bg-gray-800 border-t border-gray-700 pb-2">
        <ul className="flex justify-around">
          {navItems.map((item) => (
            <li key={item.name} className="flex-1">
              <Link
                to={item.path}
                className={`flex flex-col items-center py-2 transition-colors duration-200 ${
                  active === item.path ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300'
                }`}
                onClick={() => setActive(item.path)}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
              {active === item.path && (
                <div className="h-1 w-1/2 bg-yellow-400 rounded-full mx-auto mt-1"></div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}