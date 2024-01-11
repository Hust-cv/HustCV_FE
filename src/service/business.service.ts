import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IBusiness } from "../@types/business.type";
import { axiosInstanceNoAuth } from "../config/https.config";

const QUERY_KEY = "BusinessQuery";

export const useGetListBusiness = (options?: Partial<UseQueryOptions>) => {
  return useQuery({
    queryKey: [QUERY_KEY, "get-all"],
    queryFn: () => axiosInstanceNoAuth.get<IBusiness[]>("/business"),
    select(data) {
      return data;
    },
    enabled: options?.enabled,
  });
};