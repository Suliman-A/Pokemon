import { Route, Router, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import './index.css'
import PokeDetails from './Pages/PokeDetails'

function App() {

  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokeDetails />} />
    </Routes>
  )
}

export default App
