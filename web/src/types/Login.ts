export interface LoginResponse {
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

export interface RegisterResponse {
  id: number
  token: string
}

export interface RefreshResponse {
  token: string
}
