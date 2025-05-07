import { formatPrice } from "../utils/formatPrice";

export default function ProductCard({ product }) {
  const { name, price, msrp, thumbnailImageUrl } = product;

  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition w-full sm:w-64">
      <img src={thumbnailImageUrl} alt={name} className="w-full h-48 object-contain mb-4" />
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <div className="text-gray-900 text-base">
        <span>{formatPrice(price)}</span>
        {msrp && msrp > price && (
          <span className="line-through text-gray-500 ml-2">{formatPrice(msrp)}</span>
        )}
      </div>
    </div>
  );
}
