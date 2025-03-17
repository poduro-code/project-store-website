import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("http://localhost:5001/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    if (!res.ok) {
      const errData = await res.json();
      return { success: false, message: errData.message || "Bad Request" };
    }
    const data = await res.json();
    set((state) => ({
      products: Array.isArray(state.products)
        ? [...state.products, data.data]
        : [data.data],
    }));
    return { success: true, message: "Product created successfully" };
  },
  fetchProducts: async () => {
    try {
      const res = await fetch("http://localhost:5001/api/products");
      if (!res.ok) {
        console.error("Failed to fetch products");
        return;
      }
      
      const data = await res.json();
      console.log("Fetched products:", data);

      set({ products: Array.isArray(data.products) ? data.products : [] });
      console.log("Updated store:", get().products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  deleteProduct: async (productId) => {
    const res = await fetch(`http://localhost:5001/api/products/${productId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    
    set((state) => ({
      products: state.products.filter((product) => product._id !== productId) }));
      return { success: true, message: data.message };
  },
}));