'use client'
import { Category, Product } from "@/lib/types"
import React, { createContext, useContext, useEffect, useState } from "react"

type BikeFormContextProviderProps = {
  children: React.ReactNode;
  products: Product[];
  categories: Category[];
}

type BikeStateType = {
  originalProducts: Partial<Product>[];
  dinamicProducts: Partial<Product>[];
  selectedProducts: Partial<Product>[];
  actualStep: number;
  stepList:  Partial<Category>[];
  totalAmount: number;
}

type BikeFormContextType = {
  bikeContext: BikeStateType;
  setBikeContext: React.Dispatch<React.SetStateAction<BikeStateType>>;
}

const BikeFormContext = createContext<BikeFormContextType | null>(null);

export default function BikeFormProvider({ children, products, categories }: BikeFormContextProviderProps) {
  const [bikeContext, setBikeContext] = useState<BikeStateType>({
    originalProducts: [],
    dinamicProducts: [],
    selectedProducts: [],
    actualStep: 0,
    stepList: [],
    totalAmount: 0,
  })

  useEffect(() => {
    setBikeContext((prevContext) => ({
      ...prevContext,
      dinamicProducts: products,
      originalProducts: products,
    }));
  }, [products]);

  useEffect(() => {
    const categoriesWithoutProducts = categories.map(({ products, ...rest }) => rest)

    setBikeContext((prevContext) => ({
      ...prevContext,
      stepList: categoriesWithoutProducts,
    }));
  }, [categories]);


  return (
    <BikeFormContext.Provider 
      value={{ bikeContext, setBikeContext }}>
      {children}
    </BikeFormContext.Provider>
  )
}

export function useBikeFormContext() {
  const context = useContext(BikeFormContext)
  if (!context) {
    throw new Error('useBikeForm must be used within a BikeFormProvider')
  }

  return context
}