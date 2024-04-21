import { LocalStorageUtils } from "../../../common/utils/LocalStorageUtil"
import { LoginSchema } from "../types/LoginType"
import { environment } from "../../../common/constants/environment";
import { jwtDecode } from "jwt-decode";
import { TokenInfo } from "../../../common/types/AuthContextType";

export const LoginService = {
	login: async (loginInfo: LoginSchema) => {
		try {
			const response = await fetch(`${environment.backend.url}/api/user/login`, {
				method: "POST",
				body: JSON.stringify(loginInfo),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const jsonResponse = await response.json();
			const token = jsonResponse.data.token;

			LocalStorageUtils.setData("token", token);

			const decoded = jwtDecode<TokenInfo>(token);
			return decoded.user_id;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
}