
{/*import { useState } from "react";

const  Form =  async () => {
 // const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    price:"",
    Photo: null,
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],  // Only allowing one file for each input
    });
  };


    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("photo", formData.Photo);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formDataToSend,
    });

    const result = await res.json();
    alert(result.message || result.error);

  
  return (
    <div className="max-w-lg h-screen sm:mx-24 md:mx-32 lg:mx-auto p-4">
  
      <div onSubmit={handleSubmit} const className="space-y-4">
       
          <label className="font-bold text-lg"> Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full p-2 border rounded"
              required
            />
            <label className="font-bold text-lg">Price:</label>
            <input
              type="text"
              name="lastName"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="price"
              className="w-full p-2 border rounded"
              required
            /> 
            
            <input
              type="file"
              name="Photo"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
      </div>
    </div>
  );
}
export default Form;*/}