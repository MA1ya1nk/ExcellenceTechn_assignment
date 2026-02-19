import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
   <section className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-100 flex flex-col items-center text-center px-4 py-16"
   style={{ background: "#0a1628" }}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />

  {/* HERO */}
  <h2 className="text-5xl font-extrabold leading-tight"
  style={{ color: "#00a8ff" }}>
    Secure Your Todo With Ease 🔐
  </h2>

  <p className="text-gray-600 max-w-xl mt-4 mb-10 text-lg"
  style={{ color: "#99ddff" }}>
    Store, manage and protect your todos in one secure place.
    Simple, fast and encrypted.
  </p>

  {/* BUTTONS */}
  <div className="flex gap-5 mb-16">
    <Link to="/signin">
      <button className="btn px-8 py-3 text-black rounded-xl shadow-md  transition duration-300"
      style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Get Started
      </button>
    </Link>

    {user && (
      <Link to="/todo">
        <button className="btn px-8 py-3 border border-gray-300 rounded-xl hover:bg-white hover:shadow-md hover:scale-105 transition duration-300">
          Your Todos
        </button>
      </Link>
    )}
  </div>

  {/* FEATURES */}
  <section className="max-w-6xl w-full grid md:grid-cols-3 gap-10">

    {/* CARD 1 */}
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
      <div className="text-3xl mb-4">🔐</div>
      <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
      <p className="text-gray-600">
        Your data is encrypted and protected with industry-level security.
      </p>
    </div>

    {/* CARD 2 */}
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
      <div className="text-3xl mb-4">⚡</div>
      <h3 className="text-xl font-semibold mb-2">Fast Access</h3>
      <p className="text-gray-600">
        Access your saved todos instantly anytime, anywhere.
      </p>
    </div>

    {/* CARD 3 */}
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
      <div className="text-3xl mb-4">📱</div>
      <h3 className="text-xl font-semibold mb-2">Multi-Device</h3>
      <p className="text-gray-600">
        Works beautifully across mobile, tablet and desktop devices.
      </p>
    </div>

  </section>

</section>

  )
}

export default Home