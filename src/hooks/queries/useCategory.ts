import {
  createCategory,
  deleteCategories,
  deleteCategory,
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  getCategorySelection,
  updateCategory,
} from "@/services/category.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const useCategories = (params: QueryParams) =>
  useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params),
  });
const useGetCategoryBySlug = (slug: string) =>
  useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategoryBySlug(slug),
  });
const useGetCategoryById = (id: number) =>
  useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
  });
const useCategorySelections = () =>
  useQuery({
    queryKey: ["category-selection"],
    queryFn: () => getCategorySelection(),
  });
const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
const useDeleteCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
export {
  useGetCategoryBySlug,
  useCategories,
  useCreateCategory,
  useDeleteCategories,
  useDeleteCategory,
  useMutation,
  useUpdateCategory,
  useCategorySelections,
  useGetCategoryById,
};
