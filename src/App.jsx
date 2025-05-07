import React from "react";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className='min-h-screen bg-zinc-50 relative'>
      <div className='bg-gradient-to-b from-violet-100 to-zinc-50 h-[6rem] absolute w-full top-0 -z-0'></div>
      <Home />
    </div>
  );
}
