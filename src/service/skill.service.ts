import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ISkills } from "../@types/skills.type";
import { axiosInstanceNoAuth } from "../config/https.config";

const QUERY_KEY = "SkillsQuery";

export const useGetListSkills = (options?: Partial<UseQueryOptions>) => {
  return useQuery({
    queryKey: [QUERY_KEY, "get-all"],
    queryFn: () => axiosInstanceNoAuth.get<ISkills[]>("/skills/getAllSkills"),
    select(data) {
      return data;
    },
    enabled: options?.enabled,
  });
};