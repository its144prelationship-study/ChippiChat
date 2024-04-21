import { LocalStorageUtils } from "../../../common/utils/LocalStorageUtil"
import { LoginSchema } from "../types/LoginType"
import { environment } from "../../../common/constants/environment";

export const LoginService = {
	login: async (loginInfo: LoginSchema) => {
		const response = await fetch(`${environment.backend}/api/user/login`, {
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
		window.location.href = "/login";
	}
}