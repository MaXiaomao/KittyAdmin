import {useEffect, useState} from "react"
import {Button, Modal, Upload} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import TitleBlock from "../../components/TitleBlock"
import FileItem from "../../components/FileItem"
import "./index.css"

const Index = function () {
	const [fileData, setFileData] = useState([])
	const [modalUploadState, setModalUploadState] = useState(false)
	const [uploadFileList, setUploadFileList] = useState([])
	const [path, setPath] = useState([])

	const modalUploadPass = () => {}
	const modalUploadReturn = () => {
		setModalUploadState(false)
	}
	const pathConcat = (file) => {
		if (file.type === "") {
			setPath((value) => [...value, file.filename])
		}
	}
	const pathReturn = () => {
		if (path.length > 0) {
			setPath((value) => value.slice(0, -1))
		}
	}

	useEffect(() => {
		setFileData([
			{
				filename: "1",
				isDirectory: true,
				createTime: "2021-03-23T06:07:30.409Z",
				size: "4.00KB",
				type: "",
				url: "",
			},
			{
				filename: "2020",
				isDirectory: true,
				createTime: "2020-12-28T15:17:32.055Z",
				size: "4.00KB",
				type: "",
				url: "",
			},
			{
				filename: "2021",
				isDirectory: true,
				createTime: "2021-12-07T14:32:19.318Z",
				size: "4.00KB",
				type: "",
				url: "",
			},
			{
				filename: "7897",
				isDirectory: true,
				createTime: "2021-12-17T03:04:28.675Z",
				size: "4.00KB",
				type: "",
				url: "",
			},
			{
				filename: "hello",
				isDirectory: true,
				createTime: "2021-04-06T12:47:40.072Z",
				size: "4.00KB",
				type: "",
				url: "",
			},
			{
				filename: "tt",
				isDirectory: true,
				createTime: "2021-11-10T08:27:44.925Z",
				size: "4.00KB",
				type: "",
				url: "",
			},
			{
				filename: "测试目录",
				isDirectory: true,
				createTime: "2021-08-12T18:01:51.444Z",
				size: "4.00KB",
				type: "",
				url: "",
			},
			{
				filename: "QQ图片20210527172847.gif",
				isDirectory: false,
				createTime: "2021-06-03T06:39:52.694Z",
				size: "93.65KB",
				type: "image/gif",
				url: "/api/nkm-cms/readFile?path=/upload/QQ图片20210527172847.gif",
			},
			{
				filename: "file-icon.zip",
				isDirectory: false,
				createTime: "2021-02-05T17:47:46.191Z",
				size: "12.76KB",
				type: "application/zip",
				url: "/api/nkm-cms/readFile?path=/upload/file-icon.zip",
			},
			{
				filename: "下载.jpg",
				isDirectory: false,
				createTime: "2021-03-19T03:34:54.369Z",
				size: "31.08KB",
				type: "image/jpeg",
				url: "/api/nkm-cms/readFile?path=/upload/下载.jpg",
			},
			{
				filename: "微信图片_202010221547513.jpg",
				isDirectory: false,
				createTime: "2021-03-18T10:12:16.753Z",
				size: "155.91KB",
				type: "image/jpeg",
				url: "/api/nkm-cms/readFile?path=/upload/微信图片_202010221547513.jpg",
			},
		])
	}, [path])

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{marginTop: 8}}>Upload</div>
		</div>
	)
	return (
		<div className="media">
			<div className="main-block">
				<TitleBlock title="媒体管理">
					<Button onClick={() => setModalUploadState(true)} type="primary">
						上传文件
					</Button>
				</TitleBlock>
				<div className="file-list">
					{fileData.map((v) => {
						return <FileItem file={v} fileClick={() => pathConcat(v)} context key={v.filename} />
					})}
				</div>
				<div className="file-config">
					<div className="file-border">
						<div>
							<span onClick={pathReturn} role="button" tabIndex="0">
								返回上一级
							</span>
							<i>|</i>
							{path.length === 0 ? "/" : `/${path.join("/")}`}
						</div>
						<div>已加载全部，共{fileData.length}个项目</div>
					</div>
				</div>
			</div>
			<Modal title="文件上传" visible={modalUploadState} onOk={modalUploadPass} onCancel={modalUploadReturn}>
				<Upload
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					listType="picture-card"
					fileList={uploadFileList}
					onChange={() => setUploadFileList(fileList)}
				>
					{uploadFileList.length >= 8 ? null : uploadButton}
				</Upload>
			</Modal>
		</div>
	)
}

export default Index
