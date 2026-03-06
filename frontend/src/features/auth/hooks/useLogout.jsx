import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLogout } from "../../../api/auth/logout.js";

export const useLogout = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: fetchLogout,

		onSuccess: () => {
			queryClient.invalidateQueries(["user"]);
			queryClient.setQueryData(["user"], null);
			queryClient.removeQueries(["products"]);
		},
	});
};
