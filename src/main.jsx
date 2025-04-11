import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MyCart } from './Context/MyCart.jsx'

createRoot(document.getElementById('root')).render(
    <MyCart>
    <App />
    </MyCart>
)
