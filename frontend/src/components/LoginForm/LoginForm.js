import { useState } from "react";
import { Notify } from "notiflix";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      let loginResponse = await result.json();
      if (loginResponse) {
        setEmail("");
        setPassword("");
        localStorage.setItem("authToken", loginResponse.data.token);
        localStorage.setItem("userEmail", loginResponse.data.user.email);
        navigate(`/home/${loginResponse.data.user._id}`, { replace: true });
      }
    } catch (error) {
      console.error(error);
      Notify.failure("Incorrect email or password.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" name="email" value={email} onChange={(e) => handleInputChange(e)} required />
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="password" value={password} onChange={(e) => handleInputChange(e)} required />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        If you don't have an account please <Link to="/register">click here to register</Link>
      </p>
    </div>
  );
};
