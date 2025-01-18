import React, { useState , useContext} from "react";
import axios from "../config/axios.js";
import {UserContext} from "../context/user.context.jsx";
import { useNavigate } from "react-router-dom";

const Submitform = () => {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    company: "",
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {user } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addQuestion = () => {
    if (currentQuestion.trim() !== "") {
      setFormData({ ...formData, questions: [...formData.questions, currentQuestion.trim()] });
      setCurrentQuestion(""); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.questions.length === 0) {
      setMessage("Please add at least one question before submitting.");
      return;
    }
    
    try {
      const userId = user._id;
      const token = localStorage.getItem("token");
      await axios.post("/submit/create", {...formData , userId},
        {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        }
      ); 
      setMessage("Submission successful!");
      setSubmitted(true); 
      navigate("/")
    } catch (err) {
      console.log(err);
      if(!user){
        setMessage("Please login to submit your experience");
      }
      else
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Submit Your Details</h1>
        {message && <p className="mb-4 text-center text-green-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={submitted}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={submitted}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="company">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={submitted}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Questions</label>
            {!submitted && (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addQuestion}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            )}
            <ul className="mt-4 space-y-2">
              {formData.questions.map((question, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded-lg">
                  {index + 1}. {question}
                </li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            disabled={submitted}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Submitform;
