import { useState, type ChangeEvent, type FormEvent } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email : ", email);
    console.log("password : ", password);
    alert("Login Successful");
  };
  return (
    <div>
      <div className="login-container">
        <div className="login-form">
          <h1 className="login-title">Sign Up</h1>
          <p className="login-description">
            Sign Up to create your account and join us!
          </p>
          <form onSubmit={handleSubmit}>
            <p>Full Name</p>
            <div className="input-group">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>

            <div className="input-group">
              <p>Email Address</p>
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

            <div className="input-group">
              <p>Confirm Password</p>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Create Account
            </button>
          </form>

          <div className="new-user">
            <a onClick={() => navigate("/")}>Login Here</a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;