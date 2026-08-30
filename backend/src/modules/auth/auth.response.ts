export interface ILoginResponse {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface IUpdatePasswordResponse{
  passwordHash : string
}