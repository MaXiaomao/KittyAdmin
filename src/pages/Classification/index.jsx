import {useEffect, useRef, useState} from "react"
import moment from "moment"
import PubSub from "pubsub-js"
import {Button, Modal, Input, Table, Form, Row, Col, InputNumber, Popconfirm, notification} from "antd"
import TitleBlock from "../../components/TitleBlock"
import {postClassify, deleteClassify, putClassify, getClassify, putQueue} from "../../axios"
import "./index.css"

const Index = function () {
	const [tableHeight, setTableHeight] = useState(0)
	const [editId, setEditId] = useState(0)
	const [dataSource, setDataSource] = useState([])
	const [modalTitle, setModalTitle] = useState("添加分类")
	const [modalState, setModalState] = useState(false)
	const [modalLoading, setModalLoading] = useState(false)
	const tableBlock = useRef()
	const [modalForm] = Form.useForm()

	const classifyGet = () => {
		getClassify().then((res) => {
			setDataSource(res.data.data)
		})
	}
	const modalFormReturn = () => {
		modalForm.resetFields()
		setModalState(false)
		setModalTitle("添加分类")
	}
	const modalFormPass = () => {
		modalForm.validateFields().then(
			() => {
				setModalLoading(true)
				if (modalTitle === "添加分类") {
					postClassify(modalForm.getFieldsValue()).then((res) => {
						notification.success({
							message: "分类消息",
							description: res.data.message,
						})
						classifyGet()
						modalFormReturn()
						setModalLoading(false)
					})
				} else {
					putClassify({...modalForm.getFieldsValue(), id: editId}).then((res) => {
						notification.success({
							message: "分类消息",
							description: res.data.message,
						})
						classifyGet()
						modalFormReturn()
						setModalLoading(false)
					})
				}
			},
			(err) => {
				console.log(err)
			}
		)
	}
	const tableItemOperate = (bool, value) => {
		if (bool) {
			setModalTitle("编辑分类")
			setModalState(true)
			setEditId(value.id)
			modalForm.setFieldsValue({...value})
		} else {
			console.log("删除分类ID：", value.id)
			deleteClassify({id: value.id}).then((res) => {
				notification.success({
					message: "分类消息",
					description: res.data.message,
				})
				classifyGet()
			})
		}
	}
	const queueUpdateItem = (e, value) => {
		const newDate = [...dataSource]
		const queue = parseInt(e.target.value, 10)
		const index = newDate.findIndex((v) => value.id === v.id)
		console.log()
		if (!Number.isNaN(queue)) {
			newDate[index].queue = queue
			setDataSource(newDate)
		}
	}
	const queueUpdateBtn = () => {
		const params = []
		dataSource.forEach((v) => {
			params.push({
				id: v.id,
				name: v.name,
				queue: v.queue,
			})
		})
		putQueue({data: params}).then((res) => {
			notification.success({
				message: "分类消息",
				description: res.data.message,
			})
			classifyGet()
		})
	}

	useEffect(() => {
		PubSub.publish("pageName", "分类管理")
		setTableHeight(tableBlock.current.offsetHeight - 85)
		classifyGet()
	}, [])

	return (
		<div className="classification">
			<div className="main-block">
				<TitleBlock title="分类管理">
					<Button onClick={() => setModalState(true)} type="primary">
						添加分类
					</Button>
					<Button onClick={queueUpdateBtn} danger>
						更新排序
					</Button>
				</TitleBlock>
				<div className="table-block" ref={tableBlock}>
					<Table dataSource={dataSource} scroll={{y: tableHeight}} bordered pagination={false} rowKey="id">
						<Table.Column
							title="分类排序"
							dataIndex="queue"
							width={150}
							align="center"
							key="id"
							render={(queue, record) => (
								<Input
									value={queue}
									onChange={(e) => queueUpdateItem(e, record)}
									bordered={false}
									size="small"
									style={{textAlign: "center"}}
								/>
							)}
						/>
						<Table.Column title="文章数量" dataIndex="total" width={150} align="center" key="id" />
						<Table.Column
							title="创建时间"
							dataIndex="date_time"
							width={300}
							align="center"
							key="id"
							render={(dateTime) => (
								<span>{moment.utc(dateTime).local().format("YYYY-MM-DD HH:mm:ss")}</span>
							)}
						/>
						<Table.Column title="分类名称" dataIndex="name" key="id" />
						<Table.Column
							title="操作"
							width={150}
							key="id"
							render={(value) => (
								<>
									{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
									<span
										onClick={() => tableItemOperate(true, value)}
										className="edit-btn"
										role="button"
									>
										编辑
									</span>
									<Popconfirm
										title="您确定要删除此分类吗？"
										placement="bottomRight"
										onConfirm={() => tableItemOperate(false, value)}
									>
										<span className="delete-btn">删除</span>
									</Popconfirm>
								</>
							)}
						/>
					</Table>
				</div>
			</div>
			<Modal
				title={modalTitle}
				visible={modalState}
				onOk={modalFormPass}
				onCancel={modalFormReturn}
				confirmLoading={modalLoading}
			>
				<Form preserve={false} form={modalForm}>
					<Row justify="space-between" gutter={15}>
						<Col span={16}>
							<Form.Item label="名称" name="name" rules={[{required: true, message: "请输入分类名称"}]}>
								<Input placeholder="请输入分类名称" />
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="排序" name="queue" initialValue={0}>
								<InputNumber min={0} max={10} style={{width: "100%"}} />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</div>
	)
}

export default Index
