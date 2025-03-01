import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (!formData.email.length > 0 || !formData.password.length > 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    
      login(formData, navigate);
  };

  return (
    <div className="min-h-screen flex">
      <div className="h-full flex justify-center my-auto w-1/2 bg-background-page">
        <div className="bg-background-card p-8 rounded-xl shadow-lg w-96 border border-purple-border">
          <h2 className="text-2xl font-montserrat font-bold text-indigo-primary text-center mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="w-full bg-white px-4 py-2 border border-purple-border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-primary font-opensans font-regular text-text-dark"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border bg-white border-purple-border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-primary font-opensans font-regular text-text-dark"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm font-montserrat font-medium text-indigo-primary hover:text-purple-hover"
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoggingIn || buttonDisabled || error.length > 0}
              className={`${
                buttonDisabled || isLoggingIn 
                  ? "cursor-not-allowed bg-gray-400"
                  : "cursor-pointer bg-purple-button hover:bg-purple-hover"
              } w-full text-text-light py-2 rounded-lg transition-colors duration-300 font-montserrat font-semibold`}
            >
              Login
            </button>
            <div className="text-center mt-4">
              <Link
                to="/sign-up"
                className="font-opensans font-regular text-text-dark text-sm"
              >
                Don't have an account?{" "}
              </Link>
              <Link
                to="/sign-up"
                className="font-montserrat font-medium text-indigo-primary text-sm hover:text-purple-hover"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="h-screen w-3/6 bg-contain">
        <img
          src="/images/chipimage.avif"
          alt="computer image"
          className="h-full rotate-[360deg]"
        />
      </div>
    </div>
  );
};

export default Login;
