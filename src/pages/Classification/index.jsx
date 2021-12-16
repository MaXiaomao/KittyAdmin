import {useEffect, useRef, useState} from "react"
import PubSub from "pubsub-js"
import {Button, Modal, Input, Table, Form, Row, Col, InputNumber, Popconfirm} from "antd"
import TitleBlock from "../../components/TitleBlock"
import "./index.css"

const Index = function () {
	const [tableHeight, setTableHeight] = useState(0)
	const [dataSource, setDataSource] = useState([])
	const [modalState, setModalState] = useState(false)
	const [modalLoading, setModalLoading] = useState(false)
	const tableBlock = useRef()
	const [modalForm] = Form.useForm()

	const modalFormReturn = () => {
		modalForm.resetFields()
		setModalState(false)
	}
	const modalFormPass = () => {
		modalForm.validateFields().then(
			() => {
				setModalLoading(true)
				setTimeout(() => {
					console.log(modalForm.getFieldsValue())
					modalFormReturn()
					setModalLoading(false)
				}, 3000)
			},
			(err) => {
				console.log(err)
			}
		)
	}
	const tableItemOperate = (bool, value) => {
		if (bool) {
			setModalState(true)
			modalForm.setFieldsValue({...value})
		} else {
			console.log("删除分类ID：", value.id)
		}
	}

	useEffect(() => {
		PubSub.publish("pageName", "分类管理")
		setTableHeight(tableBlock.current.offsetHeight - 85)
		setDataSource([
			{
				id: "1",
				sort: 2,
				title: "学习记录",
				article_number: 22,
				time: "2020-11-29 18:00:00",
			},
		])
	}, [])

	return (
		<div className="classification">
			<div className="main-block">
				<TitleBlock title="分类管理">
					<Button onClick={() => setModalState(true)} type="primary">
						添加分类
					</Button>
					<Button danger>更新排序</Button>
				</TitleBlock>
				<div className="table-block" ref={tableBlock}>
					<Table dataSource={dataSource} scroll={{y: tableHeight}} bordered pagination={false} rowKey="id">
						<Table.Column
							title="分类排序"
							dataIndex="sort"
							width={150}
							align="center"
							key="id"
							render={(sort) => (
								<Input value={sort} size="small" bordered={false} style={{textAlign: "center"}} />
							)}
						/>
						<Table.Column title="文章数量" dataIndex="article_number" width={150} align="center" key="id" />
						<Table.Column title="创建时间" dataIndex="time" width={300} align="center" key="id" />
						<Table.Column title="分类名称" dataIndex="title" key="id" />
						<Table.Column
							title="操作"
							width={150}
							key="id"
							render={(value) => (
								<>
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
				title="添加分类"
				visible={modalState}
				onOk={modalFormPass}
				onCancel={modalFormReturn}
				confirmLoading={modalLoading}
			>
				<Form preserve={false} form={modalForm}>
					<Row justify="space-between" gutter={15}>
						<Col span={16}>
							<Form.Item label="名称" name="title" rules={[{required: true, message: "请输入分类名称"}]}>
								<Input placeholder="请输入分类名称" />
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="排序" name="sort" initialValue={0}>
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
