"use client";
import {
  createProduct,
  deleteProduct,
  deleteProducts,
  getProductById,
  getProducts2,
  getRelatedProducts,
  updateProduct,
} from "@/services/product.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const useProducts = (params: ProductQueryParams) =>
  useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts2(params),
  });
const useGetProductById = (id: number) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
const useRelatedProducts = (id: number) =>
  useQuery({
    queryKey: ["related product", id],
    queryFn: () => getRelatedProducts(id),
  });
const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
const useDeleteProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
export {
  useCreateProduct,
  useDeleteProducts,
  useDeleteProduct,
  useMutation,
  useProducts,
  useGetProductById,
  useUpdateProduct,
  useRelatedProducts,
};
