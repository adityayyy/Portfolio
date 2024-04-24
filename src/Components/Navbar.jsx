import logo from "../assets/ag.png";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import React from 'react';

const redirectToGithub = () => {
  window.location.href = 'https://www.github.com/adityayyy';
};
const redirectToInstagram = () => {
  window.location.href = 'https://www.instagram.com/adit_yayy_';
};
const redirectToTwitterX = () => {
  window.location.href = 'https://twitter.com/adit_yayy';
};
const Navbar = () => {
  return (
    <nav className='mb-20 flex items-center justify-between py-6'>
      <div className='flex flex-shrink-0 items-center'>
        <img className="mx-2 w-10" src={logo} alt="" />
      </div>
      <div className="m-8 cursor-pointer flex items-center justify-center gap-6 text-2xl">
        <FaGithub onClick={redirectToGithub} />
        <FaInstagram onClick={redirectToInstagram} />
        <FaXTwitter onClick={redirectToTwitterX}/>
      </div>
    </nav>
  );
}

export default Navbar;
