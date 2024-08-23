import axios from "axios";
import Navbar from "@/components/navbar/page";
import Link from "next/link";
import { TbHandClick } from "react-icons/tb";

const getData = async () => {
  const response = await axios.get("https://dummyjson.com/products");
  return response.data;
};

async function Home() {
  const data = await getData();

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 sticky top-0 z-30 shadow-lg">
        <Navbar />
      </header>
      <main className="container mx-auto py-12">
        <h1 className="text-5xl font-extrabold text-center mb-16">
          Discover Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {data.products.map((prod) => (
            <Link
              key={prod.id}
              href={`singlePage/${prod.id}`}
              className="transform transition-transform hover:scale-105"
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl hover:shadow-none transition-shadow duration-300">
                <figure className="h-56 overflow-hidden">
                  <img
                    src={prod.thumbnail}
                    alt={prod.title}
                    className="w-full h-full object-cover transform transition-transform hover:scale-110"
                  />
                </figure>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">{prod.title}</h2>
                    <p className="text-gray-400">
                      <span className="font-semibold">Brand:</span>{" "}
                      {prod.brand || "No brand available"}
                    </p>
                    <p className="mt-4 text-gray-300 line-clamp-3">
                      {prod.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-pink-400">
                    <span className="font-semibold">Learn More</span>
                    <TbHandClick className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
