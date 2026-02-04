import { useState, useMemo } from "react";
import { Header } from "@/app/components/Header";
import { Sidebar } from "@/app/components/Sidebar";
import { SearchBar } from "@/app/components/SearchBar";
import { SortControls, SortOption } from "@/app/components/SortControls";
import { ProductTile, Product } from "@/app/components/ProductTile";
import { mockProducts } from "@/app/data/mockProducts";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");
  const [recentViews, setRecentViews] = useState<string[]>([]);

  const handleProductClick = (product: Product) => {
    // Add to recent views (keep last 10)
    setRecentViews((prev) => {
      const updated = [product.name, ...prev.filter((name) => name !== product.name)];
      return updated.slice(0, 10);
    });
  };

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery]);

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    
    switch (sortOption) {
      case "price-asc":
        return products.sort((a, b) => a.price - b.price);
      case "price-desc":
        return products.sort((a, b) => b.price - a.price);
      case "date-asc":
        return products.sort((a, b) => a.collectedAt.getTime() - b.collectedAt.getTime());
      case "date-desc":
        return products.sort((a, b) => b.collectedAt.getTime() - a.collectedAt.getTime());
      default:
        return products;
    }
  }, [filteredProducts, sortOption]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onToggleSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        recentViews={recentViews}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Sort Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div>
            <SortControls value={sortOption} onChange={setSortOption} />
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductTile
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
