import { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { fetchProducts } from "../services/searchAPI";
import { LuArrowUpDown, LuFilter, LuTags } from "react-icons/lu";

export default function Home() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState("");
  const [facets, setFacets] = useState([]);
  const [selectedFacets, setSelectedFacets] = useState({});
  const topRef = useRef(null);

  const sortOptions = [
    { value: "", label: "Default" },
    { value: "sales_rank_desc", label: "Best Sellers" },
    { value: "price_desc", label: "Price ($$$ - $)" },
    { value: "days_since_published_desc", label: "Recently Added" },
    { value: "title_asc", label: "Name (A - Z)" },
    { value: "title_desc", label: "Name (Z - A)" },
    { value: "sale_price_desc", label: "Highest Rated" },
    { value: "price_asc", label: "Price ($ - $$$)" }
  ];

  const filterKeywords = [
    "Shoes",
    "Hats",
    "Tops",
    "Jeans",
    "Dresses",
    "Accessories",
    "Bags",
    "Jewelry",
    "Watches",
    "Sunglasses"
  ];

  const handleKeywordClick = (keyword) => {
    setFilter(keyword);
    setShowFilters(false);
    handleSearch(keyword);
  };

  // handle search input
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  // handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // handle sort change
  const handleSortChange = (e) => {
    setSort(e.target.value);
    console.log(e.target.value);
    setCurrentPage(1);
  };

  // handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  // handle facet selection
  const handleFacetChange = (facetField, value) => {
    setSelectedFacets(prev => {
      const newFacets = { ...prev };
      if (newFacets[facetField]?.includes(value)) {
        newFacets[facetField] = newFacets[facetField].filter(v => v !== value);
        if (newFacets[facetField].length === 0) {
          delete newFacets[facetField];
        }
      } else {
        newFacets[facetField] = [...(newFacets[facetField] || []), value];
      }
      return newFacets;
    });
    setCurrentPage(1);
  };

  // fetch products from API
  const getProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(query, currentPage, sort, filter, selectedFacets);
      setProducts(data.results);
      setTotalPages(data.pagination.totalPages || 1);
      setFacets(data.facets || []);
      setError("");
      // scroll to top smoothly
      topRef?.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      setError("Oops, something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // fetch products when query, page, sort, filter, or facets change
  useEffect(() => {
    getProducts();
  }, [query, currentPage, sort, filter, selectedFacets]);

  return (
    <div
      className='p-4 mx-auto flex flex-col items-center w-full max-w-[100vw] overflow-x-hidden'
      ref={topRef}
    >
      <div className="z-1 w-full flex items-center justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="max-w-6xl w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-violet-50 hover:border-violet-500 transition-colors"
              >
                <LuFilter className="h-5 w-5 text-violet-500" />
                <span>Filter</span>
              </button>
              {showFilters && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    {filterKeywords.map((keyword) => (
                      <button
                        key={keyword}
                        onClick={() => handleKeywordClick(keyword)}
                        className="w-full px-4 py-2 text-left hover:bg-violet-50 flex items-center gap-2"
                      >
                        <span className="text-sm">{keyword}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={sort}
                onChange={handleSortChange}
                className="appearance-none px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white cursor-pointer hover:border-violet-500 transition-colors"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <LuArrowUpDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

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