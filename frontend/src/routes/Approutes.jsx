import React from "react";
import {BrowserRouter , Route , Routes} from "react-router-dom";
import Home from "../screen/Home";
import Login from "../screen/Login";
import Register from "../screen/Register";

function Approute(){
  return (
    <div>
      <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path= "/login" element={<Login/>} />
         <Route path="/register" element={<Register/>} />
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Approute;