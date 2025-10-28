import { useState, type ChangeEvent, type FormEvent } from "react";
import "./Login.css";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email : ", email);
    console.log("password : ", password);
    alert("Sign Up Successful");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Join Us</h1>
        <p className="login-description">
          Welcome back! Please enter your details to log in to your account.
        </p>
        <div className="Logos">
          <FaGoogle className="google-icon" />
          <FaFacebook className="google-icon" />
          <FaInstagram className="google-icon" />
        </div>
        <form onSubmit={handleSubmit}>
          <p>Email</p>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="input-group">
            <p>Password</p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="new-user">
          <a onClick={() => navigate("/signup")}>
            New User? Sign Up here
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
