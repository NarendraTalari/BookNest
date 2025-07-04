import React from 'react'
import Unavbar from './Unavbar'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Footer from '../Componenets/Footer'

const Uhome = () => {
  const navigate = useNavigate()
  const products = () => {
    navigate('/uproducts')
  }
  return (
    <div className="bg-amazon-gray">
      <Unavbar />
      {/* Modern Amazon-style Welcome Message */}
      <div className="bg-amazon-lightblue py-8 flex flex-col items-center shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amazon-yellow mb-2 drop-shadow-lg text-center">Welcome to BookStore!</h1>
        <p className="text-lg md:text-2xl text-amazon-gray max-w-2xl text-center mb-2">Your one-stop shop for bestsellers, top recommendations, and more. Discover your next great read with an Amazon-inspired experience!</p>
        <div className="h-1 w-24 bg-amazon-yellow rounded-full mb-2"></div>
      </div>
      <section className="py-10">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-amazon-darkblue mb-8">Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center px-4">
          {/* Card 1 */}
          <Card className="shadow-lg rounded-xl overflow-hidden bg-white hover:scale-105 transition-transform duration-300">
            <Link to='/uproducts' className="block h-64 overflow-hidden relative">
              <Card.Img 
                variant="top" 
                src="/1984 by George Orwell.jpeg" 
                className="object-contain w-full h-full absolute top-0 left-0" 
                onError={(e) => { e.target.src = `https://via.placeholder.com/250x350?text=1984`; }}
              />
            </Link>
            <Card.Body>
              <Card.Title className='text-center text-amazon-darkblue font-semibold'>1984</Card.Title>
            </Card.Body>
          </Card>
          {/* Card 2 */}
          <Card className="shadow-lg rounded-xl overflow-hidden bg-white hover:scale-105 transition-transform duration-300">
            <Link to='/uproducts' className="block h-64 overflow-hidden relative">
              <Card.Img 
                variant="top" 
                src="/Atomic Habits.jpeg" 
                className="object-contain w-full h-full absolute top-0 left-0" 
                onError={(e) => { e.target.src = `https://via.placeholder.com/250x350?text=Atomic%20Habits`; }}
              />
            </Link>
            <Card.Body>
              <Card.Title className='text-center text-amazon-darkblue font-semibold'>ATOMIC HABITS</Card.Title>
            </Card.Body>
          </Card>
          {/* Card 3 */}
          <Card className="shadow-lg rounded-xl overflow-hidden bg-white hover:scale-105 transition-transform duration-300">
            <Link to='/uproducts' className="block h-64 overflow-hidden relative">
              <Card.Img 
                variant="top" 
                src="/A Thousand Splendid Suns.jpeg" 
                className="object-contain w-full h-full absolute top-0 left-0" 
                onError={(e) => { e.target.src = `https://via.placeholder.com/250x350?text=A%20Thousand%20Splendid%20Suns`; }}
              />
            </Link>
            <Card.Body>
              <Card.Title className='text-center text-amazon-darkblue font-semibold'>A THOUSAND SPLENDID SUNS</Card.Title>
            </Card.Body>
          </Card>
          {/* Card 4 */}
          <Card className="shadow-lg rounded-xl overflow-hidden bg-white hover:scale-105 transition-transform duration-300">
            <Link to='/uproducts' className="block h-64 overflow-hidden relative">
              <Card.Img 
                variant="top" 
                src="/Educated.jpeg" 
                className="object-contain w-full h-full absolute top-0 left-0" 
                onError={(e) => { e.target.src = `https://via.placeholder.com/250x350?text=Educated`; }}
              />
            </Link>
            <Card.Body>
              <Card.Title className='text-center text-amazon-darkblue font-semibold'>EDUCATED</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </section>
      <section className="py-10 bg-amazon-lightblue">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-amazon-yellow mb-8">Top Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center px-4">
          {/* Card 1 */}
          <Card className="shadow-lg rounded-xl overflow-hidden bg-white hover:scale-105 transition-transform duration-300">
            <Link to='/uproducts' className="block h-64 overflow-hidden relative">
              <Card.Img 
                variant="top" 
                src="/harry potter and the philosopher's stone.jpg" 
                className="object-contain w-full h-full absolute top-0 left-0" 
                onError={(e) => { e.target.src = `https://via.placeholder.com/250x350?text=Harry%20Potter`; }}
              />
            </Link>
            <Card.Body>
              <Card.Title className='text-center text-amazon-darkblue font-semibold'>HARRY POTTER</Card.Title>
            </Card.Body>
          </Card>
          {/* Card 2 */}
          <Card className="shadow-lg rounded-xl overflow-hidden bg-white hover:scale-105 transition-transform duration-300">
            <Link to='/uproducts' className="block h-64 overflow-hidden relative">
              <Card.Img 
                variant="top" 
                src="/Life of Pi.jpeg" 
                className="object-contain w-full h-full absolute top-0 left-0" 
                onError={(e) => { e.target.src = `https://via.placeholder.com/250x350?text=Life%20of%20Pi`; }}
              />
            </Link>
            <Card.Body>
              <Card.Title className='text-center text-amazon-darkblue font-semibold'>LIFE OF PI</Card.Title>
            </Card.Body>
          </Card>
          {/* Card 3 */}
          <Card className="shadow-lg rounded-xl overflow-hidden bg-white hover:scale-105 transition-transform duration-300">
            <Link to='/uproducts' className="block h-64 overflow-hidden relative">
              <Card.Img 
                variant="top" 
                src="/Gone Girl.jpeg" 
                className="object-contain w-full h-full absolute top-0 left-0" 
                onError={(e) => { e.target.src = `https://via.placeholder.com/250x350?text=Gone%20Girl`; }}
              />
            </Link>
            <Card.Body>
              <Card.Title className='text-center text-amazon-darkblue font-semibold'>GONE GIRL</Card.Title>
            </Card.Body>
          </Card>
          {/* Card 4 */}
          <Card className="shadow-lg rounded-xl overflow-hidden bg-white hover:scale-105 transition-transform duration-300">
            <Link to='/uproducts' className="block h-64 overflow-hidden relative">
              <Card.Img 
                variant="top" 
                src="/it Ends With Us.jpeg" 
                className="object-contain w-full h-full absolute top-0 left-0" 
                onError={(e) => { e.target.src = `https://via.placeholder.com/250x350?text=It%20Ends%20With%20Us`; }}
              />
            </Link>
            <Card.Body>
              <Card.Title className='text-center text-amazon-darkblue font-semibold'>IT ENDS WITH US</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Uhome
