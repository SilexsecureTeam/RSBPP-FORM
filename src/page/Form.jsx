import React from "react";
import Noti from "../component/Noti";
import Header from "../component/Header";
import CourseRegistrationForm from "../component/CourseRegistrationForm";
import Footer from "../component/Footer";

const Form = () => {
  return (
    <div>
      <Noti />
      <Header />
      <CourseRegistrationForm />
      <Footer />
    </div>
  );
};

export default Form;
