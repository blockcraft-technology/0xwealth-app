import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { Borrow, Activities, InvestmentDetails, Portfolio, Lend } from './pages'
import { RouteEnums } from './shared/enums/route.enums'
import MiniKitProvider from './providers/minikit.provider'
import { ClientProvider } from './hooks/use-client'


function App() {
  return (
    <MiniKitProvider>
      <ClientProvider>
        <Router>
          <div className="font-['Montserrat',sans-serif]">
            <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Portfolio />} />
                  <Route path={RouteEnums.Lend} element={<Lend />} />
                  <Route path={`${RouteEnums.InvestmentDetails}/:id`} element={<InvestmentDetails />} />
                  <Route path={RouteEnums.Borrow} element={<Borrow />} />
                  <Route path={RouteEnums.Activities} element={<Activities />} />
                </Route>
            </Routes>
            </div>
        </Router>
      </ClientProvider>
    </MiniKitProvider>
  )
}

export default App