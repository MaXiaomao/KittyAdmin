import Axios from "axios"

// import pacAxios from "./config.js"

export const Login = (params) => {
	return Axios.post("http://127.0.0.1:7001/api/user/login", params)
}
