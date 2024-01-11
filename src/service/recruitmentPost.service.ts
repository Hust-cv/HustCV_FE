import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IRecruitmentPost } from "../@types/recruitmentPost.type";
import http from "@/app/utils/http";
const QUERY_KEY = "RecruitmentPostQuery";

export const useSearchRecruitmentPost = (onSuccessHandle?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { value: string }) =>
      http.postWithAutoRefreshToken(
        "/recruitmentPosts/search",
        body, { useAccessToken: false }
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
      http.getWithAutoRefreshToken("/recruitmentPosts", { useAccessToken: false }),
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
      http.getWithAutoRefreshToken(`/recruitmentPosts/${id}`, { useAccessToken: false }),
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
      http.getWithAutoRefreshToken(`/recruitmentPosts/${id}`, { useAccessToken: false }),
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
    }) => http.postWithAutoRefreshToken("/recruitmentPosts/apply", body, { useAccessToken: false }),
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
