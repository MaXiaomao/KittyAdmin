import {useEffect, useState} from "react"
import {Link, useLocation, matchRoutes} from "react-router-dom"
import {Menu} from "antd"
import {
	BarChartOutlined,
	AppstoreAddOutlined,
	FileTextOutlined,
	SettingOutlined,
	TagOutlined,
	PictureOutlined,
} from "@ant-design/icons"
import router from "../../router"
import logo from "../../config/images/logo.svg"
import "./index.css"

const Index = function () {
	const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(["/"])
	const [initStaTe, setInitStaTe] = useState(false)
	const [navItemArr] = useState([
		{
			icon: <BarChartOutlined />,
			name: "网站监控",
			key: "/",
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
			icon: <PictureOutlined />,
			name: "媒体管理",
			key: "media",
		},
		{
			icon: <TagOutlined />,
			name: "标签管理",
			key: "label",
		},
		{
			icon: <SettingOutlined />,
			name: "系统设置",
			key: "setUpThe",
		},
	])
	const location = useLocation()

	useEffect(() => {
		const routes = matchRoutes(router, location.pathname)
		setDefaultSelectedKeys([routes[1].route.path === undefined ? "/" : routes[1].route.path])
		setInitStaTe(true)
	}, [])

	if (!initStaTe) {
		return null
	}
	return (
		<div className="left-nav">
			<div className="logo-bar">博客管理系统</div>
			<div className="logo-date">
				<img src={logo} className="logo" alt="logo" />
				<span>2020年03月29日 13:08:19</span>
			</div>
			<Menu defaultSelectedKeys={defaultSelectedKeys} inlineIndent={48} mode="inline">
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
