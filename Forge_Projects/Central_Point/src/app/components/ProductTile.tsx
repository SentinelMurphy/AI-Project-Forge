import { Clock } from "lucide-react";
import * as Avatar from "@radix-ui/react-avatar";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  source: string;
  collectedAt: Date;
  category: string;
}

interface ProductTileProps {
  product: Product;
  onClick: () => void;
}

export function ProductTile({ product, onClick }: ProductTileProps) {
  const formattedDate = product.collectedAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = product.collectedAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
      <div
          onClick={onClick}
          className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
      >
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <Avatar.Root className="w-full h-full">
            <Avatar.Image
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
            />
            <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              {product.category}
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
        <div className="p-4">
          <div className="mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase">
            {product.category}
          </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.source}
          </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>
            Collected: {formattedDate} at {formattedTime}
          </span>
          </div>
        </div>
      </div>
  );
}