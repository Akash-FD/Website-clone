// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//    <>

//    <div className="flex flex-row gap-4 mr-0.5 ml-0.5 mt-0.5">
//    Home Page
//    <Link href={"/register"}>Register Page</Link>
//    <Link href={"/login"}>Login Page</Link>
//    </div>

//    </>
//   );
// }

"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  description: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  category: string;
}
const categories = [
  "All",
  "Clothing",
  "Electronics",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Books",
  "Toys & Games",
  "Baby & Kids",
  "Footwear",
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/products");
        const data = await res.json();
        console.log(data.data);

        if (res.ok) {
          setProducts(data.data);
        } else {
          alert("Failed to load products");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching products");
      }
    };
    fetchProducts();
  }, []);
  
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-md text-sm ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-center mb-8">
        Available Products
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-md overflow-hidden"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={product?.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Stock: {product.quantity}
              </p>
              <p className="text-lg font-semibold text-blue-600 mb-3">
                ${product.price}
              </p>
              <Link
                href={`/product/${product.id}`}
                className="block w-full bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Show message if no products */}
      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No products found in this category.
        </div>
      )}
    </div>
  );
}








// "use client";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const HomePage = () => {
//   // State for categories, filters, and products
//   const [categories, setCategories] = useState<string[]>([]);
//   const [products, setProducts] = useState<{ id: number; name: string; description: string; price: number; image: string }[]>([]);
//   const [filters, setFilters] = useState({
//     category: '',
//     minPrice: 0,
//     maxPrice: 1000,
//     search: '',
//     sortBy: 'price',
//     order: 'desc',
//   });
//   console.log(products);
  
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });


//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         // Assuming you have a predefined list of categories
//         const response = await axios.get('http://localhost:8000/api/product-filters'); 
//         setCategories(['Electronics', 'Clothing', 'Books','Footwear', 'Home & Kitchen']); 
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
    
//     fetchCategories();
//   }, []);

//   // Fetch filtered products based on filters
//   const fetchProducts = async () => {
//     try {
//       const { category, minPrice, maxPrice, search, sortBy, order } = filters;
//       const response = await axios.get('http://localhost:8000/api/product-filters', {
//         params: {
//           category,
//           minPrice,
//           maxPrice,
//           search,
//           sortBy,
//           order,
//         },
//       });
//       setProducts(response.data.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   // Call fetchProducts when filters change
//   useEffect(() => {
//     fetchProducts();
//   }, [filters]);

//   // Handle filter change
//   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle price range change
//   interface PriceRange {
//     min: number;
//     max: number,
//   }

//   const handlePriceRangeChange = (min: number, max: number): void => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       minPrice: min,
//       maxPrice: max,
//     }));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold">Products</h1>
//         <div className="space-x-4">
//           {/* Category Filter */}
//           <select
//             name="category"
//             value={filters.category}
//             onChange={handleFilterChange}
//             className="p-2 border border-gray-300 rounded"
//           >
//             <option value="">All Categories</option>
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>

//           {/* Price Range Filter */}
//           <div className="flex items-center space-x-2">
//             <input
//               type="number"
//               value={filters.minPrice}
//               onChange={(e) => handlePriceRangeChange(Number(e.target.value), filters.maxPrice)}
//               className="p-2 border border-gray-300 rounded"
//               placeholder="Min Price"
//             />
//             <input
//               type="number"
//               value={filters.maxPrice}
//               onChange={(e) => handlePriceRangeChange(filters.minPrice, Number(e.target.value))}
//               className="p-2 border border-gray-300 rounded"
//               placeholder="Max Price"
//             />
//           </div>

//           {/* Search Filter */}
//           <input
//             type="text"
//             name="search"
//             value={filters.search}
//             onChange={handleFilterChange}
//             className="p-2 border border-gray-300 rounded"
//             placeholder="Search"
//           />

//           {/* Sort By Filter */}
//           <select
//             name="sortBy"
//             value={filters.sortBy}
//             onChange={handleFilterChange}
//             className="p-2 border border-gray-300 rounded"
//           >
//             <option value="price">Price</option>
//             <option value="createdAt">New Arrivals</option>
//           </select>

//           {/* Order Filter */}
//           <select
//             name="order"
//             value={filters.order}
//             onChange={handleFilterChange}
//             className="p-2 border border-gray-300 rounded"
//           >
//             <option value="asc">Ascending</option>
//             <option value="desc">Descending</option>
//           </select>
//         </div>
//       </div>

//       {/* Display Products */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {products.length === 0 ? (
//           <div>No products found.</div>
//         ) : (
//           products.map((product) => (
//             <div key={product.id} className="border p-4 rounded-lg shadow-lg">
//               <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
//               <h3 className="text-xl font-semibold">{product.name}</h3>
//               <p className="text-gray-600">{product.description}</p>
//               <div className="mt-2">
//                 <span className="text-lg font-bold">${product.price}</span>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;





