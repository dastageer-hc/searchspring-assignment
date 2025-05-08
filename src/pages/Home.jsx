import { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { fetchProducts } from "../services/searchAPI";

export default function Home() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const topRef = useRef(null);

  // handle search input
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  // handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // fetch products from API
  const getProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(query, currentPage);
      setProducts(data.results);
      setTotalPages(data.pagination.totalPages || 1);
      setError("");
      // scroll to top smoothly
      topRef?.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      setError("Oops, something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // fetch products when query or page changes
  useEffect(() => {
    getProducts();
  }, [query, currentPage]);

  return (
    <div
      className='p-4 mx-auto flex flex-col items-center w-full max-w-[100vw] overflow-x-hidden'
      ref={topRef}
    >
      <div className="z-1 w-full flex items-center justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="max-w-6xl w-full">
        {error && <p className='text-red-500 text-center mt-2'>{error}</p>}
        {loading ? (
          <div className='grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
            {[...Array(24)].map((_, index) => (
              <div key={index} className='animate-pulse w-full'>
                <div className='bg-gray-200 h-[30rem] rounded-lg'></div>
                <div className='mt-2 h-6 bg-gray-200 rounded w-3/4'></div>
                <div className='mt-1 h-4 bg-gray-200 rounded w-1/2'></div>
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {products.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}