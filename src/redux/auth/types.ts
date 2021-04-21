export interface UserDetails {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  location: string;
}

export type UserType = "buyer" | "seller";

export interface ErrorResponse {
  message: string
}

export interface AuthResponse {
  user: UserDetails,
  token: string
}

// Define a type for the slice state
export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userType: UserType | null;
  userDetails: UserDetails | null;
  error: ErrorResponse;
}

export interface LogoutResponse {
  message: string
}