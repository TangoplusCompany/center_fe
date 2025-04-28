import { deleteCenterManager } from "@/services/center/deleteCenterManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteManager = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCenterManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminList"] });
    },
  });
};
