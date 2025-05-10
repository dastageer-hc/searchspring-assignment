import { useState, useEffect, useRef } from 'react';

import logo from '../assets/Searchspring-logo.png'
import minimalLogo from '../assets/Searchspring-logo-minimal.png'
import { LuSearch } from "react-icons/lu";
import { fetchAutocomplete } from '../services/searchAPI';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
          const data = await fetchAutocomplete(input);
          setSuggestions(data.suggestions || []);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(getSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className='w-full shadow-[0px_1px_100px_-12px_rgba(0,_0,_0,_0.3)] overflow-hidden
    mb-3  bg-white rounded-full h-[4.5rem] border border-[#b5b0e2]  lg:w-[55rem]  flex justify-stretch  sm:justify-between items-center relative'>

      <div className='ml-8 sm:block hidden'>
        <img src={logo} alt='search spring logo ' className='object-contain w-auto h-[3rem]' />
      </div>

      <form onSubmit={handleSubmit} className='h-3 w-full flex items-center justify-center '>

        <div className='ml-5 sm:hidden'>
          <img src={minimalLogo} alt='search spring logo' style={{ height: '2rem' }} />
        </div>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for products..."
          className=" flex-1 px-4  py-2 border-none rounded-md focus:outline-none  "
        />
        <button
          type="submit"

          className="px-4 py-2 cursor-pointer mr-3"
        >
          <LuSearch color='#4532CF' size={30} />
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>

  );
}
