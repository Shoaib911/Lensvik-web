import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const Add = ({token}) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categorySubcategories, setCategorySubcategories] = useState({});
  const [brand, setBrand] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  
const [showPrepareImage, setShowPrepareImage] = useState(false);
const [selectedImageForProcessing, setSelectedImageForProcessing] = useState(null);
const [processedImage, setProcessedImage] = useState(null);
const [isProcessing, setIsProcessing] = useState(false);
const [processingError, setProcessingError] = useState(null);


  const categories = {
    "MEN GLASSES": ["Full Rim", "Half Rim", "Rimless", "Blue Light Blocking", "Progressive Lenses", "Reading Glasses"],
    "WOMEN GLASSES": ["Full Rim", "Half Rim", "Rimless", "Blue Light Blocking", "Progressive Lenses", "Reading Glasses"],
    "SUNGLASSES": ["Polarized", "Non-Polarized", "Aviators", "Wayfarer", "Round", "Sports Sunglasses"],
    "LENSES": ["Daily Disposable", "Monthly Disposable", "Toric (Astigmatism)", "Multifocal", "Colored Lenses"],
    "KIDS GLASSES": ["Prescription", "Sunglasses", "Blue Light Glasses"],
    "ACCESSORIES": ["Cases & Covers", "Cleaning Kits", "Lens Wipes", "Anti-Fog Solutions"],
    "INTELLIGENT GLASSES": ["Smart Lenses", "Blue Light Filter"]
  };

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
      formData.append("onSale", onSale);
      if (onSale) {
        formData.append("salePrice", salePrice);
      }
      
      // Prepare categories and subcategories for backend
      const categoriesData = selectedCategories.map(cat => ({
        category: cat,
        subCategories: categorySubcategories[cat] || []
      }));
      
      formData.append("categories", JSON.stringify(categoriesData));
      formData.append("brand", brand);
      formData.append("sizes", JSON.stringify(Array.isArray(sizes) ? sizes : []));
      formData.append("bestSeller", bestSeller);

      if (processedImage) {
        formData.append("processedImage", processedImage);
      }
      
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { 
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // ✅ CORRECT
          },
        }
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
    setSelectedCategories([]);
    setCategorySubcategories({});
    setBrand("");
    setSizes([]);
    setBestSeller(false);
  };

  const handleProcessImage = async () => {
    try {
      setIsProcessing(true);
      setProcessingError(null);
  
      let selectedFile;
      if (selectedImageForProcessing === 0) selectedFile = image1;
      if (selectedImageForProcessing === 1) selectedFile = image2;
      if (selectedImageForProcessing === 2) selectedFile = image3;
      if (selectedImageForProcessing === 3) selectedFile = image4;
  
      if (!selectedFile) {
        setProcessingError("No file selected");
        setIsProcessing(false);
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const tempCanvas = document.createElement("canvas");
          const tempCtx = tempCanvas.getContext("2d");
          tempCanvas.width = img.width;
          tempCanvas.height = img.height;
          tempCtx.drawImage(img, 0, 0);
  
          const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
          const data = imageData.data;
  
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const brightness = (r + g + b) / 3;
  
            if (brightness > 200) {
              data[i + 3] = 0; // full white - transparent
            } else if (brightness > 170) {
              data[i + 3] = 0; // semi-translucent zone
            }
          }
  
          tempCtx.putImageData(imageData, 0, 0);
          const cleanedImage = tempCanvas.toDataURL("image/png");
          setProcessedImage(cleanedImage);
          setIsProcessing(false);
        };
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error(error);
      setProcessingError("Error processing image");
      setIsProcessing(false);
    }
  };
  
  

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (category && !selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
      // Initialize with empty subcategories for this category
      setCategorySubcategories(prev => ({
        ...prev,
        [category]: []
      }));
    }
  };

  const handleSubcategoryChange = (category, subcategory, isChecked) => {
    setCategorySubcategories(prev => {
      const currentSubs = prev[category] || [];
      let updatedSubs;
      
      if (isChecked) {
        updatedSubs = [...currentSubs, subcategory];
      } else {
        updatedSubs = currentSubs.filter(sc => sc !== subcategory);
      }
      
      return {
        ...prev,
        [category]: updatedSubs
      };
    });
  };

  const removeCategory = (categoryToRemove) => {
    setSelectedCategories(selectedCategories.filter(cat => cat !== categoryToRemove));
    setCategorySubcategories(prev => {
      const newSubs = {...prev};
      delete newSubs[categoryToRemove];
      return newSubs;
    });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start w-full gap-3"
    >
      {/* Image upload section - unchanged */}
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

     

      {(image1 || image2 || image3 || image4) && (
  <button
    type="button"
    className="px-5 py-2 text-white bg-blue-600 rounded-lg mt-4"
    onClick={() => setShowPrepareImage(true)}
  >
    Prepare Try-On Image
  </button>
)}

{showPrepareImage && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
      <h2 className="text-lg font-bold mb-4">Select an Image to Prepare Try-On</h2>

      <div className="flex flex-wrap gap-3">
        {[image1, image2, image3, image4].map((img, idx) => (
          img && (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt={`img${idx + 1}`}
              className={`w-24 h-24 object-cover cursor-pointer rounded-md border-4 ${
                selectedImageForProcessing === idx ? 'border-blue-600' : 'border-gray-300'
              }`}
              onClick={() => setSelectedImageForProcessing(idx)}
            />
          )
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
          disabled={selectedImageForProcessing === null || isProcessing}
          onClick={handleProcessImage}
        >
          {isProcessing ? "Processing..." : "Start Processing"}
        </button>

        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            setShowPrepareImage(false);
            setSelectedImageForProcessing(null);
            setProcessedImage(null);
            setProcessingError(null);
          }}
        >
          Cancel
        </button>
      </div>

      {processingError && <p className="text-red-600 mt-2">{processingError}</p>}

      {processedImage && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Processed Image Preview:</h3>
          <img src={processedImage} alt="Processed" className="w-40 h-auto mx-auto" />

          <div className="flex gap-4 mt-4 justify-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setShowPrepareImage(false);
                toast.success("Processed image approved!");
              }}
            >
              Approve & Use
            </button>

            <button
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setProcessedImage(null);
                setSelectedImageForProcessing(null);
                toast.info("Select again to reprocess.");
              }}
            >
              Reprocess
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
)}

 {/* Product name and description - unchanged */}
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

      {/* Categories and Subcategories Section */}
      <div className="w-full mt-4">
        <p className="mb-2 text-lg font-semibold">Product Categories</p>
        
        {/* Category selector */}
        <div className="mb-4">
          <select 
            className="input h-12 w-full max-w-[500px]" 
            onChange={handleCategoryChange}
            defaultValue=""
          >
            <option value="" disabled>Select a category to add</option>
            {Object.keys(categories)
              .filter(cat => !selectedCategories.includes(cat))
              .map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
          </select>
        </div>

        {/* Selected categories with their subcategories */}
        {selectedCategories.length > 0 && (
          <div className="space-y-6">
            {selectedCategories.map(category => (
              <div key={category} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg">{category}</h3>
                  <button 
                    type="button" 
                    onClick={() => removeCategory(category)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(categories[category] || []).map(subcategory => (
  <div key={subcategory} className="flex items-center">
    <input
      type="checkbox"
      id={`${category.replace(/\s+/g, "_")}-${subcategory.replace(/\s+/g, "_")}`}
      checked={categorySubcategories[category]?.includes(subcategory) || false}
      onChange={(e) => handleSubcategoryChange(category, subcategory, e.target.checked)}
      className="mr-2"
    />
    <label htmlFor={`${category.replace(/\s+/g, "_")}-${subcategory.replace(/\s+/g, "_")}`}>
      {subcategory}
    </label>
  </div>
))}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Brand selector - unchanged */}
      <div className="w-full mt-4">
        <p className="mb-2 text-lg font-semibold">Select Brand</p>
        <select 
          className="input h-12 w-full max-w-[500px]" 
          value={brand} 
          onChange={(e) => setBrand(e.target.value)} 
          required
        >
          <option value="">Select Brand</option>
          <option value="Ray-Ban">Ray-Ban</option>
          <option value="Oakley">Oakley</option>
          <option value="Persol">Persol</option>
          <option value="Gucci">Gucci</option>
          <option value="Prada">Prada</option>
          <option value="Armani">Armani</option>
        </select>
      </div>

      {/* Price section - unchanged */}
      <div className="flex flex-col gap-4">
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

      {/* Sizes section - unchanged */}
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

      {/* Best seller checkbox - unchanged */}
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

      {/* Buttons - unchanged */}
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