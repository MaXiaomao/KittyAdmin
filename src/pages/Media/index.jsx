import {useEffect, useState} from "react"
import {Button, Form, Input, Modal, notification, Upload} from "antd"
import {InboxOutlined} from "@ant-design/icons"
import TitleBlock from "../../components/TitleBlock"
import FileItem from "../../components/FileItem"
import {postFile, getFile, postFolder, deleteFile} from "../../axios"
import "./index.css"

const Index = function () {
	const [fileData, setFileData] = useState([])
	const [modalUploadState, setModalUploadState] = useState(false)
	const [modalLoading, setModalLoading] = useState(false)
	const [uploadList, setUploadList] = useState([])
	const [path, setPath] = useState([])
	const [folderState, setFolderState] = useState(false)
	const [folderLoading, setFolderLoading] = useState(false)
	const [itemCurrent, setItemCurrent] = useState("")
	const [folderForm] = Form.useForm()

	const fileGet = () => {
		getFile({path: path.length === 0 ? "/" : `/${path.join("/")}`}).then((res) => {
			setFileData(res.data)
		})
	}
	const modalUploadReturn = () => {
		setModalLoading(false)
		setModalUploadState(false)
		setUploadList([])
	}
	const modalUploadPass = () => {
		setModalLoading(true)
		const formData = new FormData()
		formData.append("path", path.length === 0 ? "/" : `/${path.join("/")}`)
		uploadList.forEach((file) => {
			formData.append("file", file)
		})
		postFile(formData).then((res) => {
			notification.success({
				message: "媒体消息",
				description: res.data.message,
			})
			modalUploadReturn()
			fileGet()
		})
	}
	const pathConcat = (file) => {
		if (file.type === "") {
			setPath((value) => [...value, file.name])
		}
	}
	const pathReturn = () => {
		if (path.length > 0) {
			setPath((value) => value.slice(0, -1))
		}
	}
	const uploadBefore = (_, fileList) => {
		if (uploadList.length < 5) {
			setUploadList([...uploadList, ...fileList])
		}
		return false
	}
	const onRemove = (file) => {
		const index = uploadList.indexOf(file)
		const newFileList = uploadList.slice()
		newFileList.splice(index, 1)
		setUploadList(newFileList)
	}
	const folderReturn = () => {
		setFolderLoading(false)
		setFolderState(false)
	}
	const folderPass = () => {
		folderForm.validateFields().then(
			() => {
				setFolderLoading(true)
				const folderName = folderForm.getFieldsValue().name
				const folderPath = path.length === 0 ? `/${folderName}` : `/${path.join("/")}/${folderName}`
				postFolder({path: folderPath}).then((res) => {
					notification.success({
						message: "媒体消息",
						description: res.data.message,
					})
					fileGet()
					folderReturn()
				})
			},
			(err) => {
				console.log(err)
			}
		)
	}
	const folderCurrent = (value) => {
		if (value.type === "") {
			setItemCurrent(value.name)
		} else {
			setItemCurrent("")
		}
	}
	const fileDelete = () => {
		if (itemCurrent !== "" && itemCurrent !== "Thumbnail") {
			const folderPath = path.length === 0 ? `/${itemCurrent}` : `/${path.join("/")}/${itemCurrent}`
			deleteFile({path: folderPath}).then((res) => {
				fileGet()
				notification.success({
					message: "媒体消息",
					description: res.data.message,
				})
			})
		}
	}

	useEffect(() => {
		fileGet()
		setItemCurrent("")
	}, [path])

	return (
		<div className="media">
			<div className="main-block">
				<TitleBlock title="媒体管理">
					<Button onClick={() => setFolderState(true)} type="primary">
						新建文件夹
					</Button>
					<Button onClick={() => setModalUploadState(true)} type="primary">
						上传文件
					</Button>
					<Button onClick={fileDelete}>删除文件夹</Button>
				</TitleBlock>
				<div className="file-list">
					{fileData.map((v) => {
						return (
							<FileItem
								className={itemCurrent === v.name ? "item-current" : ""}
								file={v}
								path={path.length === 0 ? "" : `/${path.join("/")}`}
								fileDoubleClick={() => pathConcat(v)}
								fileClick={() => folderCurrent(v)}
								getData={() => fileGet()}
								context
								key={v.name}
							/>
						)
					})}
				</div>
				<div className="file-config">
					<div className="file-border">
						<div>
							{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
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
			<Modal
				title="文件上传"
				visible={modalUploadState}
				onOk={modalUploadPass}
				onCancel={modalUploadReturn}
				confirmLoading={modalLoading}
				getContainer={false}
				width={601}
			>
				<Upload.Dragger
					className="m-upload"
					fileList={uploadList}
					onRemove={onRemove}
					beforeUpload={uploadBefore}
					listType="picture"
					accept=".jpg, .png, .gif, .zip, .docx, .pptx, .xlsx"
					multiple
				>
					<InboxOutlined style={{color: "#ff4475", fontSize: "40px"}} />
					<p>单击或拖动文件到此区域进行上传</p>
				</Upload.Dragger>
			</Modal>
			<Modal
				title="新建文件夹"
				visible={folderState}
				onOk={folderPass}
				onCancel={folderReturn}
				confirmLoading={folderLoading}
				getContainer={false}
			>
				<Form preserve={false} form={folderForm}>
					<Form.Item label="名称" name="name" rules={[{required: true, message: "请输入文件夹名称"}]}>
						<Input placeholder="请输入文件夹名称" />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

export default Index
