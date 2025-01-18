import { useContext , useEffect } from "react";
import { UserContext } from "../context/user.context.jsx";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <header className="w-full max-w-4xl p-8 bg-blue-200 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-blue-900">
          Welcome to InterviewHub
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          {user
            ? `Welcome back, ${user.username}! Prepare to ace your next interview.`
            : "Your one-stop solution to crack your dream job interviews."}
        </p>
      </header>
      <main className="w-full max-w-4xl p-6 mt-8 bg-blue-200 rounded-lg shadow-md">
        <blockquote className="text-xl italic font-semibold text-gray-800 text-center border-l-4 border-blue-500 pl-4">
          "Success is not the key to happiness. Happiness is the key to success.
          If you love what you are doing, you will be successful."
        </blockquote>
        <p className="text-center text-gray-700 mt-6">
          At InterviewHub, we provide resources, guidance, and tools to help
          you build confidence and excel in your interviews. Explore curated
          questions, practice coding challenges, and enhance your skills.
        </p>
        <div className="flex justify-center mt-6 space-x-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Explore Questions
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
