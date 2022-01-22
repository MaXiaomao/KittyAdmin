import {useEffect, useState} from "react"
import {Form, Input, Modal, notification, Tag} from "antd"
import TitleBlock from "../../components/TitleBlock"
import {randomColor} from "../../config/plugIn"
import {postLabel, getLabel, deleteLabel, putLabel} from "../../axios/index"
import "./index.css"

const Index = function () {
	const [labelName, setLabelName] = useState("")
	const [labelLoading, setLabelLoading] = useState(false)
	const [labelData, setLabelData] = useState([])
	const [modalState, setModalState] = useState(false)
	const [modalLoading, setModalLoading] = useState(false)
	const [editId, setEditId] = useState(0)
	const [modalForm] = Form.useForm()

	const labelGet = () => {
		getLabel().then((res) => {
			setLabelData(res.data.data)
		})
	}
	const labelAdd = (value) => {
		if (value !== "") {
			setLabelLoading(true)
			postLabel({name: value}).then((res) => {
				notification.success({
					message: "标签消息",
					description: res.data.message,
				})
				labelGet()
				setLabelName("")
				setLabelLoading(false)
			})
		}
	}
	const labelDelete = (value, e) => {
		e.preventDefault()
		deleteLabel({id: value.id}).then((res) => {
			notification.success({
				message: "标签消息",
				description: res.data.message,
			})
			labelGet()
		})
	}
	const editClick = (value) => {
		setEditId(value.id)
		modalForm.setFieldsValue({...value})
		setModalState(true)
	}
	const modalReturn = () => {
		modalForm.resetFields()
		setModalState(false)
	}
	const handleOk = () => {
		modalForm.validateFields().then(
			() => {
				setModalLoading(true)
				putLabel({...modalForm.getFieldsValue(), id: editId}).then((res) => {
					notification.success({
						message: "标签消息",
						description: res.data.message,
					})
					labelGet()
					setModalState(false)
					setModalLoading(false)
				})
			},
			(err) => {
				console.log(err)
			}
		)
	}

	useEffect(() => {
		labelGet()
	}, [])

	return (
		<div className="label">
			<div className="main-block">
				<TitleBlock title="标签管理">
					<Input.Search
						className="label-add"
						value={labelName}
						enterButton="添加"
						onSearch={labelAdd}
						onChange={(e) => setLabelName(e.target.value)}
						loading={labelLoading}
						placeholder="请输入标签名称"
					/>
				</TitleBlock>
				<div className="label-list">
					{labelData.map((v) => {
						return (
							<Tag
								onClose={(e) => labelDelete(v, e)}
								onClick={() => editClick(v)}
								color={randomColor()}
								closable
								key={v.id}
							>
								{v.name}
							</Tag>
						)
					})}
				</div>
				<Modal
					title="编辑标签"
					visible={modalState}
					onOk={handleOk}
					confirmLoading={modalLoading}
					onCancel={modalReturn}
				>
					<Form preserve={false} form={modalForm}>
						<Form.Item label="名称" name="name" rules={[{required: true, message: "请输入标签名称"}]}>
							<Input placeholder="请输入标签名称" />
						</Form.Item>
					</Form>
				</Modal>
			</div>
		</div>
	)
}

export default Index
