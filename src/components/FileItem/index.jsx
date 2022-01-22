import {useEffect, useState} from "react"
import {Image, notification} from "antd"
import {deleteFile} from "../../axios"
import "./index.css"

const Index = function (props) {
	const {file, path, className, fileClick, fileDoubleClick, getData, context} = props
	const [menuData] = useState(["复制链接", "加入收藏", "删除"])
	const [menuState, setMenuState] = useState(false)
	const [menuTop, setMenuTop] = useState(0)
	const [menuLeft, setMenuLeft] = useState(0)
	const [imgType] = useState([".jpg", ".png", ".gif"])

	const menuItemClick = (name, contextFile) => {
		if (name === "复制链接") {
			navigator.clipboard.writeText(`${path}/${contextFile.name}`).then(() => {
				notification.success({
					message: "媒体消息",
					description: "文件链接复制成功",
				})
			})
		} else if (name === "加入收藏") {
			const fileData = JSON.parse(window.sessionStorage.getItem("fileData"))
			if (fileData !== null) {
				fileData.push(contextFile)
				window.sessionStorage.setItem("fileData", JSON.stringify(fileData))
			} else {
				window.sessionStorage.setItem("fileData", JSON.stringify([contextFile]))
			}
		} else if (name === "删除") {
			deleteFile({path: `${path}/${contextFile.name}`}).then((res) => {
				getData()
				notification.success({
					message: "媒体消息",
					description: res.data.message,
				})
			})
		}
	}
	const contextMenuShow = (e) => {
		document.oncontextmenu = () => {
			return false
		}
		if (file.type !== "" && context) {
			setMenuTop(e.clientY)
			setMenuLeft(e.clientX)
			setMenuState(true)
		}
	}

	useEffect(() => {}, [])

	return (
		<div className="file-item-context">
			<div
				className={`file-item ${className}`}
				onContextMenu={contextMenuShow}
				onBlur={() => setMenuState(false)}
				onClick={fileClick}
				onKeyDown={fileClick}
				onDoubleClick={fileDoubleClick}
				role="button"
				tabIndex="0"
			>
				{imgType.indexOf(file.type) !== -1 ? (
					<Image
						src={`/upload${path}/${file.name}`}
						width={100}
						height={100}
						preview={{
							mask: "预览",
						}}
					/>
				) : (
					<i className={file.type === "" ? "folder-icon" : "unknown-icon"} />
				)}
				<span>{file.name}</span>
			</div>
			<div className="context" style={{top: menuTop, left: menuLeft, display: menuState ? "block" : "none"}}>
				{menuData.map((v) => {
					return (
						<div
							className="item"
							onMouseDown={() => menuItemClick(v, file)}
							onKeyDown={() => menuItemClick(v, file)}
							role="button"
							tabIndex="0"
							key={v}
						>
							{v}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Index
