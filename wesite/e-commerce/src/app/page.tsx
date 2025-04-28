"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [productData, setProductData] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    sortBy: "",
    order: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    search: "",
  });

  const fetchAllProduct = async () => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

      const res = await axios.get(
        `http://localhost:8000/api/product-filters?${queryParams.toString()}`
      );

      setProductData(res.data.products || res.data.data);
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, [filters]);

  return (
    <div className="flex mx-auto py-8 px-4 gap-6">
      {/* Filters Sidebar */}
      <aside className="w-[280px] bg-white rounded-lg shadow-md p-5 h-fit sticky top-24">
        <h1 className="text-2xl font-semibold mb-6">Filters</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full mb-5 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-all"
        />

        {/* Category */}
        <div className="mb-5">
          <label className="text-gray-700 font-medium mb-2 block">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-5">
          <label className="text-gray-700 font-medium mb-2 block">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="mb-5">
          <label className="text-gray-700 font-medium mb-2 block">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="price">Price</option>
            <option value="createdAt">Newest</option>
          </select>
        </div>

        {/* Order */}
        <div className="mb-5">
          <label className="text-gray-700 font-medium mb-2 block">Order</label>
          <select
            value={filters.order}
            onChange={(e) => setFilters({ ...filters, order: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {/* Clear Button */}
        <button
          onClick={() =>
            setFilters({
              sortBy: "",
              order: "",
              minPrice: "",
              maxPrice: "",
              category: "",
              search: "",
            })
          }
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition-all"
        >
          Clear Filters
        </button>
      </aside>

      {/* Products Grid */}
      <main className="flex-1">
        {productData.length === 0 ? (
          <p className="text-center text-xl font-semibold">No products found.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-10 items-center">
            {productData.map((item) => (
              <div
                key={item.id}
                className="card w-[250px] max-lg:w-[200px] max-md:w-[140px] shadow-lg p-4 hover:scale-105 transition-all duration-200"
              >
                <div className="h-[220px] bg-gray-100 flex items-center justify-center overflow-hidden rounded">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h2 className="mt-4 font-semibold text-gray-600 text-lg line-clamp-2">{item.name}</h2>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-lg font-bold">${item.price}</p>
                </div>
                <Link
                  href={`/product/${item.id}`}
                  className="mt-4 block text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
