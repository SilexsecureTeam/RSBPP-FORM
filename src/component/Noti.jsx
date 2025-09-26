import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
// import { FaInstagram } from "react-icons/fa";

const Noti = () => {
  return (
    <div className="bg-[#8B0002] text-white text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-2 gap-2">
        {/* Left Section - Phone & Email */}
        <div className="flex flex-wrap sm:items-center font-semibold  text-lg gap-2">
          <div className="flex items-center gap-1">
            <span>+31(0)10 307 2137</span>
          </div>
          <div className="flex items-center gap-1">
            <span>info@rsbpp.nl</span>
          </div>
        </div>

        {/* Right Section - Social Icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-200 transition">
            <Facebook size={18} fill="white" />
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            <Twitter size={18} fill="white" />
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            <Linkedin size={18} fill="white" />
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            <Instagram size={18} className="text-white" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Noti;
