import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const VerificationPage = () => {
  const navigate = useNavigate()
  const {verification, isVerifyingOtp} = useAuthStore()
  const [buttonDisabled, setbuttonDisabled] = useState(true)
  const [formData, setFormData] = useState({
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if(!formData.otp.length > 0){
      setbuttonDisabled(true)
    }else{
      setbuttonDisabled(false)
    }
  }, [formData])

  const handleSubmit = (e) => {
    e.preventDefault();
    verification(formData, navigate)
  };

  return (
    <div className="min-h-screen flex">
        
    <div className="min-h-full flex items-center w-1/2 justify-center bg-background-page">
      <div className="bg-background-card p-8 rounded-xl shadow-lg w-96 border border-purple-border">
        <h2 className="text-2xl font-montserrat font-bold text-indigo-primary text-center mb-6">Verification</h2>
        <p className="text-text-dark font-opensans font-regular text-center mb-4">Enter the verification code sent to your email</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="otp"
            placeholder="Verification Code"
            className="w-full px-4 bg-white py-2 border border-purple-border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-primary font-opensans font-regular text-text-dark"
            value={formData.otp}
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={isVerifyingOtp || buttonDisabled}
            className={`${buttonDisabled || isVerifyingOtp ? "cursor-not-allowed": "cursor-pointer"} w-full bg-purple-button hover:bg-purple-hover text-text-light py-2 rounded-lg transition-colors duration-300 font-montserrat font-semibold`}
          >
            Verify
          </button>
          <div className="text-center mt-4">
            <span className="font-opensans font-regular text-text-dark text-sm">Didn't receive a code? </span>
            <a href="#" className="font-montserrat font-medium text-indigo-primary text-sm hover:text-purple-hover">
              Resend
            </a>
          </div>
        </form>
      </div>
    </div>
    <div className='h-screen w-1/2 bg-contain '>
          <img src="/images/chipimage.avif" alt="computer image" className='h-full rotate-[360deg]' />
        </div>
    </div>
  );
};

export default VerificationPage;