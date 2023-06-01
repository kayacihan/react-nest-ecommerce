import React, { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { ShoppingCartProvider } from "./ShoppingCartContext";
import { ProductProvider } from "./ProductContext";

type AppContextProviderProps = {
  children: ReactNode;
};

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  return (
    <AuthProvider>
      <ProductProvider>
        <ShoppingCartProvider>{children}</ShoppingCartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default AppContextProvider;
