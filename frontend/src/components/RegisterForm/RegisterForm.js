import { Notify } from "notiflix";
import { useState } from "react";

export const RegisterForm = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    if (name === "login") {
      setLogin(value);
    }

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Notify.failure("Passwords do not match");
    }
    try {
      let result = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        body: JSON.stringify({ login, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result) {
        setLogin("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Login</p>
          <input type="text" name="login" value={login} onChange={(e) => handleInputChange(e)} required />
        </label>
        <label>
          <p>Email</p>
          <input type="text" name="email" value={email} onChange={(e) => handleInputChange(e)} required />
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="password" value={password} onChange={(e) => handleInputChange(e)} required />
        </label>
        <label>
          <p>Confirm password</p>
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => handleInputChange(e)} required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
