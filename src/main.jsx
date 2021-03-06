import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom"
import {ConfigProvider} from "antd"
import zhCN from "antd/lib/locale/zh_CN"
import App from "./app/App"
import "./config/main.css"

ReactDOM.render(
	<BrowserRouter>
		<ConfigProvider locale={zhCN}>
			<App />
		</ConfigProvider>
	</BrowserRouter>,
	document.getElementById("root")
)
