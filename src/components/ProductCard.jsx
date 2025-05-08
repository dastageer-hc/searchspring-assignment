import { formatPrice } from "../utils/formatPrice";
import React from "react";
export default function ProductCard({ product }) {
  const { name, price, msrp, thumbnailImageUrl } = product;
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="border-4 cursor-pointer border-gray-50 rounded-xl  shadow-sm hover:shadow-lg hover:border-[#f1f0f2] transition w-full sm:w-64 bg-white overflow-clip">

      <div className="relative w-full h-[20rem]">
        <img
          src={thumbnailImageUrl}
          alt="Product"
          className="w-full h-full object-cover"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
            <svg className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col">

        {/* product name */}
        <h3 className="text-lg font-semibold mb-2 truncate">{name}</h3>

        <div className="text-gray-900 text-base ">
          <span>{formatPrice(price)}</span>
          {msrp && msrp > price && (
            <span className="line-through text-gray-500 ml-2">{formatPrice(msrp)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
