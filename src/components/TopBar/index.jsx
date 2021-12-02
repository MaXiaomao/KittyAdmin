import {Breadcrumb, Avatar, Menu, Dropdown} from "antd"
import {HomeOutlined, UserOutlined, DownOutlined, KeyOutlined, PoweroffOutlined} from "@ant-design/icons"
import "./index.css"

const Index = function () {
	const onDropdownItem = ({key}) => {
		console.log(key)
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
				<Breadcrumb.Item>网站监控</Breadcrumb.Item>
			</Breadcrumb>
			<div className="user-info">
				<Avatar className="avatar-portrait" icon={<UserOutlined />} />
				<Dropdown overlay={menu}>
					<a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
						管理员 <DownOutlined />
					</a>
				</Dropdown>
			</div>
		</div>
	)
}

export default Index
