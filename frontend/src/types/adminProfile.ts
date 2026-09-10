export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminProfileResponse {
  success: boolean;
  message: string;
  data: AdminProfile;
}

export interface UpdateProfilePayload {
  name?: string;
  profileImage?: File;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface BasicResponse {
  success: boolean;
  message: string;
}
