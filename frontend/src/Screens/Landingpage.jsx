import React, { useEffect, useState } from 'react'
//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbardesktop from '../Components/Navbar-desktop.jsx'
import Heroarea from '../Components/Heroarea.jsx' 
import Categories from '../Components/Categories.jsx'

import Bestsellers from '../Components/Bestsellers.jsx'
import Footer from '../Components/Footer.jsx'
import { Link } from 'react-router-dom'
import CustomerReviews from '../Components/CustomerReviews.jsx'
import Faqs from '../Components/Faqs.jsx'
import Productcards from '../Components/Productcards.jsx'
import Pc_Promo_banner from "../Components/Pc_Promo_banner";
import VedioHero from '../Components/VedioHero.jsx'
{/*import Navbar from '../Components/Navbar'*/ }

const Landingpage = () => {
  
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [shoesData, setShoesData] = useState([])
  const [clothsData, setclothsData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userData = localStorage.getItem("User")
        if (userData) {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        }

        // Try to load cached data first
        const cachedShoes = localStorage.getItem("shoesData")
        const cachedCloths = localStorage.getItem("clothsData")

        let shoes = null
        let cloths = null

        if (cachedShoes) {
          try {
            shoes = JSON.parse(cachedShoes)
            setShoesData(shoes)
          } catch (_) {}
        }

        if (cachedCloths) {
          try {
            cloths = JSON.parse(cachedCloths)
            setclothsData(cloths)
          } catch (_) {}
        }

        const fetchPromises = []

        if (!shoes) {
          const shoesPromise = (async () => {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/shoes`)
            if (!response.ok) {
              throw new Error('Failed to fetch shoes data')
            }
            const data = await response.json()
            const payload = data?.data ?? []
            setShoesData(payload)
            try { localStorage.setItem('shoesData', JSON.stringify(payload)) } catch (_) {}
          })()
          fetchPromises.push(shoesPromise)
        }

        if (!cloths) {
          const clothsPromise = (async () => {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cloths`)
            if (!response.ok) {
              throw new Error('Failed to fetch cloths data')
            }
            const data = await response.json()
            const payload = data?.data ?? []
            setclothsData(payload)
            try { localStorage.setItem('clothsData', JSON.stringify(payload)) } catch (_) {}
          })()
          fetchPromises.push(clothsPromise)
        }

        if (fetchPromises.length) {
          await Promise.all(fetchPromises)
        }
      } catch (err) {
        setError(err.message)
        console.error("Error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #F8F7FF 0%, #E8E2F4 100%)',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #E8E2F4',
          borderTop: '4px solid #7E57C2',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{
          color: '#7E57C2',
          fontSize: '1.2rem',
          fontWeight: '600',
          fontFamily: 'Poppins, sans-serif'
        }}>Loading...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #F8F7FF 0%, #E8E2F4 100%)',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          fontSize: '3rem',
          color: '#F44336',
          marginBottom: '1rem'
        }}>⚠️</div>
        <p style={{
          color: '#F44336',
          fontSize: '1.2rem',
          fontWeight: '600',
          fontFamily: 'Poppins, sans-serif',
          textAlign: 'center',
          maxWidth: '400px'
        }}>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '0.8rem 1.5rem',
            background: 'linear-gradient(135deg, #7E57C2 0%, #5E35B1 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(126, 87, 194, 0.2)'
          }}
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div style={{
        backgroundColor: 'white',
        fontFamily: 'Roboto, sans-serif',
      }}
>
      <Navbardesktop data={[...clothsData,...shoesData]} />
      <Heroarea />
     <Categories />


     
        <Pc_Promo_banner />
      <Productcards Data={clothsData} category="cloths"  />
      
<VedioHero/>

      <Productcards Data={shoesData} category="shoes"  />
     
        <Faqs/>
  <CustomerReviews/>
    <console className="log">gyjuhygjhg</console>

      <Footer/>
    </div>
    //end of page
  )
}

export default Landingpage