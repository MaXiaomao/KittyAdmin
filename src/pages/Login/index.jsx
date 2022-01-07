import {useEffect} from "react"
import {Navigate, useNavigate} from "react-router-dom"
import {Button, Form, Input, notification} from "antd"
import {UserOutlined, LockOutlined} from "@ant-design/icons"
import {Login} from "../../axios"
import "./index.css"

const Index = function () {
	const navigate = useNavigate()

	useEffect(() => {
		const token = window.sessionStorage.getItem("token")
		if (token !== null) {
			navigate("/")
		}
	}, [])

	const loginClick = (value) => {
		Login(value).then(
			(res) => {
				window.sessionStorage.setItem("token", res.data.token)
				navigate("/")
			},
			(err) => {
				notification.error({
					message: "登录提示",
					description: `${err.response.data.message}`,
				})
			}
		)
	}

	return (
		<div className="login">
			<div className="content">
				<div className="login-img" />
				<div className="login-form">
					<h3>Kitty博客管理系统</h3>
					<p>学习记录、分享生活、方便他人、丰富自身！</p>
					<Form className="m-form" onFinish={loginClick}>
						<Form.Item
							name="name"
							required={false}
							labelAlign="left"
							rules={[{required: true, message: "请输入用户名"}]}
						>
							<Input placeholder="请输入用户名" prefix={<UserOutlined />} />
						</Form.Item>

						<Form.Item
							name="password"
							required={false}
							labelAlign="left"
							rules={[{required: true, message: "请输入用户密码"}]}
						>
							<Input.Password placeholder="请输入用户密码" prefix={<LockOutlined />} />
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit" block>
								登录
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default Index
