import axios from "axios";
import Form from "@/components/Form";
import ShowBooks from "@/components/ShowBooks";

const getData = async () => {
  const response = await axios.get(
    "https://json-api.uz/api/project/top-bestseller-books/books",
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return response.data;
};

async function About() {
  const books = await getData();
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-16">
      <div className="w-full max-w-4xl px-4">
        <div className="mb-12 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            Submit Your Book
          </h2>
          <Form />
        </div>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            Top Bestseller Books
          </h2>
          <ShowBooks books={books} />
        </div>
      </div>
    </div>
  );
}

export default About;
