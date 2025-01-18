import React from "react";
import {BrowserRouter , Route , Routes} from "react-router-dom";
import Login from "../screen/Login";
import Register from "../screen/Register";
import Header from "../screen/Header";
import Footer from "../screen/Footer";
import Home from "../screen/Home";
import Dashboard from "../screen/Dashboard";
import Submitform from "../screen/Submitform";
import Viewuser from "../screen/Viewuser";

function Approute(){
  return (
    <div>
      <BrowserRouter>
       <Header/>
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path= "/login" element={<Login/>} />
         <Route path="/register" element={<Register/>} />
         <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="/view" element={<Viewuser/>} />
         <Route path="/submit" element={<Submitform/>} />
       </Routes>
       <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default Approute;