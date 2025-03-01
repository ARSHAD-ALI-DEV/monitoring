import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const SignUp = () => {
  const navigate = useNavigate()
  const {signup, isSigningUp} = useAuthStore()
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [avataPre, setAvataPre] = useState();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
  });

  useEffect(() => {
   if(!formData.username.length > 0 || !formData.email.length > 0 || !formData.password.length > 0 ||!formData.avatar ){
    setButtonDisabled(true)
   }else{
    setButtonDisabled(false)
   }
  }, [formData])
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("")

  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: file,
      });
      setAvataPre(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validMail = formData.email.split("@").pop();
    if (validMail === "gmail.com" || validMail === "outlook.com") {
    signup(formData, navigate)
  }else{
    setError("email only gmail or outlook")
  }
  };

  return (
    <div className="flex min-h-screen">
      <div className="full flex items-center justify-center w-1/2 bg-background-page">
        <div className="bg-background-card p-8 rounded-xl shadow-lg w-96 border border-purple-border">
          <h2 className="text-2xl text-indigo-primary font-montserrat font-bold text-center mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full px-4 bg-white py-2 border border-purple-border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-primary font-opensans font-regular text-text-dark"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 bg-white py-2 border border-purple-border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-primary font-opensans font-regular text-text-dark"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 bg-white py-2 border border-purple-border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-primary font-opensans font-regular text-text-dark"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="w-full border bg-white border-purple-border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-primary font-opensans font-regular text-text-dark"
                onChange={handleAvatarChange}
              />
              <label className="block text-xs font-montserrat font-medium text-indigo-primary mt-1 ml-1">
                Profile Picture
              </label>
            </div>
            {avataPre && (
              <div className="flex justify-center">
                <img
                  src={avataPre}
                  alt="Avatar Preview"
                  className="w-20 h-20 rounded-full border-2 border-indigo-primary object-cover"
                />
              </div>
            )}
            {error && (
              <p className="text-red-500 text-sm font-semibold">{error}</p>
            )}
            <button
            disabled={isSigningUp || buttonDisabled}
              type="submit"
              className={` ${isSigningUp || buttonDisabled || !error.length > 0 ? "cursor-not-allowed": "cursor-pointer"} w-full bg-purple-button hover:bg-purple-hover  text-text-light py-2 rounded-lg transition-colors duration-300 font-montserrat font-semibold`}
            >
              Sign Up
            </button>
            <div className="text-center mt-4">
              <Link
                to="/login"
                className="font-opensans font-regular text-text-dark text-sm"
              >
                Already have an account?{" "}
              </Link>
              <Link
                to="/login"
                href="#"
                className="font-montserrat font-medium text-indigo-primary text-sm hover:text-purple-hover"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
        <div className="h-screen w-1/2 bg-cover">
          <img
            src="/images/chipimage.avif"
            alt="computer image"
            className="h-full rotate-[360deg]"
          />
        </div>
    </div>
  );
};

export default SignUp;
