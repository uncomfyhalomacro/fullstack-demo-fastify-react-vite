import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../../api/auth/profile.js";

export function useUser() {
	return useQuery({
		queryKey: ["user"],
		queryFn: fetchUserProfile,
		retry: false,
		staleTime: 5 * 60 * 1000,
	});
}
