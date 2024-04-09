import React, { useState } from "react";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import AppointMentForm from "../AppointMentForm/AppointMentForm";
import AppointMentTop from "../AppointMentTop/AppointMentTop";
import BookApointMent from "../BookApointMent/BookApointMent";
import { useParams } from "react-router-dom";

// import
const AppointMent = () => {
  const [selectDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  let { username } = useParams();

  return (
    <div>
      <Navbar></Navbar>
    </div>
  );
};

export default AppointMent;
