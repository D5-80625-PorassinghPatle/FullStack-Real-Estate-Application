import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Define a functional component called SignUp
export default function SignUp() {
  // State variables for form data, error message, and loading state
  const [formData, setFormData] = useState({}); // To store form data
  const [error, setError] = useState(null); // To store error message
  const [loading, setLoading] = useState(false); // To track loading state

  // React Router hook for navigation
  const navigate = useNavigate();

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setLoading(true); // Set loading state to true
      // Make a POST request to the server with form data
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // Parse response data as JSON
      const data = await res.json();
      console.log(data); // Log response data to the console

      // If the response indicates failure, display error message
      if (data.success === false) {
        setLoading(false); // Set loading state to false
        setError(data.message); // Set error message
        return; // Exit function
      }

      setLoading(false); // Set loading state to false
      setError(null); // Clear any previous error messages
      navigate("/sign-in"); // Redirect to sign-in page upon successful sign-up
    } catch (error) {
      setLoading(false); // Set loading state to false
      setError(error.message); // Set error message
    }
  };

  // JSX code for rendering the sign-up form
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Input fields for username, email, and password */}
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        {/* Submit button with conditional text based on loading state */}
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      {/* Link to sign-in page */}
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>

      {/* Display error message if there's an error */}
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
