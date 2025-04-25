import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const EditProduct = ({ token, productData, onClose, onUpdated }) => {
  const [name, setName] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categorySubcategories, setCategorySubcategories] = useState({});

  const [showReprocessPopup, setShowReprocessPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [processingImage, setProcessingImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const canvasRef = useRef(null);

  const categoriesOptions = {
    "MEN GLASSES": ["Full Rim", "Half Rim", "Rimless", "Blue Light Blocking", "Progressive Lenses", "Reading Glasses"],
    "WOMEN GLASSES": ["Full Rim", "Half Rim", "Rimless", "Blue Light Blocking", "Progressive Lenses", "Reading Glasses"],
    "SUNGLASSES": ["Polarized", "Non-Polarized", "Aviators", "Wayfarer", "Round", "Sports Sunglasses"],
    "LENSES": ["Daily Disposable", "Monthly Disposable", "Toric (Astigmatism)", "Multifocal", "Colored Lenses"],
    "KIDS GLASSES": ["Prescription", "Sunglasses", "Blue Light Glasses"],
    "ACCESSORIES": ["Cases & Covers", "Cleaning Kits", "Lens Wipes", "Anti-Fog Solutions"],
    "INTELLIGENT GLASSES": ["Smart Lenses", "Blue Light Filter"]
  };

  useEffect(() => {
    if (productData) {
      setName(productData.name);
      setOriginalPrice(productData.originalPrice);
      setOnSale(productData.onSale);
      setSalePrice(productData.salePrice || 0);

      if (Array.isArray(productData.categories)) {
        setSelectedCategories(productData.categories.map(c => c.category));
        const subs = {};
        productData.categories.forEach(c => {
          subs[c.category] = c.subCategories || [];
        });
        setCategorySubcategories(subs);
      }
    }
  }, [productData]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        productId: productData._id,
        name,
        originalPrice,
        onSale,
        salePrice: onSale ? salePrice : null,
        categories: selectedCategories.map(cat => ({
          category: cat,
          subCategories: categorySubcategories[cat] || []
        })),
        ...(processedImage && { processedTryonImage: processedImage }),
      };

      const response = await axios.post(
        `${backendUrl}/api/product/update`,
        updatedData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product updated successfully.");
        onUpdated();
      } else {
        toast.error(response.data.message || "Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product.");
    }
  };

  const startReprocess = (imageUrl) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const brightness = (r + g + b) / 3;
        if (brightness > 200) {
          data[i + 3] = 0;
        } else if (brightness > 170) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      const cleanedImage = canvas.toDataURL("image/png");
      setProcessingImage(cleanedImage);  // show to admin first
    };
  };

  const resetReprocessPopup = () => {
    setSelectedImage(null);
    setProcessingImage(null);
    setShowReprocessPopup(false);
  };

  return (
    <>
      <form onSubmit={handleUpdateProduct} className="flex flex-col gap-6">

        {/* Basic Info */}
        <div>
          <label className="font-bold">Product Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="border p-2 w-full" />
        </div>

        <div>
          <label className="font-bold">Original Price ($):</label>
          <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(Number(e.target.value))} required className="border p-2 w-full" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" checked={onSale} onChange={(e) => setOnSale(e.target.checked)} />
          <label className="font-bold">On Sale</label>
        </div>

        {onSale && (
          <div>
            <label className="font-bold">Sale Price ($):</label>
            <input type="number" value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} required className="border p-2 w-full" />
          </div>
        )}

        {/* Categories */}
        <div>
          <label className="font-bold">Categories:</label>
          <select className="border p-2 w-full" onChange={(e) => {
            const cat = e.target.value;
            if (cat && !selectedCategories.includes(cat)) {
              setSelectedCategories([...selectedCategories, cat]);
              setCategorySubcategories(prev => ({ ...prev, [cat]: [] }));
            }
          }} defaultValue="">
            <option value="" disabled>Select Category</option>
            {Object.keys(categoriesOptions).filter(c => !selectedCategories.includes(c)).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {selectedCategories.map(cat => (
            <div key={cat} className="border p-4 rounded-md mt-2">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{cat}</h4>
                <button type="button" onClick={() => {
                  setSelectedCategories(selectedCategories.filter(c => c !== cat));
                  const copy = { ...categorySubcategories };
                  delete copy[cat];
                  setCategorySubcategories(copy);
                }} className="text-red-500">Remove</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {categoriesOptions[cat].map(sub => (
                  <div key={sub} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id={`${cat}-${sub}`}
                      checked={categorySubcategories[cat]?.includes(sub) || false}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const current = categorySubcategories[cat] || [];
                        setCategorySubcategories(prev => ({
                          ...prev,
                          [cat]: checked ? [...current, sub] : current.filter(s => s !== sub)
                        }));
                      }}
                    />
                    <label htmlFor={`${cat}-${sub}`}>{sub}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Reprocess Button */}
        <button type="button" className="px-5 py-2 bg-yellow-600 text-white rounded-lg mt-6" onClick={() => setShowReprocessPopup(true)}>
          Reprocess Try-On Image
        </button>

        {/* Save & Cancel Buttons */}
        <div className="flex gap-4 mt-6">
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg">Save Changes</button>
          <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-400 text-white rounded-lg">Cancel</button>
        </div>
      </form>

      {/* Popup */}
      {showReprocessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            {!processingImage ? (
              <>
                <h2 className="text-lg font-bold mb-4">Select Image for Reprocessing</h2>
                <div className="flex flex-wrap gap-3 mb-6">
                  {productData.image?.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`img-${idx}`}
                      className={`w-24 h-24 object-cover rounded-md cursor-pointer border-4 ${selectedImage === imgUrl ? 'border-blue-600' : 'border-gray-300'}`}
                      onClick={() => setSelectedImage(imgUrl)}
                    />
                  ))}
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      if (selectedImage) {
                        startReprocess(selectedImage);
                      } else {
                        toast.error("Please select an image first.");
                      }
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Start Reprocessing
                  </button>
                  <button onClick={resetReprocessPopup} className="bg-red-600 text-white px-4 py-2 rounded-lg">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold mb-4">Processed Image Preview</h2>
                <img src={processingImage} alt="Processed" className="w-48 h-auto mx-auto rounded-md" />
                <div className="flex gap-4 mt-6 justify-center">
                  <button
                    onClick={() => {
                      setProcessedImage(processingImage);
                      resetReprocessPopup();
                      toast.success("Image approved for saving!");
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Approve & Use
                  </button>
                  <button
                    onClick={() => {
                      setProcessingImage(null);
                      toast.info("Please select image again to reprocess.");
                    }}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    Reprocess Again
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hidden canvas */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </>
  );
};

EditProduct.propTypes = {
  token: PropTypes.string.isRequired,
  productData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdated: PropTypes.func.isRequired,
};

export default EditProduct;
