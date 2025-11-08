import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Login() {
  const [email, setEmail  ] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e: FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:3000/api/auth/login",{email,password});
      if(res.status===200){ 
        alert("Login Successful");
        navigate("/home");
      }
    }catch(e){
      console.error("Login failed",e);
      alert("Login Failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg">
        <h1 className="text-center text-4xl font-extrabold text-gray-800">Join Us</h1>
        <p className="mt-2 mb-6 text-center text-sm text-gray-600">
          Welcome back! Please enter your details to log in to your account.
        </p>

        <div className="mb-8 flex justify-center gap-10">
          <FaGoogle className="text-3xl text-gray-600 hover:text-blue-500 cursor-pointer transition-colors" />
          <FaFacebook className="text-3xl text-gray-600 hover:text-blue-500 cursor-pointer transition-colors" />
          <FaInstagram className="text-3xl text-gray-600 hover:text-blue-500 cursor-pointer transition-colors" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="mb-1 font-medium text-gray-700">Email</p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-base outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <p className="mb-1 font-medium text-gray-700">Password</p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-base outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gray-800 py-3 font-medium text-white transition duration-200 hover:bg-black"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/signup")}
            className="text-sm text-gray-600 transition-colors duration-200 hover:text-black"
          >
            New User? Sign Up here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
