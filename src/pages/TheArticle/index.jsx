import {useEffect, useRef, useState} from "react"
import PubSub from "pubsub-js"
import ImgCrop from "antd-img-crop"
import MarkdownIt from "markdown-it"
import MdEditor from "react-markdown-editor-lite"
import {
	Button,
	Drawer,
	Form,
	Input,
	Pagination,
	Select,
	Space,
	Table,
	DatePicker,
	Row,
	Col,
	Upload,
	Modal,
	notification,
	Popconfirm,
} from "antd"
import {InboxOutlined} from "@ant-design/icons"
import moment from "moment"
import TitleBlock from "../../components/TitleBlock"
import Screening from "../../components/Screening"
import FileItem from "../../components/FileItem"
import "react-markdown-editor-lite/lib/index.css"
import "antd/es/modal/style"
import "antd/es/slider/style"
import {getClassify, getFile, getLabel, postArticle, getArticle, deleteArticle, putArticle} from "../../axios"
import "./index.css"

const Index = function () {
	const [screeningClassify, setScreeningClassify] = useState()
	const [screeningTitle, setScreeningTitle] = useState()
	const [dataSource, setDataSource] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [tableHeight, setTableHeight] = useState(0)
	const [visible, setVisible] = useState(false)
	const [modalThumbnailState, setModalThumbnailState] = useState(false)
	const [modalThumbnailLoading, setModalThumbnailLoading] = useState(false)
	const [thumbnailCurrent, setThumbnailCurrent] = useState("")
	const [fileData, setFileData] = useState([])
	const [formBody, setFormBody] = useState("")
	const [labelData, setLabelData] = useState([])
	const [classifyData, setClassifyData] = useState([])
	const [articleTotal, setArticleTotal] = useState(0)
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [drawerTitle, setDrawerTitle] = useState("添加文章")
	const [articleLoading, setArticleLoading] = useState(false)
	const [articleUpdateId, setArticleUpdateId] = useState(0)
	const [uploadList, setUploadList] = useState([])
	const tableBlock = useRef()
	const mdEditorRef = useRef()
	const [formRef] = Form.useForm()

	const articleGet = (classify = null, title = null) => {
		const params = {classify, title: title === "" ? null : title, page, pageSize, admin: true}
		getArticle(params).then((res) => {
			setDataSource(res.data.data)
			setArticleTotal(res.data.total)
		})
	}
	const screeningReturn = () => {
		setScreeningClassify(null)
		setScreeningTitle(null)
		articleGet()
	}
	const drawerFormReturn = () => {
		setVisible(false)
		formRef.resetFields()
		setFormBody("")
		setArticleLoading(false)
		setUploadList([])
		setDrawerTitle("添加文章")
	}
	const drawerFormPass = () => {
		formRef.validateFields().then(
			() => {
				setArticleLoading(true)
				if (drawerTitle === "添加文章") {
					postArticle({
						...formRef.getFieldsValue(),
						date_time: formRef.getFieldsValue().date_time
							? formRef.getFieldsValue().date_time.format("YYYY-MM-DD HH:mm:ss")
							: undefined,
						body: mdEditorRef.current.getMdValue(),
					}).then((res) => {
						notification.success({
							message: "文章消息",
							description: res.data.message,
						})
						articleGet()
						drawerFormReturn()
					})
				} else {
					putArticle({
						id: articleUpdateId,
						...formRef.getFieldsValue(),
						state: formRef.getFieldsValue().state === undefined ? 1 : formRef.getFieldsValue().state,
						date_time: formRef.getFieldsValue().date_time.format("YYYY-MM-DD HH:mm:ss"),
						body: mdEditorRef.current.getMdValue(),
					}).then((res) => {
						notification.success({
							message: "文章消息",
							description: res.data.message,
						})
						articleGet()
						drawerFormReturn()
					})
				}
			},
			(err) => {
				console.log(err)
			}
		)
	}
	const browseThumbnail = (_, event) => {
		// eslint-disable-next-line no-underscore-dangle
		if (event._reactName === "onClick") {
			setModalThumbnailLoading(true)
			getFile({path: "/Thumbnail"}).then((res) => {
				setFileData(res.data)
				setThumbnailCurrent(formRef.getFieldsValue().img_url)
				setModalThumbnailState(true)
				setModalThumbnailLoading(false)
			})
		}
	}
	const fileItemCurrent = (value) => {
		setThumbnailCurrent(value.name)
	}
	const modalThumbnailPass = () => {
		formRef.setFieldsValue({img_url: `/Thumbnail/${thumbnailCurrent}`})
		setModalThumbnailState(false)
	}
	const modalThumbnailReturn = () => {
		setModalThumbnailState(false)
	}
	const articleUpdate = (value) => {
		setDrawerTitle("编辑文章")
		setArticleUpdateId(value.id)
		formRef.setFieldsValue({
			...value,
			date_time: moment(value.date_time),
			state: value.state === 1 ? undefined : value.state,
		})
		setFormBody(value.body)
		setVisible(true)
	}
	const pageChange = (pageValue, pageSizeValue) => {
		setPage(pageValue)
		setPageSize(pageSizeValue)
	}
	const articleDelete = (value) => {
		deleteArticle({id: value}).then((res) => {
			notification.success({
				message: "文章消息",
				description: res.data.message,
			})
			articleGet()
		})
	}
	const uploadBefore = (file) => {
		const isType = file.type === "image/png" || file.type === "image/jpeg"
		const isSize = file.size / 1024 / 1024 < 1
		console.log(isType, isSize)
		if (!isType || !isSize) {
			notification.error({
				message: "媒体消息",
				description: "请上传小于1M的PNG或JPG格式图片",
			})
		} else {
			setUploadList([...uploadList, file])
		}
		return isType || isSize || Upload.LIST_IGNORE
	}

	useEffect(() => {
		PubSub.publish("pageName", "文章管理")
		setTableHeight(tableBlock.current.offsetHeight - 85)
		getLabel().then((res) => {
			setLabelData(res.data.data)
		})
		getClassify().then((res) => {
			setClassifyData(res.data.data)
		})
	}, [])
	useEffect(() => {
		articleGet()
	}, [page, pageSize])

	const mdParser = new MarkdownIt()
	const rowSelection = {
		selectedRowKeys,
		onChange: (selectId) => setSelectedRowKeys(selectId),
	}
	return (
		<div className="the-article">
			<Screening>
				<div>
					<Select
						value={screeningClassify}
						onChange={(value) => setScreeningClassify(value)}
						allowClear
						placeholder="请选择文章分类"
					>
						{classifyData.map((v) => {
							return (
								<Select.Option value={v.id} key={v.id}>
									{v.name}
								</Select.Option>
							)
						})}
					</Select>
					<Input
						value={screeningTitle}
						onChange={(e) => setScreeningTitle(e.target.value)}
						placeholder="请输入文章标题"
					/>
				</div>
				<div>
					<Button onClick={() => articleGet(screeningClassify, screeningTitle)} type="primary">
						查询
					</Button>
					<Button onClick={screeningReturn} danger>
						重置
					</Button>
				</div>
			</Screening>
			<div className="main-block">
				<TitleBlock title="文章管理">
					<Button onClick={() => setVisible(true)} type="primary">
						添加文章
					</Button>
					<Button onClick={() => articleDelete(selectedRowKeys)}>删除文章</Button>
				</TitleBlock>
				<div className="table-block" ref={tableBlock}>
					<Table
						dataSource={dataSource}
						rowSelection={rowSelection}
						scroll={{y: tableHeight}}
						bordered
						pagination={false}
						rowKey="id"
					>
						<Table.Column title="文章标题" dataIndex="title" width={300} key="id" />
						<Table.Column
							title="文章状态"
							dataIndex="state"
							width={200}
							align="center"
							key="id"
							render={(state) => (
								<div className="state-table">
									<i
										className={
											// eslint-disable-next-line no-nested-ternary
											state === 0
												? "state-icon state-err-icon"
												: state === 1
												? "state-icon"
												: "state-icon state-top-icon"
										}
									/>
									{/* eslint-disable-next-line no-nested-ternary */}
									<span>{state === 0 ? "隐藏" : state === 1 ? "显示" : "置顶"}</span>
								</div>
							)}
						/>
						<Table.Column title="浏览量" dataIndex="scan" width={150} align="center" key="id" />
						<Table.Column title="点赞数量" dataIndex="like" width={150} align="center" key="id" />
						<Table.Column
							title="标签数量"
							dataIndex="label"
							width={150}
							align="center"
							key="id"
							render={(label) => <span>{label.length}</span>}
						/>
						<Table.Column
							title="发布时间"
							dataIndex="date_time"
							key="id"
							render={(dateTime) => (
								<span>{moment.utc(dateTime).local().format("YYYY-MM-DD HH:mm:ss")}</span>
							)}
						/>
						<Table.Column
							title="操作"
							width={150}
							key="id"
							render={(value) => (
								<>
									{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
									<span onClick={() => articleUpdate(value)} className="edit-btn" role="button">
										编辑
									</span>
									<Popconfirm
										title="您确定要删除此文章吗？"
										placement="bottomRight"
										onConfirm={() => articleDelete([value.id])}
									>
										<span className="delete-btn">删除</span>
									</Popconfirm>
								</>
							)}
						/>
					</Table>
				</div>
				<div className="table-config">
					<div className="table-border">
						<div className="the-block">
							<span className="choose-num">选择数量：</span>
							{selectedRowKeys.length}/{dataSource.length}
						</div>
						<Pagination
							current={page}
							pageSize={pageSize}
							total={articleTotal}
							onChange={pageChange}
							showSizeChanger
							showQuickJumper
							showTotal={(total) => `共 ${total} 条`}
						/>
					</div>
				</div>
			</div>
			<Drawer
				title={drawerTitle}
				visible={visible}
				closable={false}
				getContainer={false}
				onClose={drawerFormReturn}
				width="70%"
				extra={
					<Space>
						<Button onClick={drawerFormPass} loading={articleLoading} type="primary">
							确定
						</Button>
						<Button onClick={drawerFormReturn}>取消</Button>
					</Space>
				}
			>
				<Row gutter={15}>
					<Col span={16}>
						<Form layout="vertical" form={formRef}>
							<Row gutter={15}>
								<Col span={12}>
									<Form.Item
										name="title"
										label="文章标题"
										rules={[{required: true, message: "请输入文章标题"}]}
									>
										<Input placeholder="请输入文章标题" />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name="classify"
										label="文章分类"
										rules={[{required: true, message: "请选择文章分类"}]}
									>
										<Select placeholder="请选择文章分类">
											{classifyData.map((v) => {
												return (
													<Select.Option value={v.id} key={v.id}>
														{v.name}
													</Select.Option>
												)
											})}
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={15}>
								<Col span={12}>
									<Form.Item
										name="label"
										label="文章标签"
										rules={[{required: true, message: "请选择文章标签"}]}
									>
										<Select mode="multiple" placeholder="请选择文章标签">
											{labelData.map((v) => {
												return (
													<Select.Option value={v.id} key={v.id}>
														{v.name}
													</Select.Option>
												)
											})}
										</Select>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item name="state" label="文章状态">
										<Select allowClear placeholder="请选择文章状态">
											<Select.Option value={3}>推荐</Select.Option>
											<Select.Option value={2}>置顶</Select.Option>
											<Select.Option value={0}>隐藏</Select.Option>
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={15}>
								<Col span={12}>
									<Form.Item name="date_time" label="发布时间">
										<DatePicker showTime style={{width: "100%"}} placeholder="请选择发布时间" />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item name="img_url" label="缩略图地址">
										<Input.Search
											allowClear
											enterButton="浏览"
											loading={modalThumbnailLoading}
											onSearch={browseThumbnail}
											placeholder="请选择或输入图片地址"
										/>
									</Form.Item>
								</Col>
							</Row>
							<Form.Item name="describe" label="文章描述">
								<Input.TextArea rows={4} placeholder="请输入文章描述" />
							</Form.Item>
						</Form>
					</Col>
					<Col span={8}>
						<ImgCrop aspect={1 / 0.7} grid quality={0.7}>
							<Upload.Dragger
								className="thumbnail-upload"
								fileList={uploadList}
								action="http://127.0.0.1:7001/api/file"
								data={{path: "/Thumbnail"}}
								beforeUpload={uploadBefore}
								maxCount={2}
								listType="picture"
								accept=".jpg, .png"
							>
								<InboxOutlined style={{color: "#ff4475", fontSize: "40px"}} />
								<p>单击或拖动文件到此区域进行上传</p>
							</Upload.Dragger>
						</ImgCrop>
					</Col>
				</Row>
				<MdEditor
					value={formBody}
					renderHTML={(text) => mdParser.render(text)}
					onChange={({text}) => setFormBody(text)}
					style={{height: "400px"}}
					ref={mdEditorRef}
				/>
			</Drawer>
			<Modal
				title="缩略图选择"
				visible={modalThumbnailState}
				getContainer={false}
				onOk={modalThumbnailPass}
				onCancel={modalThumbnailReturn}
				width={958}
			>
				<div className="file-list">
					{fileData.map((v) => {
						return (
							<FileItem
								file={v}
								path="/Thumbnail"
								fileClick={() => fileItemCurrent(v)}
								className={thumbnailCurrent === v.name ? "file-item-current" : ""}
								key={v.name}
							/>
						)
					})}
				</div>
			</Modal>
		</div>
	)
}

export default Index
