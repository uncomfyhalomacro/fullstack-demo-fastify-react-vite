import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLogin } from "../../../api/auth/login.js";

export function useLogin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: fetchLogin,
		onSuccess: () => {
			// 🔥 refetch authenticated user
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});
}
