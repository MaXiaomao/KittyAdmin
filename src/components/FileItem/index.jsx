import {Image} from "antd"
import "./index.css"

const Index = function (props) {
	const {file, className, onClick} = props
	return (
		<div className={`file-item ${className}`} onClick={onClick} onKeyDown={onClick} role="button" tabIndex="0">
			{file.type.indexOf("image") !== -1 ? (
				<Image src={`http://cms-test.xuanmo.xin${file.url}`} width={100} height={100} />
			) : (
				<i className={file.type === "" ? "folder-icon" : "unknown-icon"} />
			)}
			<span>{file.filename}</span>
		</div>
	)
}

export default Index
