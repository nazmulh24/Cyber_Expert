import { ShoppingCart, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [experts, setExperts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("./experts.JSON")
      .then((response) => response.json())
      .then((data) => setExperts(data));
  }, []);

  const addItem = (user) => {
    // console.log(data);
    setCart([...cart, user]);
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.salary, 0);

  const cartIds = new Set(cart.map((item) => item.id));

  return (
    <div className="container mx-auto p-5 bg-gray-50 rounded space-y-7">
      <div className="bg-green-50 p-6 rounded-xl shadow-md border border-green-100 text-center flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">
          Assemble a Cyber Expert Team
        </h2>
        <p className="text-gray-600 max-w-3xl">
          Our systems are under serious cyber threats. We must build a top-tier
          cybersecurity team to protect our infrastructure.
        </p>
        <p className="text-lg font-semibold">
          Total Budget:{" "}
          <span className="text-green-600 font-bold">10 Million</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {experts.map((user) => (
              <div
                key={user.id}
                className="bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm 
                hover:shadow-md hover:scale-[1.02] transition-all 
                duration-200 ease-in-out text-center flex flex-col items-center"
              >
                <img
                  src={user.img}
                  alt="Profile Image"
                  className="w-32 h-32 object-cover shadow rounded-full mb-3"
                />

                <h2 className="text-xl font-bold mb-1">{user.name}</h2>

                <p className="text-sm mb-3">
                  <span className="font-semibold">Age:</span> {user.age}
                </p>
                <p className="text-sm mb-3">
                  <span className="font-semibold">Designation:</span>{" "}
                  {user.designation}
                </p>
                <p className="text-sm mb-3">
                  <span className="font-semibold">Address:</span> {user.address}
                </p>
                <p className="text-sm mb-4">
                  <span className="font-semibold">Salary:</span> ${user.salary}
                </p>

                <div className="mt-auto w-full">
                  <button
                    onClick={() => addItem(user)}
                    disabled={cartIds.has(user.id)}
                    className={`w-full p-3 rounded text-white flex justify-center items-center gap-3
    ${
      cartIds.has(user.id)
        ? "bg-blue-300 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 active:scale-95"
    }
    transition duration-150 ease-in-out`}
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {cartIds.has(user.id) ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-100 p-5 rounded-xl shadow h-fit sticky top-5">
          <h2 className="text-xl font-bold text-center mb-4">
            -Selected Experts-
          </h2>

          <p className="text-gray-600 text-center mb-3">
            <span className="font-semibold">Total Selected: </span>{" "}
            {cart.length}
          </p>

          <p className="text-gray-600 text-center mb-4">
            <span className="font-semibold">Total Cost: </span> ${total}
          </p>

          {/* Cart Items List */}
          {cart.length > 0 ? (
            <div>
              <ul className="space-y-2 mb-5 max-h-80 overflow-y-auto">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center bg-white border border-gray-100 rounded-md h-18"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-18 h-18 rounded-l-md object-cover mr-4"
                    />
                    <span className="flex-grow text-gray-800">{item.name}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 px-3 focus:outline-none transition-all duration-300 transform hover:scale-110"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700 active:scale-95 
             transition duration-150 ease-in-out"
              >
                Confirm Team
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-center italic my-6">
              ** Your cart is empty! **
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
