import React, { useEffect, useState, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import AuthContext from "../../context/AuthContext";
import axios from "axios"; 

export default function FormModal({ setShowModal }) { 
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    city: "",
    from: "",
    relationship: "",
    desc: "",
  });

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const res = await axios.get(`/api/users?userId=${currentUser._id}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersData();
  }, [currentUser._id]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        city: user.city || "",
        from: user.from || "",
        relationship: user.relationship || "",
        desc: user.desc || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/users/${user._id}`, {
        ...formData,
        userId: user._id,
      });
      if (formData.username != user.username) {
        localStorage.clear();
        window.location.reload();
      }
      console.log(res.data);
      setUser(res.data);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-[40%] max-w-lg bg-white rounded-2xl shadow-lg p-6 relative mt-10">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="text-xl text-main">Update Profile</h1>
          <IoMdClose
            onClick={() => setShowModal(false)}
            className="text-2xl text-gray-600 hover:text-red-600 cursor-pointer transition"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="mt-4 space-y-4">
          <input
            value={formData.username}
            name="username"
            onChange={handleChange}
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-main rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <input
            value={formData.email}
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-main rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <div className="flex gap-4">
            <input
              value={formData.city}
              name="city"
              onChange={handleChange}
              type="text"
              placeholder="City"
              className="w-full px-4 py-2 border border-main rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              value={formData.from}
              name="from"
              onChange={handleChange}
              type="text"
              placeholder="From"
              className="w-full px-4 py-2 border border-main rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
          <select
            value={formData.relationship}
            name="relationship"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-main rounded-lg text-sm text-gray-700 bg-white focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            <option value="" disabled>
              Relationship Status
            </option>
            <option value="1">Single</option>
            <option value="2">Married</option>
            <option value="3">Don't Know</option>
          </select>
          <textarea
            value={formData.desc}
            name="desc"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-main rounded-lg text-sm text-gray-700 bg-white focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Description"
            rows="3"
          ></textarea>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-indigo-800 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
