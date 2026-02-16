import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission logic here
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('username', username);
            formData.append('password', password);
             const response = await api.post("/users/register", {
                  email,
                  password,
                  username
});
            console.log('User signed up successfully:', response.data);
            navigate('/login');
        } catch (error) {
            const msg = error.response?.data?.message || "Something went wrong";
        }
    }
      return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-[400px] h-auto bg-white border-2 border-gray-300 rounded-xl shadow-lg">

    <div className="text-center text-3xl py-6 font-semibold border-b">
      Sign In your account
    </div>

    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 p-8">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative w-full">
              <input
                
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


        <button
          type="submit"
          className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
        >
          Sign In
        </button>

      </div>
      <div className="text-center text-sm pb-2">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login"
            
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              
              </Link>
            </div>

    </form>

  </div>
</div>

  
  )
}

export default SignIn