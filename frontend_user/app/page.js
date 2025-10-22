"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { MessageSquare, Edit3, Inbox } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


 const fetchFeedbacks = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/feedback/get-feedback`);
    console.log("Fetched feedbacks:", res.data);

    const dataArray = Array.isArray(res.data.feedbacks) ? res.data.feedbacks : [];
    setFeedbacks(dataArray);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    setFeedbacks([]);
  }
};


  useEffect(() => {
    fetchFeedbacks();
  }, []);

 
  const handleSubmit = async () => {
    if (!name || !message) return alert("Please fill all fields");

    try {
      await axios.post(`${API_BASE_URL}/api/feedback/add-feedback`, { name, message });
      setName("");
      setMessage("");
      fetchFeedbacks(); 
      toast.success("Feedback submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
        
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
       
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Share Your Feedback</h1>
          <p className="text-gray-600">We'd love to hear your thoughts and suggestions</p>
        </div>

        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Edit3 className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Submit Feedback</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Feedback
              </label>
              <textarea
                id="message"
                placeholder="Tell us what you think..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition duration-200 shadow-lg"
            >
              Submit Feedback
            </button>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-purple-100 p-3 rounded-full">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">Recent Feedback</h3>
            <span className="ml-auto bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
              {feedbacks.length} {feedbacks.length === 1 ? 'feedback' : 'feedbacks'}
            </span>
          </div>

          {feedbacks.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <Inbox className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No feedback yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((f) => (
                <div
                  key={f._id}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {f.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900 text-lg">{f.name}</h4>
                        <span className="text-xs text-gray-500">
                          {new Date(f.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{f.message}</p>
                      <div className="mt-3 text-xs text-gray-500">
                        {new Date(f.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
