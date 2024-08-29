"use client";
import { useEffect, useState } from "react"; // Bir marta import qilish kifoya

export default function Books() {
  // Komponent nomi "Books" qilib o'zgartirilgan
  const [books, setBooks] = useState([]);

  // Kitoblarni olish uchun fetch qilish
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:4000/books");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Ma'lumotlarni olishda xatolik yuz berdi:", err);
      }
    };

    fetchBooks();
  }, []); // Bu yerda [] bilan useEffect ichida fetchBooks faqat bir marta ishlaydi

  return (
    <div className="container">
      <div className="mt-20 container flex flex-wrap justify-between items-center">
        {books.map((book) => (
          <div
            key={book.id}
            className="h-[300px] mb-5 card card-compact border-2 bg-base-100 w-[22%] shadow-xl"
          >
            <figure className=" mt-2 h-[150px] overflow-hidden">
              <img
                className="h-full w-[full] object-cover "
                src={book.imgURL}
                alt={book.title}
              />
            </figure>
            <div className="card-body flex flex-col justify-between h-[180px]">
              <h2 className="card-title truncate">{book.title}</h2>
              <span className="text-[18px] font-semibold text-gray-400">
                {book.auth}
              </span>
              <span>{book.price} sum</span>
              <p className="text-sm">{book.author}</p>
              <div className="w-full card-actions justify-end">
                <button className="w-full btn btn-primary">Learn More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
