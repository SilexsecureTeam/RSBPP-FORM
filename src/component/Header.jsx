import React, { useState, useRef, useEffect } from "react";
import { Menu, X, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-r.svg";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // track open dropdowns
  const [subDropdown, setSubDropdown] = useState(null); // for nested dropdowns
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setSubDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "Home", to: "https://rsbpp.nl/" },
    {
      label: "About Us",
      items: [
        { label: "Who We Are", to: "https://rsbpp.nl/index.php/about-us/" },
        {
          label: "Mission/Vision",
          to: "https://rsbpp.nl/index.php/mission-statement/",
        },
        {
          label: "Our Leadership",
          items: [
            {
              label: "Advisory Board",
              to: "https://rsbpp.nl/index.php/advisory-board/",
            },
            {
              label: "Dean’s Message",
              to: "https://rsbpp.nl/index.php/deans-messade/",
            },
          ],
        },
        { label: "Contact Us", to: "https://rsbpp.nl/index.php/contact-us/" },
      ],
    },
    {
      label: "Programmes",
      items: [
        {
          label: "Executive Education",
          to: "https://rsbpp.nl/index.php/executive-education-programmes/",
        },
        {
          label: "Online Programmes",
          to: "https://rsbpp.nl/index.php/online-programmes/",
        },
        {
          label: "Certifications",
          to: "https://rsbpp.nl/index.php/certifications/",
        },
      ],
    },
    {
      label: "Faculties",
      items: [
        {
          label: "Faculty of Business, Communication and Finance",
          to: "https://rsbpp.nl/index.php/faculty-of-business-communication-and-finance/",
        },
        {
          label: "Faculty of Good Governance, and Public Policy",
          to: "https://rsbpp.nl/index.php/faculty-of-good-governance/",
        },
        {
          label: "Faculty of Data Science and Artificial Intelligence",
          to: "https://rsbpp.nl/",
        },
      ],
    },
    { label: "News & Events", to: "https://rsbpp.nl/" },
    { label: "Support and Guidance", to: "https://rsbpp.nl/" },
    {
      label: "Downloads",
      items: [
        {
          label: "2025 Course Brochure",
          to: "https://rsbpp.nl/wp-content/uploads/2024/06/RSBPP-BROCHURE-24-25-V5-v2.1_compressed.pdf",
        },
      ],
    },
  ];

  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#080909]">
          <Link to="/">
            <img src={logo} alt="logo" className="h-15" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav
          ref={dropdownRef}
          className="hidden md:flex items-center gap-4 font-medium text-black uppercase "
        >
          {navLinks.map((link, i) =>
            link.items ? (
              <div key={i} className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                  className="flex items-center cursor-pointer gap-1 hover:text-[#8B0002] uppercase whitespace-nowrap"
                >
                  {link.label}
                  <Plus size={14} />
                </button>
                <div
                  className={`absolute left-0 mt-2 bg-[#fdfbfb] text-xs font-semibold uppercase shadow-lg rounded-lg min-w-[12rem] max-w-[16rem] z-[100] transition-opacity duration-200 ease-in-out ${
                    openDropdown === i
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  {link.items.map((item, j) =>
                    item.items ? (
                      <div key={j} className="relative">
                        <button
                          onClick={() =>
                            setSubDropdown(subDropdown === j ? null : j)
                          }
                          className="flex justify-between text-xs w-full uppercase px-4 py-2 text-left hover:bg-gray-50"
                        >
                          {item.label} <Plus size={14} />
                        </button>
                        <div
                          className={`absolute top-0 left-[100%] ml-1 bg-[#fdfbfb] shadow-lg rounded-lg min-w-[12rem] max-w-[16rem] z-[100] transition-opacity duration-200 uppercase ease-in-out ${
                            subDropdown === j
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none"
                          }`}
                        >
                          {item.items.map((sub, k) => (
                            <Link
                              key={k}
                              to={sub.to}
                              className="block px-4 py-2 uppercase hover:bg-gray-50"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={j}
                        to={item.to}
                        className="block px-4 py-2 uppercase hover:bg-gray-50"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ) : (
              <Link
                key={i}
                to={link.to}
                className="hover:text-[#8B0002] uppercase whitespace-nowrap"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden bg-[#8B0002] uppercase text-white p-2 rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav with slide in/out */}
      <div
        className={`fixed top-0 left-0 h-full uppercase w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[100] ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 py-4 space-y-2 uppercase font-medium text-black mt-12">
          {navLinks.map((link, i) =>
            link.items ? (
              <div key={i} className="border-b pb-2">
                <button
                  onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                  className="flex items-center uppercase justify-between w-full hover:text-[#8B0002]"
                >
                  {link.label} <Plus size={14} />
                </button>
                <div
                  className={`pl-4 mt-2 space-y-1 uppercase transition-all duration-300 ease-in-out ${
                    openDropdown === i
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {link.items.map((item, j) =>
                    item.items ? (
                      <div key={j}>
                        <button
                          onClick={() =>
                            setSubDropdown(subDropdown === j ? null : j)
                          }
                          className="flex items-center uppercase justify-between w-full hover:text-[#8B0002]"
                        >
                          {item.label} <Plus size={14} />
                        </button>
                        <div
                          className={`pl-4 mt-1 space-y-1 uppercase transition-all duration-300 ease-in-out ${
                            subDropdown === j
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0 overflow-hidden"
                          }`}
                        >
                          {item.items.map((sub, k) => (
                            <Link
                              key={k}
                              to={sub.to}
                              className="block hover:text-[#8B0002] uppercase"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={j}
                        to={item.to}
                        className="block hover:text-[#8B0002] uppercase"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ) : (
              <Link
                key={i}
                to={link.to}
                className="block hover:text-[#8B0002] uppercase border-b pb-2"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
