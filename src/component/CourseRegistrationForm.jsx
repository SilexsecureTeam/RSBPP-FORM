import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const CourseRegistrationForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    surname: "",
    othernames: "",
    organization: "",
    designation: "",
    country_of_registration: "",
    telephone: "",
    email: "",
    course_title: "",
    form_source: "rsbpp", // Note: May need to change to "messerand" if backend requires
  });

  // API and form states
  const [countries, setCountries] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries"
        );
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        const sortedCountries = data.data
          .map((country) => country.country)
          .sort((a, b) => a.localeCompare(b));
        setCountries(
          sortedCountries.map((country) => ({ value: country, label: country }))
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to load countries. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const response = await fetch("https://dash.rsbpp.nl/api/rsbpp-courses");
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        if (!data.success)
          throw new Error("API returned an unsuccessful response");
        const courseList = data.data.data.map((course) => course.course_name);
        if (courseList.length === 0) {
          toast.warn("No courses available at the moment.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
        setCourses(courseList);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load courses. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Handle react-select changes
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : "",
    });
    setErrors({ ...errors, [name]: "" });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.othernames) newErrors.othernames = "Other Names is required";
    if (!formData.organization)
      newErrors.organization = "Organisation is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.country_of_registration)
      newErrors.country_of_registration = "Country is required";
    if (!formData.telephone) newErrors.telephone = "Telephone is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.course_title)
      newErrors.course_title = "Course selection is required";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((error) => {
        toast.error(error, {
          position: "top-right",
          autoClose: 3000,
        });
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(
        "https://dash.rsbpp.nl/api/rsbpp-registration/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit registration");
      }

      await response.json();
      toast.success("Registration submitted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      // Navigate to success page with user name
      navigate("/success", {
        state: { name: `${formData.surname} ${formData.othernames}` },
      });
      setFormData({
        surname: "",
        othernames: "",
        organization: "",
        designation: "",
        country_of_registration: "",
        telephone: "",
        email: "",
        course_title: "",
        form_source: "rsbpp",
      });
      setErrors({});
    } catch (error) {
      toast.error(
        error.message || "An error occurred while submitting the form",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Custom styles for react-select
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      borderBottom: "1px solid #d1d5db",
      borderRadius: "0",
      padding: "0.25rem 0",
      boxShadow: "none",
      backgroundColor: state.isDisabled ? "#f3f4f6" : "white",
      "&:hover": {
        borderBottomColor: "#D40B0B",
      },
      "&:focus": {
        borderBottomColor: "#D40B0B",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#D40B0B"
        : state.isFocused
        ? "#fce4e4"
        : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "#fce4e4",
      },
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 1000,
      maxWidth: "100%",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "200px",
    }),
    input: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  return (
    <div className="py-15 px-4 w-full mx-auto">
      <div className="max-w-3xl mx-auto px-8 py-8 border-2 border-gray-300 rounded-lg bg-white">
        <h2 className="text-2xl font-semibold text-gray-700 uppercase mb-6 animate-fade-in">
          Course Registration Form
        </h2>
        {loadingCountries && (
          <p className="text-gray-500 text-sm animate-pulse flex items-center">
            <svg
              className="animate-spin h-4 w-4 mr-2 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Loading countries...
          </p>
        )}
        {loadingCourses && (
          <p className="text-gray-500 text-sm animate-pulse flex items-center">
            <svg
              className="animate-spin h-4 w-4 mr-2 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Loading courses...
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          {/* Surname */}
          <div className="relative">
            <input
              type="text"
              name="surname"
              id="surname"
              value={formData.surname}
              onChange={handleChange}
              className="block w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-b-[#D40B0B] outline-none bg-transparent transition duration-200 peer"
            />
            <label
              htmlFor="surname"
              className={`absolute left-0 top-2 text-gray-500 text-sm transition-all duration-200 transform origin-left peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#D40B0B] ${
                formData.surname ? "-translate-y-4 scale-75 text-[#D40B0B]" : ""
              }`}
            >
              Surname <span className="text-[#D40B0B]">*</span>
            </label>
            {errors.surname && (
              <p className="text-[#D40B0B] text-xs mt-1">{errors.surname}</p>
            )}
          </div>

          {/* Other Names */}
          <div className="relative">
            <input
              type="text"
              name="othernames"
              id="othernames"
              value={formData.othernames}
              onChange={handleChange}
              className="block w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-b-[#D40B0B] outline-none bg-transparent transition duration-200 peer"
            />
            <label
              htmlFor="othernames"
              className={`absolute left-0 top-2 text-gray-500 text-sm transition-all duration-200 transform origin-left peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#D40B0B] ${
                formData.othernames
                  ? "-translate-y-4 scale-75 text-[#D40B0B]"
                  : ""
              }`}
            >
              Other Names <span className="text-[#D40B0B]">*</span>
            </label>
            {errors.othernames && (
              <p className="text-[#D40B0B] text-xs mt-1">{errors.othernames}</p>
            )}
          </div>

          {/* Organisation */}
          <div className="relative">
            <input
              type="text"
              name="organization"
              id="organization"
              value={formData.organization}
              onChange={handleChange}
              className="block w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-b-[#D40B0B] outline-none bg-transparent transition duration-200 peer"
            />
            <label
              htmlFor="organization"
              className={`absolute left-0 top-2 text-gray-500 text-sm transition-all duration-200 transform origin-left peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#D40B0B] ${
                formData.organization
                  ? "-translate-y-4 scale-75 text-[#D40B0B]"
                  : ""
              }`}
            >
              Organisation <span className="text-[#D40B0B]">*</span>
            </label>
            {errors.organization && (
              <p className="text-[#D40B0B] text-xs mt-1">
                {errors.organization}
              </p>
            )}
          </div>

          {/* Designation */}
          <div className="relative">
            <input
              type="text"
              name="designation"
              id="designation"
              value={formData.designation}
              onChange={handleChange}
              className="block w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-b-[#D40B0B] outline-none bg-transparent transition duration-200 peer"
            />
            <label
              htmlFor="designation"
              className={`absolute left-0 top-2 text-gray-500 text-sm transition-all duration-200 transform origin-left peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#D40B0B] ${
                formData.designation
                  ? "-translate-y-4 scale-75 text-[#D40B0B]"
                  : ""
              }`}
            >
              Designation <span className="text-[#D40B0B]">*</span>
            </label>
            {errors.designation && (
              <p className="text-[#D40B0B] text-xs mt-1">
                {errors.designation}
              </p>
            )}
          </div>

          {/* Country of Registration */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country of Registration <span className="text-[#D40B0B]">*</span>
            </label>
            <Select
              name="country_of_registration"
              options={countries}
              value={
                countries.find(
                  (option) => option.value === formData.country_of_registration
                ) || null
              }
              onChange={(option) =>
                handleSelectChange(option, { name: "country_of_registration" })
              }
              placeholder="Select a country"
              isClearable
              isSearchable
              isDisabled={loadingCountries}
              styles={selectStyles}
              className="mt-1"
              menuPlacement="auto"
              autoFocus
            />
            {errors.country_of_registration && (
              <p className="text-[#D40B0B] text-xs mt-1">
                {errors.country_of_registration}
              </p>
            )}
          </div>

          {/* Telephone */}
          <div className="relative">
            <input
              type="tel"
              name="telephone"
              id="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="block w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-b-[#D40B0B] outline-none bg-transparent transition duration-200 peer"
            />
            <label
              htmlFor="telephone"
              className={`absolute left-0 top-2 text-gray-500 text-sm transition-all duration-200 transform origin-left peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#D40B0B] ${
                formData.telephone
                  ? "-translate-y-4 scale-75 text-[#D40B0B]"
                  : ""
              }`}
            >
              Telephone <span className="text-[#D40B0B]">*</span>
            </label>
            {errors.telephone && (
              <p className="text-[#D40B0B] text-xs mt-1">{errors.telephone}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-b-[#D40B0B] outline-none bg-transparent transition duration-200 peer"
            />
            <label
              htmlFor="email"
              className={`absolute left-0 top-2 text-gray-500 text-sm transition-all duration-200 transform origin-left peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#D40B0B] ${
                formData.email ? "-translate-y-4 scale-75 text-[#D40B0B]" : ""
              }`}
            >
              Email <span className="text-[#D40B0B]">*</span>
            </label>
            {errors.email && (
              <p className="text-[#D40B0B] text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Course Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select a Course <span className="text-[#D40B0B]">*</span>
            </label>
            <Select
              name="course_title"
              options={courses.map((course) => ({
                value: course,
                label: course,
              }))}
              value={
                courses.find((course) => course === formData.course_title)
                  ? {
                      value: formData.course_title,
                      label: formData.course_title,
                    }
                  : null
              }
              onChange={(option) =>
                handleSelectChange(option, { name: "course_title" })
              }
              placeholder="Select a course"
              isClearable
              isSearchable
              isDisabled={loadingCourses || courses.length === 0}
              styles={selectStyles}
              className="mt-1"
              menuPlacement="auto"
              autoFocus
            />
            {errors.course_title && (
              <p className="text-[#D40B0B] text-xs mt-1">
                {errors.course_title}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-fit border-2 bg-transparent border-[#D40B0B] text-[#D40B0B] py-3 px-8 rounded-md hover:bg-[#D40B0B] hover:text-white cursor-pointer transition-colors font-bold flex items-center justify-center disabled:opacity-50"
              disabled={
                submitting ||
                loadingCountries ||
                loadingCourses ||
                courses.length === 0
              }
            >
              {submitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-[#D40B0B]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
};

export default CourseRegistrationForm;
