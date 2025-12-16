import {
  getMyWishlists,
  toggleWishlistItem,
} from "@/services/wishlist.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const useWishlists = () =>
  useQuery({
    queryKey: ["wishlists"],
    queryFn: getMyWishlists,
  });

const useToggleWishlistItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlists"] });
      console.log(19);
    },
  });
};

export { useWishlists, useToggleWishlistItem };
