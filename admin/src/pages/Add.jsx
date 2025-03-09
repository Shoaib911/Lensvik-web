import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import PropTypes from "prop-types";




const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      formData.append("name", name);
      formData.append("description", description);
      formData.append("originalPrice", originalPrice);
      formData.append("onSale", onSale)
      if (onSale) {
        formData.append("salePrice", salePrice);
      }
      ;
      formData.append("category", JSON.stringify(category));
      formData.append("subCategory", subCategory);
      formData.append("brand", brand);
      formData.append("sizes", JSON.stringify(Array.isArray(sizes) ? sizes : []));
      formData.append("bestSeller", bestSeller);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: {
          "Content-Type": "multipart/form-data",
          token,
        }, }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const resetForm = () => {
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setName("");
    setDescription("");
    setOriginalPrice(0);
    setSalePrice(0);
    setOnSale(false);
    setCategory([]);
    setSubCategory("");
    setBrand("");
    setSizes([]);
    setBestSeller(false);
  };

  const categories = {
    "MEN GLASSES": ["Full Rim", "Half Rim", "Rimless", "Blue Light Blocking", "Progressive Lenses", "Reading Glasses"],
    "WOMEN GLASSES": ["Full Rim", "Half Rim", "Rimless", "Blue Light Blocking", "Progressive Lenses", "Reading Glasses"],
    "SUNGLASSES": ["Polarized", "Non-Polarized", "Aviators", "Wayfarer", "Round", "Sports Sunglasses"],
    "LENSES": ["Daily Disposable", "Monthly Disposable", "Toric (Astigmatism)", "Multifocal", "Colored Lenses"],
    "KIDS GLASSES": ["Prescription", "Sunglasses", "Blue Light Glasses"],
    "ACCESSORIES": ["Cases & Covers", "Cleaning Kits", "Lens Wipes", "Anti-Fog Solutions"],
    "INTELLIGENT GLASSES": [ "Smart Lenses", "Blue Light Filter"]
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start w-full gap-3"
    >
      <div>
        <p className="mb-2 text-lg font-semibold">Upload Product Image(s)</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="Upload Images"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
              accept="image/*"
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="Upload Images"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
              accept="image/*"
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="Upload Images"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
              accept="image/*"
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="Upload Images"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
              accept="image/*"
            />
          </label>
        </div>
      </div>

      <div className="w-full mt-2">
        <p className="mb-2 text-lg font-semibold">Product Item Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
          type="text"
          placeholder="Enter Product Name"
          required
        />
      </div>

      <div className="w-full mt-2">
        <p className="mb-2 text-lg font-semibold">Product Item Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
          type="text"
          placeholder="Enter Product Description"
          required
        />
      </div>
      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
  <div className="w-full">
    <p className="mb-2 text-lg font-semibold">Product Category</p>
    <select className="input h-12 w-full" value={category} onChange={(e) => setCategory([e.target.value])} required>
      <option value="">Select Category</option>
      {Object.keys(categories).map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  </div>

  <div className="w-full">
    <p className="mb-2 text-lg font-semibold">Product Sub Category</p>
    <select className="input h-12 w-full" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} required>
      <option value="">Select Subcategory</option>
      {(categories[category] || []).map((sub) => (
        <option key={sub} value={sub}>{sub}</option>
      ))}
    </select>
  </div>

  <div className="w-full">
    <p className="mb-2 text-lg font-semibold">Select Brand</p>
    <select className="input h-12 w-full" value={brand} onChange={(e) => setBrand(e.target.value)} required>
      <option value="">Select Brand</option>
      <option value="Ray-Ban">Ray-Ban</option>
      <option value="Oakley">Oakley</option>
      <option value="Persol">Persol</option>
      <option value="Gucci">Gucci</option>
      <option value="Prada">Prada</option>
      <option value="Armani">Armani</option>
    </select>
  </div>
</div>



      <div className="flex flex-col gap-4">
  {/* First Row: Original Price & On Sale Checkbox */}
  <div className="flex items-center gap-8">
    <div>
      <p className="mb-2 text-lg font-semibold">Original Price ($)</p>
      <input
        type="number"
        className="px-3 py-2 border-gray-500 w-full max-w-[200px]"
        value={originalPrice}
        onChange={(e) => setOriginalPrice(Number(e.target.value) || 0)}
        placeholder="Enter Price"
        required
      />
    </div>
    <div className="flex items-center gap-3 mt-5">
    <input 
  type="checkbox"
  id="onSale"
  checked={onSale}
  onChange={(e) => {
    const checked = e.target.checked;
    setOnSale(checked);
    if (!checked) setSalePrice("");
  }}
        className="h-7 w-7"
      />
      <label htmlFor="onSale" className="cursor-pointer text-xl">
        On Sale
      </label>
    </div>
  </div>

  {/* Second Row: Sale Price (Only if On Sale is Checked) */}
  {onSale && (
    <div>
      <p className="mb-2 text-lg font-semibold">Sale Price ($)</p>
      <input
        type="number"
        className="px-3 py-2 border-gray-500 w-full max-w-[200px]"
        value={salePrice}
        onChange={(e) => setSalePrice(Number(e.target.value) || 0)}
        placeholder="Enter Discounted Price"
        required={onSale}
      />
    </div>
  )}
     </div>


      <div>
        <p className="mb-2 text-lg font-semibold">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size)
                    ? "bg-gray-500 text-white rounded-md"
                    : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestSeller"
          checked={bestSeller}
          onChange={() => setBestSeller((prev) => !prev)}
        />
        <label htmlFor="bestSeller" className="ml-2 cursor-pointer">
          Add to Best Seller
        </label>
      </div>
      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
        <button
          type="submit"
          className="px-5 py-2 mt-2 text-white rounded-lg bg-slate-700"
        >
          Add Product
        </button>
        <button
          type="button"
          className="px-5 py-2 mt-2 text-white rounded-lg bg-slate-700"
          onClick={resetForm}
        >
          Reset Details
        </button>
      </div>
    </form>
  );
};

Add.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Add;
