"use client";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          "https://json-api.uz/api/project/top-bestseller-books/books"
        );

        // Check if response status is OK (200-299)
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err.message);
        alert("Failed to fetch books. Check the console for details.");
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const url = `https://json-api.uz/api/project/top-bestseller-books/books/${id}`;

    try {
      const res = await fetch(url, {
        method: "DELETE",
      });

      // Check if response status is OK (200-299)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      setBooks((prevBooks) => ({
        ...prevBooks,
        data: prevBooks.data.filter((book) => book.id !== id),
      }));
      alert("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting the book:", error.message);
      alert("Failed to delete the book. Check the console for details.");
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleSave = async () => {
    const url = `https://json-api.uz/api/project/top-bestseller-books/books/${editingBook.id}`;

    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingBook),
      });

      // Check if response status is OK (200-299)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      setBooks((prevBooks) => ({
        ...prevBooks,
        data: prevBooks.data.map((book) =>
          book.id === editingBook.id ? editingBook : book
        ),
      }));
      setEditingBook(null);
      alert("Book updated successfully!");
    } catch (error) {
      console.error("Error updating the book:", error.message);
      alert("Failed to update the book. Check the console for details.");
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex flex-wrap justify-center gap-4">
        {books?.data?.map((book) => (
          <div
            key={book.id}
            className="card bg-white border rounded-lg shadow-lg overflow-hidden w-full sm:w-80"
          >
            <figure className="relative">
              <img
                className="w-full h-40 object-cover"
                src={book.image}
                alt={book.title}
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(book)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-110"
                >
                  <CiEdit className="text-blue-600 w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(book.id)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-110"
                >
                  <MdDeleteForever className="text-red-600 w-5 h-5" />
                </button>
              </div>
            </figure>
            <div className="p-4">
              {editingBook && editingBook.id === book.id ? (
                <div>
                  <input
                    type="text"
                    value={editingBook.title}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, title: e.target.value })
                    }
                    className="input input-bordered mb-2 w-full"
                    placeholder="Book title"
                  />
                  <input
                    type="text"
                    value={editingBook.author}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, author: e.target.value })
                    }
                    className="input input-bordered mb-2 w-full"
                    placeholder="Author"
                  />
                  <button
                    className="btn btn-primary w-full"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-semibold truncate">
                    {book.title}
                  </h2>
                  <p className="text-gray-600">{book.author}</p>
                  {/* <p className="text-sm text-gray-500 mt-1">{book.price} sum</p> */}
                  <div className="mt-2">
                    <button className="btn btn-primary w-full">
                      Learn More
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
