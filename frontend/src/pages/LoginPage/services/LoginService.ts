import { LocalStorageUtils } from "../../../common/utils/LocalStorageUtil"
import { LoginSchema } from "../types/LoginType"

export const LoginService = {
	login: async (loginInfo: LoginSchema) => {
		const response = await fetch(`http://localhost:5789/api/user/login`, {
		method: "POST",
		body: JSON.stringify(loginInfo),
		headers: {
			"Content-Type": "application/json"
		}
		});
		return response.json();
	},
	logout: async () => {
		LocalStorageUtils.removeData("token");
		LocalStorageUtils.removeData("username");
		window.location.href = "/login";
	}
}