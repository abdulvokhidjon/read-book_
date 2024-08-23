"use client";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const handleDelete = (id) => {
  const url = `https://online-json-server-api.up.railway.app/project/66b4546700b1a8ec3af1d68d/books/${id}`;

  fetch(url, {
    method: "DELETE",
  })
    .then(() => {
      alert("Book deleted successfully!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const handleEdit = (book, setEditingBook) => {
  setEditingBook(book);
};

const handleSave = (editingBook, setEditingBook) => {
  const url = `https://online-json-server-api.up.railway.app/project/66b4546700b1a8ec3af1d68d/books/${editingBook.id}`;

  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editingBook),
  })
    .then(() => {
      alert("Book updated successfully!");
      setEditingBook(null);
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

function ShowBooks({ books }) {
  const [editingBook, setEditingBook] = useState(null);

  return (
    <div className="w-full flex flex-wrap container mx-auto justify-center gap-4 pb-10">
      {books.data.map((book) => {
        return (
          <div key={book.id} className="p-2">
            <div className="card h-96 w-72 bg-base-100 shadow-2xl shadow-black">
              <div className="flex justify-between pt-2 px-5">
                <button
                  type="button"
                  onClick={() => handleEdit(book, setEditingBook)}
                >
                  <CiEdit className="w-5 h-5 hover:text-green-600 hover:scale-110 hover:-rotate-6" />{" "}
                </button>{" "}
                <button onClick={() => handleDelete(book.id)} type="button">
                  <MdDeleteForever className="w-5 h-5 hover:text-red-500 hover:scale-110 hover:-rotate-6" />
                </button>
              </div>
              {editingBook && editingBook.id === book.id ? (
                <div className="card-body p-2 text-center">
                  <input
                    type="text"
                    value={editingBook.title}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, title: e.target.value })
                    }
                    className="input input-bordered mb-2"
                  />
                  <input
                    type="text"
                    value={editingBook.author}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, author: e.target.value })
                    }
                    className="input input-bordered mb-2"
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSave(editingBook, setEditingBook)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="card-body p-2 text-center">
                  <h2 className="">
                    <span className="font-bold"> Name of Book:</span>{" "}
                    <span className="capitalize"> {book.title}</span>
                  </h2>
                  <p>
                    <span className="font-bold"> Author:</span>{" "}
                    <span className="capitalize">{book.author}</span>
                  </p>
                </div>
              )}
              <figure>
                <img src={book.photoURL} alt="Shoes" />
              </figure>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShowBooks;
