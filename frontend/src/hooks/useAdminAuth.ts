import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  forgotPassword,
  getCurrentAdmin,
  loginAdmin,
  logoutAdmin,
  resetPassword,
} from "@/api/admin.api";

import { useAppDispatch } from "@/store/hook";
import { LoginRequest } from "@/types/admin";
import { clearAuth, setAdmin } from "@/store/slices/authSlice";

export const useAdminLogin = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => loginAdmin(data),

    onSuccess: (response) => {
      const admin = response.data.admin;

      // Update Redux
      dispatch(setAdmin(admin));

      // Update React Query cache
      queryClient.setQueryData(["current-admin"], admin);
    },
  });
};

export const useCurrentAdmin = () => {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ["current-admin"],
    queryFn: getCurrentAdmin,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // const admin = query.data
  // console.log("admin", admin)

  useEffect(() => {
    if (query.data) {
      dispatch(setAdmin(query.data));
    }

    if (query.isError) {
      dispatch(clearAuth());
    }
  }, [query.data, query.isError, dispatch]);

  return query;
};

export const useAdminLogout = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutAdmin,

    onSuccess: () => {
      // Clear Redux
      dispatch(clearAuth());

      // Remove current admin from React Query cache
      queryClient.removeQueries({
        queryKey: ["current-admin"],
      });
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};