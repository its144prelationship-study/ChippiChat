import { RegisterSchema, UpdateUserSchema } from "../types/RegisterType";
import { environment } from "../../../common/constants/environment";

export const RegisterService = {
    validateUsername: async (username:string) => {
        try {
            const response = await fetch(`${environment.backend.url}/api/user/validateUsername/${username}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            if (!data.data) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    },
    createUser: async (registerInfo : RegisterSchema) => {
        try {
            const response = await fetch(`${environment.backend.url}/api/user/`, {
                method: "POST",
                body: JSON.stringify(registerInfo),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse.success;
        } catch (err) {
            return false;
        }
    },
    updateUser: async (updateUserInfo : UpdateUserSchema,userId : string) => {
        try {
            const response = await fetch(`${environment.backend.url}/api/user/${userId}`,{
                method: "PUT",
                body: JSON.stringify(updateUserInfo),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const jsonResponse = await response.json();
            return jsonResponse.success;
        } catch (err) {
            return false;
        }
    }
}