import FavoritesPage from '@pages/Favorites'
import HomePage from '@pages/Home'
import { Route, Routes } from 'react-router-dom'

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  )
}

export default RoutesApp
