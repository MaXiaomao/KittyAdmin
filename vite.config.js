import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import vitePluginImp from "vite-plugin-imp"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		vitePluginImp({
			libList: [
				{
					libName: "antd",
					style: (name) => `antd/lib/${name}/style/index.less`,
				},
			],
		}),
	],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				modifyVars: {
					"primary-color": "#ff4475",
					// @link-color: #1890ff; // 链接色
					"success-color": "#67c23a",
					"warning-color": "#e6a23c",
					"error-color": "#f56c6c",
					"font-size-base": "14px",
					"heading-color": "#333333",
					"text-color": "#666666",
					"text-color-secondary": "#999999",
					// "disabled-color": rgba(0, 0, 0, 0.25); // 失效色
					"border-radius-base": "5px",
					"border-color-base": "#e4e7ed",
					// "box-shadow-base": 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
					// 	0 9px 28px 8px rgba(0, 0, 0, 0.05); // 浮层阴影
				},
			},
		},
	},
})
