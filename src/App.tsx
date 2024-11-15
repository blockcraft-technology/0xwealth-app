import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { Borrow, DCA, Portfolio, Trade } from './pages'
import { RouteEnums } from './shared/enums/route.enums'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Portfolio />} />
          <Route path={RouteEnums.Trade} element={<Trade />} />
          <Route path={RouteEnums.DCA} element={<DCA />} />
          <Route path={RouteEnums.Borrow} element={<Borrow />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App