import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="flex flex-col items-center text-center mt-20 px-4">
        <h2 className="text-4xl font-bold mb-4">
          Secure Your Passwords With Ease 🔐
        </h2>

        <p className="text-gray-600 max-w-xl mb-8">
          Store, manage and protect your passwords in one secure place.
          Simple, fast and encrypted.
        </p>

        <div className="flex gap-4">
            <Link to="signin">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Get Started
          </button>
          </Link>
 
          {/* <Link to="features">
          <button className="px-6 py-3 border rounded-lg hover:bg-gray-100">
            Explore
          </button>
          </Link> */}
        </div>
      </section>
  )
}

export default Home