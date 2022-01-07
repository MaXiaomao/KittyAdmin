import Axios from "axios"
// import {notification} from "antd"

Axios.interceptors.request.use(
	(cof) => {
		return cof
	},
	(err) => {
		console.log(111)
		Promise.error(err)
	}
)

Axios.interceptors.response.use(
	(res) => {
		return Promise.resolve(res)
	},
	(err) => {
		return Promise.reject(err)
	}
)

const AxiosDoll = function (method, url, params = {}) {
	return Axios({
		method,
		url,
		baseURL: "http://127.0.0.1:7001",
		timeout: 3000,
		headers: {
			token: sessionStorage.getItem("token"),
		},
		...params,
	})
}

export default AxiosDoll
