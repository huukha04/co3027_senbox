import axiosInstance from "@/api/axiosInstance"

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type AuthResponse = {
  success: true
  data: {
    accessToken: string
    tokenType: "Bearer"
    user: {
      id: string
      name: string
      email: string
      role: "customer"
    }
  }
}

function callAuthApiInBackground(
  endpoint: string,
  payload?: LoginPayload | RegisterPayload,
) {
  const request = payload
    ? axiosInstance.post(endpoint, payload)
    : axiosInstance.post(endpoint)

  void request.catch((error: unknown) => {
    console.warn(`Auth request to ${endpoint} did not complete; continuing with demo data.`, error)
  })
}

function createSampleResponse(name: string, email: string): AuthResponse {
  return {
    success: true,
    data: {
      accessToken: "sample-access-token",
      tokenType: "Bearer",
      user: {
        id: "sample-customer",
        name,
        email,
        role: "customer",
      },
    },
  }
}

export function loginWithSampleResponse(
  payload: LoginPayload,
): AuthResponse {
  callAuthApiInBackground("/auth/login", payload)
  return createSampleResponse(payload.email.split("@")[0] || "Customer", payload.email)
}

export function registerWithSampleResponse(
  payload: RegisterPayload,
): AuthResponse {
  callAuthApiInBackground("/auth/register", payload)
  return createSampleResponse(payload.name, payload.email)
}

