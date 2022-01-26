import PubSub from "pubsub-js"
import {useNavigate} from "react-router-dom"
import {Breadcrumb, Avatar, Menu, Dropdown} from "antd"
import {HomeOutlined, UserOutlined, DownOutlined, KeyOutlined, PoweroffOutlined} from "@ant-design/icons"
import "./index.css"
import {useEffect, useState} from "react"

const Index = function () {
	const navigate = useNavigate()
	const [pageName, setPageName] = useState("")

	useEffect(() => {
		PubSub.subscribe("pageName", (_, value) => {
			setPageName(value)
		})
		return () => {
			PubSub.unsubscribe("pageName")
		}
	}, [])

	const onDropdownItem = ({key}) => {
		if (key === "1") {
			sessionStorage.removeItem("token")
			navigate("/login", {replaceState: true})
		}
	}

	const menu = (
		<Menu onClick={onDropdownItem}>
			<Menu.Item key="0">
				<KeyOutlined />
				修改密码
			</Menu.Item>
			<Menu.Item key="1">
				<PoweroffOutlined />
				退出登录
			</Menu.Item>
		</Menu>
	)
	return (
		<div className="top-bar">
			<Breadcrumb>
				<Breadcrumb.Item href="">
					<HomeOutlined />
				</Breadcrumb.Item>
				<Breadcrumb.Item>{pageName}</Breadcrumb.Item>
			</Breadcrumb>
			<div className="user-info">
				<Avatar className="avatar-portrait" icon={<UserOutlined />} />
				<Dropdown overlay={menu}>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
					<a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
						管理员 <DownOutlined />
					</a>
				</Dropdown>
			</div>
		</div>
	)
}

export default Index
