import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async(e: FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:3000/api/auth/signup",{username:name,email:email,password:password});
      if(res.status===201){ 
        navigate("/home");
      }
    }catch(e){
      console.error("Login failed",e);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg">
        <h1 className="text-center text-4xl font-extrabold text-gray-800">Sign Up</h1>
        <p className="mt-2 mb-8 text-center text-sm text-gray-600">
          Sign up to create your account and join us!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="mb-1 font-medium text-gray-700">Full Name</p>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-base outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <p className="mb-1 font-medium text-gray-700">Email Address</p>
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

          <div>
            <p className="mb-1 font-medium text-gray-700">Confirm Password</p>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-base outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gray-800 py-3 font-medium text-white transition duration-200 hover:bg-black"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-600 transition-colors duration-200 hover:text-black"
          >
            Already have an account? Login here
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
