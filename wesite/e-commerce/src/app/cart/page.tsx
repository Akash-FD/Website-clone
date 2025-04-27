"use client";

import {
  GetCartDetails,
  RemoveCartProduct,
  UpdateCartDetails,
} from "@/lib/api";
import { cartdataTypes } from "@/type";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function cart() {
  const [cartData, setCartData] = useState<cartdataTypes[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  //   const[updateQuntity, setUpdateQuantity]= useState<z>(0)
  // console.log(cartData);



  const getCartData = async () => {
    try {
      const res = await GetCartDetails();
      setCartData(res.data.items);
      setCartTotal(res.data?.total || 0);
    
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const updateQuantity = async (id: number, quantity: number) => {
    console.log(quantity);
    try {
      const res = await UpdateCartDetails(id, quantity);
      getCartData();
    } catch (err) {
      console.error(err);
    }
  };


  const deleteCartProduct = async (id: number) => {
    try {
      const res = await RemoveCartProduct(id);
      alert("remove item");
      getCartData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-[80%] m-auto max-sm:w-[90%]">
      <div className="m-auto mt-6 p-4 max-sm:mt-2">
        <div className="addtocart">
          <ul className="flex font-bold text-center pb-3 max-sm:text-[10px]">
            <li className="flex-[1] max-sm:flex-[1]">Product</li>
            <li className="flex-[1] max-sm:flex-[1]">Name</li>
            <li className="flex-[1] max-sm:flex-[1]">Price</li>
            <li className="flex-[1] max-sm:flex-[1]">Quantity</li>
            <li className="flex-[1] max-sm:flex-[1]">Subtotal</li>
            <li className="flex-[1] max-sm:flex-[1]">Remove</li>
          </ul>
          <hr />
          {cartData.length === 0 && (
            <h1 className="text-center text-3xl my-2 border py-2 text-slate-400">
              Cart is Empty
            </h1>
          )}
          <div className="max-h-[40vh] overflow-y-scroll scroll-smooth">
            {cartData.map((item) => (
              <div
                key={item.id}
                className="flex text-center items-center py-2 border-b max-sm:text-[8px]"
              >
                <div className="flex-[1]">
                  <img
                    src={item.image}
                    alt=""
                    className="w-[40px] object-contain m-auto"
                  />
                </div>
                <div className="flex-[1]">{item.name}</div>
                <div className="flex-[1]">{item.price}</div>

                <div className="flex-[1] max-sm:flex max-sm:flex-col">
                  <button
                    className="bg-gray-500 text-white px-1"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <span className="inline-block mx-3">{item.quantity}</span>
                  <button
                    className="bg-gray-500 text-white px-1"
                    onClick={() => {if(item.quantity !== 1){updateQuantity(item.id, item.quantity - 1)}else{deleteCartProduct(item.id)}}}
                  >
                    -
                  </button>
                </div>
                <div className="flex-[1]"> {item.subtotal}</div>
                <button
                  className="flex-[1] text-2xl"
                  onClick={() => deleteCartProduct(item.id)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="cart-total p-2 flex flex-row-reverse gap-10 my-8 max-sm:flex-col max-sm:gap-5">
        <div className="promo-code bg-gray-100 p-5 flex-[1] flex flex-col gap-5 max-sm:text-center max-sm:mt-5 max-sm:gap-2 max-sm:text-sm">
          <p>If you have any promo code, Enter it here</p>
          <div>
            <input
              type="text"
              placeholder="Enter promo code"
              className="border py-2 px-5 max-sm:mb-3"
            />
            <button className="bg-black text-white py-2 px-10 max-sm:px-5 max-sm:py-2">
              Submit
            </button>
          </div>
        </div>
        <div className="amount bg-gray-100 p-5 rounded-lg flex flex-col gap-3 flex-[1]">
          <h2 className="font-bold text-2xl mb-3">Cart Total</h2>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${cartTotal}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Shipping fee</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="font-bold flex justify-between">
            <p>Total</p>
            <p>${cartTotal}</p>
          </div>
          <hr />
          <div className="payment mt-2 w-full">
            <Link href="/confirmorder" className="bg-yellow-400 block text-center mt-2 px-4 py-2 rounded-lg hover:bg-yellow-500">
              Click to Pay
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
