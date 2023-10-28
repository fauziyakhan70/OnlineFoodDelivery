import React, { useState } from "react";

function FoodCard({ CategoryName, name, img, Price ,onAddToCart }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState("half");

  const handleQuantityChange = (e) => {
    setSelectedQuantity(parseInt(e.target.value));
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  const getPrice = () => {
    if (selectedPrice === "half") {
      return Price[0].half * selectedQuantity;
    } else {
      return Price[0].full * selectedQuantity;
    }
  };

  return (
    
    <div className="max-w-xs overflow-hidden rounded-lg shadow-lg mx-auto">
    <img src={img} alt={name} className="w-full h-56 object-cover hover_effect" />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{CategoryName}</div>
      <p className="text-gray-700 text-base">{name}</p>
    </div>

    <div className="px-6 py-4">
      <div className="flex items-center">
        <div className="relative mr-4">
          <select
            className="block appearance-none w-16 bg-gray-200 border border-gray-200 text-gray-700 py-1 px-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={selectedQuantity}
            onChange={handleQuantityChange}
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mr-4">
          <select
            className="block appearance-none w-20 bg-gray-200 border border-gray-200 text-gray-700 py-1 px-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={selectedPrice}
            onChange={handlePriceChange}
          >
            <option value={"half"}>half</option>
            <option value={"full"}>full</option>
          </select>
        </div>
        <span className="text-xs text-gray-600">
          Total Price ${getPrice()}
        </span>
        <button
          onClick={() =>
            onAddToCart({
              CategoryName,
              name,
              img,
              Price,
              quantity: selectedQuantity,
              price: selectedPrice,
              totalPrice: getPrice(), // Include total price in the cart item
            })
          }
          className="bg-white-400 hover:bg-blue-600 text-black font-semibold py-2 px-3 rounded-full ml-3 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  );
}

export default FoodCard;
