import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer footer-center bg-indigo-dark text-text-light p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ARSHAD ALI
            Industries Ltd
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
