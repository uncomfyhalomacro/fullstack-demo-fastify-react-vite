import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../api/products/getProduct.js";

export const useGetProducts = ({ user_id, role }) => {
	return useQuery({
		queryKey: ["products", user_id, role],
		queryFn: () => getProducts({ user_id, role }),
		enabled: !!user_id && !!role,
	});
};
