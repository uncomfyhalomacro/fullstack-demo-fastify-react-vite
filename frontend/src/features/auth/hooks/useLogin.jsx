import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLogin } from "../../../api/auth/login.js";

export function useLogin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (formData) => {
			return fetchLogin(formData);
		},
		onSuccess: (user) => {
			queryClient.setQueryData(["user"], user);
			queryClient.invalidateQueries(["products"]);
		},
	});
}
