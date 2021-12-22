import {useEffect, useState} from "react"
import {Image} from "antd"
import "./index.css"

const Index = function (props) {
	const {file, className, fileClick, context} = props
	const [menuData] = useState(["复制链接", "加入收藏", "删除"])
	const [menuState, setMenuState] = useState(false)
	const [menuTop, setMenuTop] = useState(0)
	const [menuLeft, setMenuLeft] = useState(0)

	const menuItemClick = (name, contextFile) => {
		if (name === "复制链接") {
			//
		} else if (name === "加入收藏") {
			const fileData = JSON.parse(window.sessionStorage.getItem("fileData"))
			if (fileData !== null) {
				fileData.push(contextFile)
				window.sessionStorage.setItem("fileData", JSON.stringify(fileData))
			} else {
				window.sessionStorage.setItem("fileData", JSON.stringify([contextFile]))
			}
		} else if (name === "删除") {
			//
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
				role="button"
				tabIndex="0"
			>
				{file.type.indexOf("image") !== -1 ? (
					<Image src={`http://cms-test.xuanmo.xin${file.url}`} width={100} height={100} />
				) : (
					<i className={file.type === "" ? "folder-icon" : "unknown-icon"} />
				)}
				<span>{file.filename}</span>
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
