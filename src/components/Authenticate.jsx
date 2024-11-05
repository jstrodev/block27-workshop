import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      const response = await axios.get(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;
      setSuccessMessage(result.message);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  }

  return (
    <div>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}

Authenticate.propTypes = {
  token: PropTypes.string.isRequired,
};
