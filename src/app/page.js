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
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const url = `https://json-api.uz/api/project/top-bestseller-books/books/${id}`;

    try {
      await fetch(url, {
        method: "DELETE",
      });
      alert("Book deleted successfully!");
      setBooks((prevBooks) => ({
        ...prevBooks,
        data: prevBooks.data.filter((book) => book.id !== id),
      }));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete the book.");
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleSave = async () => {
    const url = `https://json-api.uz/api/project/top-bestseller-books/books/${editingBook.id}`;

    try {
      await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingBook),
      });
      alert("Book updated successfully!");
      setEditingBook(null);
      setBooks((prevBooks) => ({
        ...prevBooks,
        data: prevBooks.data.map((book) =>
          book.id === editingBook.id ? editingBook : book
        ),
      }));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update the book.");
    }
  };

  return (
    <div className="container">
      <div className="mt-20 container flex flex-wrap justify-between items-center">
        {books?.data?.map((book) => (
          <div
            key={book.id}
            className="h-[300px] mb-5 card card-compact border-2 bg-base-100 w-[22%] shadow-xl"
          >
            <figure className="mt-2 h-[150px] overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={book.image}
                alt={book.title}
              />
            </figure>
            <div className="card-body flex flex-col justify-between h-[180px]">
              <div className="flex justify-between">
                <h2 className="card-title truncate">{book.title}</h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(book)}
                    className="hover:text-green-600 hover:scale-110 hover:-rotate-6"
                  >
                    <CiEdit className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(book.id)}
                    className="hover:text-red-500 hover:scale-110 hover:-rotate-6"
                  >
                    <MdDeleteForever className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {editingBook && editingBook.id === book.id ? (
                <div>
                  <input
                    type="text"
                    value={editingBook.title}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, title: e.target.value })
                    }
                    className="input input-bordered mb-2 w-full"
                  />
                  <input
                    type="text"
                    value={editingBook.author}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, author: e.target.value })
                    }
                    className="input input-bordered mb-2 w-full"
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
                  <span className="text-[18px] font-semibold text-gray-400">
                    {book.author}
                  </span>
                  <p className="text-sm">{book.author}</p>
                  <div className="w-full card-actions justify-end">
                    <button className="w-full btn btn-primary">
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
