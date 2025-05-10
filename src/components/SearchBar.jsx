import { useState, useEffect, useRef } from 'react';

import logo from '../assets/Searchspring-logo.png'
import minimalLogo from '../assets/Searchspring-logo-minimal.png'
import { LuSearch } from "react-icons/lu";
import { fetchProducts } from '../services/searchAPI';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const getSuggestions = async () => {
      if (input.trim().length > 2) {
        try {
          setLoading(true);
          console.log('Fetching suggestions for:', input);
          const data = await fetchProducts(input, 1, "", "", {});
          console.log('API Response:', data);
          console.log('Results:', data.results);
          setSuggestions(data.results || []);
          console.log('Suggestions state:', data.results || []);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(getSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [input]);

  useEffect(() => {
    console.log('Suggestions updated:', suggestions);
    console.log('Show suggestions:', showSuggestions);
  }, [suggestions, showSuggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.title);
    onSearch(suggestion.title);
    setShowSuggestions(false);
  };

  return (
    <div className='w-full shadow-[0px_1px_100px_-12px_rgba(0,_0,_0,_0.3)] overflow-visible
    mb-3  bg-white rounded-full h-[4.5rem] border border-[#b5b0e2]  lg:w-[55rem]  flex justify-stretch  sm:justify-between items-center relative'>

      <div className='ml-8 sm:block hidden'>
        <img src={logo} alt='search spring logo ' className='object-contain w-auto h-[3rem]' />
      </div>

      <form onSubmit={handleSubmit} className='h-3 w-full flex items-center justify-center relative'>

        <div className='ml-5 sm:hidden'>
          <img src={minimalLogo} alt='search spring logo' style={{ height: '2rem' }} />
        </div>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for products..."
          className="flex-1 px-4 py-2 border-none rounded-md focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 cursor-pointer mr-3"
        >
          <LuSearch color='#4532CF' size={30} />
        </button>

        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute top-[4.5rem] left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] max-h-[32rem] overflow-y-auto"
          >
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : suggestions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center gap-4 p-2 hover:bg-violet-50 rounded-lg transition-colors w-full"
                  >
                    {suggestion.image && (
                      <img
                        src={suggestion.image}
                        alt={suggestion.title}
                        className="w-16 h-16 object-contain"
                      />
                    )}
                    <div className="flex flex-col text-left">
                      <span className="font-medium text-sm line-clamp-2">{suggestion.title}</span>
                      {suggestion.price && (
                        <span className="text-sm text-gray-500">
                          ${typeof suggestion.price === 'number' ? suggestion.price.toFixed(2) : suggestion.price}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">No results found</div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
