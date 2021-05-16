export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userType: UserType | null;
  userDetails: UserDetails | null;
  error: ErrorResponse;
}

export interface UserDetails {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  image: string;
  email_verified_at: string | null;
  address: string | null;
  barangay: string;
  city: string;
  province: string;
  zip_code: string;
  role_id: number;
}

export type UserType = "buyer" | "seller";

export interface ErrorResponse {
  message: string;
  errors: {
    [index: string]: string[];
  };
}

export interface AuthResponse {
  user: UserDetails;
  token: string;
}

export interface LogoutResponse {
  message: string;
}