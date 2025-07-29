import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
const RoutesApp = () => (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
)

export default RoutesApp
