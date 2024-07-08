import React from 'react';

const BurgerButton = ({ isOpen, setIsOpen }) => (
  <div className="lg:hidden">
    <button
      className="navbar-burger flex items-center p-3"
      onClick={() => setIsOpen(!isOpen)}
    >
      <svg
        className="block h-8 w-8 fill-current"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
      </svg>
    </button>
  </div>
);

export default BurgerButton;
