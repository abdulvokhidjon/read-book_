import axios from "axios";
import Link from "next/link";
//react icons
import { FaStar } from "react-icons/fa";

const getData = async (id) => {
  const response = await axios.get(`https://dummyjson.com/products/${id}`);
  return response.data;
};

async function SinglePage({ params }) {
  const data = await getData(params.id);

  return (
    <div className="min-h-screen pt-24 lg:pt-32 bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
          <figure className="w-full lg:w-1/2">
            <img
              src={data.thumbnail}
              alt={data.title}
              className="w-full h-full object-cover transform transition-transform hover:scale-110"
            />
          </figure>
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
              {data.title}
            </h2>
            <p className="text-lg italic font-medium mb-8">
              {data.brand || "No brand available"}
            </p>
            <p className="text-gray-300 mb-8">{data.description}</p>
            <div className="flex justify-between items-center mb-8">
              <span className="line-through text-gray-500 text-lg">
                Old Price: ${data.price}
              </span>
              <span className="px-6 py-2 rounded-full bg-red-500 text-white">
                - {data.discountPercentage}%
              </span>
              <span className="text-lg font-bold text-green-400">
                Sale Price: $
                {(
                  data.price -
                  (data.price * data.discountPercentage) / 100
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-8">
              <p className="text-lg font-bold flex items-center gap-2">
                Rating: <FaStar className="text-yellow-400 w-6 h-6" />{" "}
                {data.rating}
              </p>
              <p className="text-gray-400">{data.stock} units available</p>
            </div>
            <Link
              href="/"
              className="block text-center text-lg font-semibold py-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
