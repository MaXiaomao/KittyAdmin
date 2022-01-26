import Axios from "axios"
import {useNavigate} from "react-router-dom"
import {notification} from "antd"

Axios.interceptors.request.use(
	(cof) => {
		return cof
	},
	(err) => {
		Promise.reject(err)
	}
)

Axios.interceptors.response.use(
	(res) => {
		return Promise.resolve(res)
	},
	(err) => {
		if (err.response.status === 400) {
			notification.warning({
				message: "系统消息",
				description: err.response.data.message,
			})
		} else if (err.response.status === 500) {
			notification.error({
				message: "系统消息",
				description: "服务器错误",
			})
		} else if (err.response.status === 401) {
			notification.error({
				message: "系统消息",
				description: "登录超时，即将退出",
			})
			sessionStorage.removeItem("token")
			const navigate = useNavigate()
			navigate("/login", {replaceState: true})
		}
		return Promise.reject(err)
	}
)

const AxiosDoll = function (method, url, params = {}) {
	return Axios({
		method,
		url,
		headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`},
		...params,
	})
}

export default AxiosDoll
