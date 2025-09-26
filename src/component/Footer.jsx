import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "../assets/logo-rr.webp";
import google from "../assets/google.webp";
import apple from "../assets/apple.webp";

const Footer = () => {
  return (
    <div className="bg-[#161616] text-white ">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-semibold">
              {/* School Info Section */}
              <div className="space-y-4">
                <img src={logo} alt="logo" />

                <div className="space-y-2 text-gray-100 text-sm">
                  <p>Westplein 12-14</p>
                  <p>3016 BM Rotterdam</p>
                  <p>The Netherlands</p>
                </div>

                <p className="text-gray-100 text-sm">+31(0)10 307 2137</p>

                {/* Social Media Icons */}
                <div className="flex space-x-3 pt-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <a
                      href="https://www.facebook.com/profile.php?id=61558624776513&_rdc=1&_rdr"
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a>
                    <Facebook
                      className="w-5 h-5 text-blue-400"
                      fill="currentColor"
                    />
                  </div>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <a
                      href="https://rsbpp.nl/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter
                        className="w-5 h-5 text-blue-400"
                        fill="currentColor"
                      />
                    </a>
                  </div>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <a
                      href="https://www.linkedin.com/company/rottedam-school-of-business-public-policy/about/?viewAsMember=true"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin
                        className="w-5 h-5 text-blue-400"
                        fill="currentColor"
                      />
                    </a>
                  </div>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <a
                      href="https://rsbpp.nl/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-5 h-5 text-blue-400" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Main Navigation */}
              <div>
                <h4 className="text-white font-semibold text-xl mb-6">
                  Main Navigation
                </h4>
                <ul className="space-y-3 text-gray-100 text-base">
                  <li>
                    <a
                      href="https://rsbpp.nl/"
                      className="hover:text-white transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://rsbpp.nl/index.php/about-us/"
                      className="hover:text-white transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://rsbpp.nl/index.php/programmes/"
                      className="hover:text-white transition-colors"
                    >
                      Programmes
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://rsbpp.nl/"
                      className="hover:text-white transition-colors"
                    >
                      News & Events
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://rsbpp.nl/index.php/contact-us/"
                      className="hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://rsbpp.nl/index.php/faculty-of-business-communication-and-finance/"
                      className="hover:text-white transition-colors"
                    >
                      Faculties
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://rsbpp.nl/index.php/certifications/"
                      className="hover:text-white transition-colors"
                    >
                      Certifications
                    </a>
                  </li>
                </ul>
              </div>

              {/* Information Center */}
              <div>
                <h4 className="text-white font-semibold text-xl mb-6">
                  Information Center
                </h4>
                <ul className="space-y-3 text-gray-100 text-base">
                  <li>
                    <a
                      href="https://rsbpp.nl/index.php/how-to-register/"
                      className="hover:text-white transition-colors"
                    >
                      How to Register
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://rsbpp.nl/"
                      className="hover:text-white transition-colors"
                    >
                      Support & Guidance
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://rsbpp.nl/"
                      className="hover:text-white transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              {/* Now Available */}
              <div>
                <h4 className="text-white font-semibold text-xl mb-6">
                  Now Available
                </h4>
                <div className="space-y-3">
                  <a
                    href="https://rsbpp.nl/"
                    className="hover:text-white transition-colors"
                  >
                    <img src={apple} alt="apple-logo" />
                  </a>
                  <a
                    href="https://rsbpp.nl/"
                    className="hover:text-white transition-colors"
                  >
                    <img src={google} alt="google-logo" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white">
        {/* Bottom copyright section */}
        <div className=" mx-auto max-w-7xl px-6 py-8">
          <div className="max-w-7xl font-black mx-auto flex flex-col md:flex-row justify-between items-center text-sm md:text-base text-gray-700">
            <div>Copyright © 2024 RSBPP. All rights reserved.</div>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="#" className="hover:underline transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="hover:underline transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
