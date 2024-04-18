import { RegisterSchema, UpdateUserSchema } from "../types/RegisterType";

export const RegisterService = {
    validateUsername: async (username:string) => {
        const response = await fetch(`http://localhost:5789/api/user/validateUsername/${username}`);
        console.log(response)
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if(!data.data){return true}
        else{return false};
    },
    createUser: async (registerInfo : RegisterSchema) => {
        const response = await fetch(`http://localhost:5789/api/user/`, {
		method: "POST",
		body: JSON.stringify(registerInfo),
		headers: {
			"Content-Type": "application/json"
		}
		});
		return response.json();
    },
    updateUser: async (updateUserInfo : UpdateUserSchema,userId : string) => {
        const response = await fetch(`http://localhost:5789/api/user/${userId}`,{
            method: "PUT",
            body: JSON.stringify(updateUserInfo),
		    headers: {
			    "Content-Type": "application/json"
		    }
        })
        return response.json();
    }
}