import React from "react"
import {Link} from "react-router-dom"
import {Menu} from "antd"
import {
	BarChartOutlined,
	AppstoreAddOutlined,
	FileTextOutlined,
	AuditOutlined,
	SettingOutlined,
} from "@ant-design/icons"
import logo from "../../assets/logo.svg"
import "./index.css"

const Index = function () {
	const [navItemArr] = React.useState([
		{
			icon: <BarChartOutlined />,
			name: "网站监控",
			key: "monitoring",
		},
		{
			icon: <AppstoreAddOutlined />,
			name: "分类管理",
			key: "classification",
		},
		{
			icon: <FileTextOutlined />,
			name: "文章管理",
			key: "theArticle",
		},
		{
			icon: <AuditOutlined />,
			name: "评论审核",
			key: "comments",
		},
		{
			icon: <SettingOutlined />,
			name: "系统设置",
			key: "setUpThe",
		},
	])

	const onItemRouter = ({key}) => {
		console.log(key)
	}

	return (
		<div className="left-nav">
			<div className="logo-bar">博客管理系统</div>
			<div className="logo-date">
				<img src={logo} className="logo" alt="logo" />
				<span>2020年03月29日 13:08:19</span>
			</div>
			<Menu onClick={onItemRouter} defaultSelectedKeys="monitoring" inlineIndent={48} mode="inline">
				{navItemArr.map((v) => {
					return (
						<Menu.Item icon={v.icon} key={v.key}>
							<Link to={v.key}>{v.name}</Link>
						</Menu.Item>
					)
				})}
			</Menu>
		</div>
	)
}

export default Index
