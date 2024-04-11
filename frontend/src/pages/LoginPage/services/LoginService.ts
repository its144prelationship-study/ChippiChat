import { UserLoginSchema } from "../types/LoginType"

export const LoginService = {
  loginUser: async (loginInfo: UserLoginSchema) => {
    const response = await fetch(`http://localhost:5789/api/user/login`, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response.json()
  }
}