type tokenType = 'access' | 'refresh';

export interface IPayload {
  id: string;
  email: string;
  type: tokenType;
}

export interface ICurrentUserResponse {
  id: string;
  name: string;
  email: string;
  profileImageUrl: string | null;
  profileImagePublicId?: string | null;
}
