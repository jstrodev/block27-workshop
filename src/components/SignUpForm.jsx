import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit triggered");

    try {
      const response = await axios.post(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const result = response.data;
      if (result.token) {
        setToken(result.token);
      } else {
        setError("Failed to retrieve token.");
      }
    } catch (error) {
      // Handle errors from Axios
      setError(error.response?.data?.message || error.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

SignUpForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};
