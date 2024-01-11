import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IRecruitmentPost } from "../@types/recruitmentPost.type";
import { axiosInstanceNoAuth } from "../config/https.config";
const QUERY_KEY = "RecruitmentPostQuery";

export const useSearchRecruitmentPost = (onSuccessHandle?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { value: string }) =>
      axiosInstanceNoAuth.post<IRecruitmentPost[]>(
        "/recruitmentPosts/search",
        body
      ),
    onSuccess: (data) => {
      if (!data) return;
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      if (onSuccessHandle) onSuccessHandle();
      toast.success("Tìm kiếm thành công!");
    },
    onError: (err: any) => {
      console.log(err);
      toast.error("Tìm kiếm thất bại!");
    },
  });
};

export const useGetListRecruitmentPost = (
  options?: Partial<UseQueryOptions>
) => {
  return useQuery({
    queryKey: [QUERY_KEY, "get-all"],
    queryFn: () =>
      axiosInstanceNoAuth.get<IRecruitmentPost[]>("/recruitmentPosts"),
    select(data) {
      return data;
    },
    enabled: options?.enabled,
  });
};

export const useGetListRecruitmentPostDetail = (
  id: number,
  options?: Partial<UseQueryOptions>
) => {
  return useQuery({
    queryKey: [QUERY_KEY, "get-detail"],
    queryFn: () =>
      axiosInstanceNoAuth.get<IRecruitmentPost>(`/recruitmentPosts/${id}`),
    select(data) {
      return data;
    },
    enabled: options?.enabled,
  });
};

export const useGetDetailRecruitmentPost = (
  id: number,
  options?: Partial<UseQueryOptions>
) => {
  return useQuery({
    queryKey: [QUERY_KEY, "get-detail"],
    queryFn: () =>
      axiosInstanceNoAuth.get<IRecruitmentPost>(`/recruitmentPosts/${id}`),
    select(data) {
      return data;
    },
    enabled: options?.enabled,
  });
};

export const useApplyRecruitment = (onSuccessHandle?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      recruitmentPost_id: number;
      content: string;
      CV: string;
    }) => axiosInstanceNoAuth.post<any>("/recruitmentPosts/apply", body),
    onSuccess: (data) => {
      if (!data) return;
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      if (onSuccessHandle) onSuccessHandle();
      toast.success("Đăng ký thành công!");
    },
    onError: (err: any) => {
      console.log(err);
      toast.error("Đăng ký thất bại!");
    },
  });
};
