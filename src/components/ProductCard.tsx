import Link from 'next/link';
import type { Product } from '../types';
import Image from 'next/image';

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary group"
      aria-label={`View details for ${product.title}`}
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-xl bg-gray-50 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain w-full h-44 group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>
      {/* Divider below image */}
      <div className="border-b border-gray-100" />
      <div className="p-3 flex flex-col gap-1">
        <h2 className="text-base font-semibold text-gray-900 truncate" title={product.title}>
          {product.title}
        </h2>
        <div>
          <span
            className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600"
            title={toTitleCase(product.category)}
          >
            {toTitleCase(product.category)}
          </span>
        </div>
        <div className="text-lg font-bold text-primary">${product.price.toFixed(2)}</div>
        {product.rating && (
          <div className="flex items-center gap-1 text-sm text-yellow-600">
            <span aria-label="Rating" title={`Rated ${product.rating.rate} out of 5`}>
              ★
            </span>
            <span>{product.rating.rate}</span>
            <span className="text-xs text-gray-400">({product.rating.count})</span>
          </div>
        )}
      </div>
    </Link>
  );
}
