import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Attempting login with:", { email });

      const res = await axios.post("https://eventbooker.onrender.com/api/auth/login", {
        email,
        password,
      });

      console.log("Login response:", res.data);

      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);

        console.log("Token stored:", localStorage.getItem("token"));
        console.log("UserId stored:", localStorage.getItem("userId"));

        alert("Login Successful");
        navigate("/home"); // Changed from /landing to /home
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      console.error("Error response:", error.response?.data);

      const errorMessage =
        error.response?.data?.message ||
        "Login Failed. Please check your credentials and try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-10 shadow-lg">
        <h1 className="text-center text-4xl font-extrabold text-gray-800 dark:text-white">
          Join Us
        </h1>
        <p className="mt-2 mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Welcome back! Please enter your details to log in to your account.
        </p>

        <div className="mb-8 flex justify-center gap-10">
          <FaGoogle className="text-3xl text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
          <FaFacebook className="text-3xl text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
          <FaInstagram className="text-3xl text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              Email
            </p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-3 text-base dark:text-white outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <p className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              Password
            </p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-3 text-base dark:text-white outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-800 dark:bg-blue-600 py-3 font-medium text-white transition duration-200 hover:bg-black dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/signup")}
            className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-black dark:hover:text-white"
          >
            New User? Sign Up here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
