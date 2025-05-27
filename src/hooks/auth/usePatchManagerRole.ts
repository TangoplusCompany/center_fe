import { patchCenterManagerRole } from "@/services/center/patchCenterManagerRole";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePatchManagerRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchCenterManagerRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["ManagerDetails"] });
    },
  });
};
