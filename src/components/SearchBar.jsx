import { useState } from 'react';

import logo from '../assets/Searchspring-logo.png'
import { LuSearch } from "react-icons/lu";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);

    }
  };

  return (

    <div className='
shadow-[0px_1px_100px_-12px_rgba(0,_0,_0,_0.3)]
    mb-2 px-1 bg-white rounded-full h-[4.5rem] border border-[#b5b0e2] w-full lg:w-[55rem]  flex justify-between items-center '>

      <div className='ml-5'>
        <img src={logo} alt='search spring logo' style={{ height: '3rem' }} />
      </div>
      <form onSubmit={handleSubmit} className='h-3 flex items-center justify-center'>


        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for products..."
          className=" flex-1 px-4  py-2 border-none rounded-md focus:outline-none  "
        />
        <button
          type="submit"

          className="px-4 py-2 cursor-pointer mr-5"
        >
          <LuSearch color='#4532CF' size={30} />
        </button>
      </form>
    </div>

  );
}
