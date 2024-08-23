"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function Form() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const author = formData.get("author");
    const photoURL = formData.get("photoURL");

    const url = "https://json-api.uz/api/project/top-bestseller-books/books";

    try {
      await axios.post(
        url,
        { title, author, photoURL },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Book added successfully!");
      e.target.reset();
    } catch (error) {
      toast.error("Failed to add the book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="flex flex-col gap-4 w-full">
          <label className="text-lg font-semibold" htmlFor="title">
            Title:
          </label>
          <input
            required
            name="title"
            className="py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            type="text"
            id="title"
            placeholder="Enter book title"
          />
        </div>
        <div className="flex flex-col gap-4 w-full mt-4">
          <label className="text-lg font-semibold" htmlFor="author">
            Author:
          </label>
          <input
            required
            name="author"
            className="py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            type="text"
            id="author"
            placeholder="Enter author's name"
          />
        </div>
        <div className="flex flex-col gap-4 w-full mt-4">
          <label className="text-lg font-semibold" htmlFor="photoURL">
            Book's Photo URL:
          </label>
          <input
            required
            name="photoURL"
            className="py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            type="url"
            id="photoURL"
            placeholder="Enter photo URL"
          />
        </div>
        <div className="mt-8 w-full">
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold bg-primary ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-primary-dark"
            } transition-all duration-300`}
            disabled={loading}
          >
            {loading ? "Adding Book..." : "Create a New Book"}
          </button>
        </div>
      </form>
      <hr className="border border-gray-200 mt-10 mb-6" />
      <h1 className="w-full text-center text-4xl font-bold">Books</h1>
    </div>
  );
}

export default Form;
