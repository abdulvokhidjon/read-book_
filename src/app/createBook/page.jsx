"use client";
import toast from "react-hot-toast";
import FormInput from "../components/FormInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
function CreateBook() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    auth: "",
    imgURL: "",
    kategoriya: "",
    description: "",
    price: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key} ni to'ldiring`;
      }
    });

    // Agar xatolar bo'lsa, formani yubormaslik
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields.");
      return;
    }

    // Agar hamma narsa to'g'ri bo'lsa, fetch orqali ma'lumot yuboriladi
    fetch("http://localhost:4000/books", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(() => {
      setFormData({
        title: "",
        auth: "",
        imgURL: "",
        kategoriya: "",
        description: "",
        price: "",
      });
      setErrors({});
      router.push("/");
      toast.success("You added a new book");
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 p-5 mt-5 w-1/2 mx-auto border-2 rounded-md max-h-[80vh] overflow-y-auto"
      >
        <FormInput
          name="title"
          label="Title:"
          placeholder="Book name..."
          value={formData.title}
          onChange={handleInputChange}
          error={errors.title}
        />
        <FormInput
          name="auth"
          label="Auth:"
          placeholder="Author name..."
          value={formData.auth}
          onChange={handleInputChange}
          error={errors.auth}
        />
        <FormInput
          name="imgURL"
          label="Book Img URL:"
          placeholder="Img URL..."
          value={formData.imgURL}
          onChange={handleInputChange}
          error={errors.imgURL}
        />
        <FormInput
          name="kategoriya"
          label="Kategoriya:"
          placeholder="History..."
          value={formData.kategoriya}
          onChange={handleInputChange}
          error={errors.kategoriya}
        />
        <FormInput
          name="description"
          label="Description:"
          placeholder="Description..."
          value={formData.description}
          onChange={handleInputChange}
          error={errors.description}
        />
        <FormInput
          name="price"
          label="Price:"
          placeholder="Price..."
          value={formData.price}
          onChange={handleInputChange}
          error={errors.price}
        />

        <div className="mt-6 w-full flex items-center justify-around">
          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            type="button"
            className="w-[45%] btn btn-active"
          >
            Preview
          </button>
          <button type="submit" className="w-[45%] btn btn-active btn-neutral">
            Create Book
          </button>
        </div>
      </form>

      {/* modal */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      {formData.title &&
        formData.auth &&
        formData.description &&
        formData.imgURL &&
        formData.price &&
        formData.kategoriya && (
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box ">
              <div className="flex items-center gap-5">
                <div>
                  <img width={180} src={formData.imgURL} alt="" />
                </div>
                <div>
                  <h3 className=" text-lg">
                    {" "}
                    <span className="font-bold">Kitob nomi:</span>{" "}
                    {formData.title}
                  </h3>
                  <p className="py-4">
                    <span className="font-bold">Mualif: </span>
                    {formData.auth}
                  </p>
                  <p className="py-4">
                    <span className="font-bold">Narxi:</span> {formData.price}{" "}
                    sum
                  </p>
                </div>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn mr-5">Close</button>
                  <button onClick={handleSubmit} className="btn btn-primary">
                    Create
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        )}
    </div>
  );
}

export default CreateBook;
