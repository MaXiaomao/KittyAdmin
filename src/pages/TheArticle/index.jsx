import {useEffect, useRef, useState} from "react"
import moment from "moment"
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
	Tag,
	Modal,
} from "antd"
import {InboxOutlined} from "@ant-design/icons"
import {randomColor} from "../../config/plugIn"
import TitleBlock from "../../components/TitleBlock"
import Screening from "../../components/Screening"
import FileItem from "../../components/FileItem"
import "react-markdown-editor-lite/lib/index.css"
import "antd/es/modal/style"
import "antd/es/slider/style"
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
	const [formBody, setFormBody] = useState()
	const tableBlock = useRef()
	const mdEditorRef = useRef()
	const [formRef] = Form.useForm()

	const screeningPass = () => {
		console.log(screeningClassify, screeningTitle)
	}
	const screeningReturn = () => {
		setScreeningClassify(null)
		setScreeningTitle(null)
	}
	const onSelectChange = (selectId) => {
		setSelectedRowKeys(selectId)
	}
	const onChooseThe = () => {
		console.log(selectedRowKeys)
		if (selectedRowKeys.length === dataSource.length) {
			setSelectedRowKeys([])
		} else if (selectedRowKeys.length === 0) {
			setSelectedRowKeys(
				dataSource.map((v) => {
					return v.id
				})
			)
		} else {
			// console.log(
			// 	dataSource.map((v) => {
			// 		return selectedRowKeys.indexOf(v.key) === -1 {v.key}
			// 	}),
			// 	888
			// )
		}
	}
	const drawerFormReturn = () => {
		formRef.resetFields()
		setVisible(false)
	}
	const drawerFormPass = () => {
		formRef.validateFields().then(
			() => {
				console.log(mdEditorRef.current.getMdValue())
				console.log(formRef.getFieldsValue())
				drawerFormReturn()
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
			setTimeout(() => {
				setThumbnailCurrent(formRef.getFieldsValue().thumbnail)
				setModalThumbnailState(true)
				setModalThumbnailLoading(false)
			}, 3000)
		}
	}
	const fileItemCurrent = (value) => {
		setThumbnailCurrent(value.url)
	}
	const modalThumbnailPass = () => {
		formRef.setFieldsValue({thumbnail: thumbnailCurrent})
		setModalThumbnailState(false)
	}
	const modalThumbnailReturn = () => {
		setModalThumbnailState(false)
	}
	const aaaaa = () => {
		setVisible(true)
		formRef.setFieldsValue({title: "从地上到处都是"})
	}

	useEffect(() => {
		PubSub.publish("pageName", "文章管理")
		setTableHeight(tableBlock.current.offsetHeight - 85)
		setDataSource([
			{
				id: "1",
				title: "程序员全职接单一个月的感触",
				views: 32,
				label: [
					{id: 1, name: "前端"},
					{id: 2, name: "服务器"},
					{id: 3, name: "Node"},
				],
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "2",
				title: "程序员全职接单一个月的感触",
				views: 32,
				label: [
					{id: 1, name: "前端"},
					{id: 2, name: "服务器"},
					{id: 3, name: "Node"},
				],
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "3",
				title: "程序员全职接单一个月的感触",
				views: 32,
				label: [
					{id: 1, name: "前端"},
					{id: 2, name: "服务器"},
					{id: 3, name: "Node"},
				],
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "4",
				title: "程序员全职接单一个月的感触",
				views: 32,
				label: [
					{id: 1, name: "前端"},
					{id: 2, name: "服务器"},
					{id: 3, name: "Node"},
				],
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "5",
				title: "程序员全职接单一个月的感触",
				views: 32,
				label: [
					{id: 1, name: "前端"},
					{id: 2, name: "服务器"},
					{id: 3, name: "Node"},
				],
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "6",
				title: "程序员全职接单一个月的感触",
				views: 32,
				label: [
					{id: 1, name: "前端"},
					{id: 2, name: "服务器"},
					{id: 3, name: "Node"},
				],
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "7",
				title: "程序员全职接单一个月的感触",
				views: 32,
				label: [
					{id: 1, name: "前端"},
					{id: 2, name: "服务器"},
					{id: 3, name: "Node"},
				],
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "8",
				title: "程序员全职接单一个月的感触",
				views: 32,
				label: [
					{id: 1, name: "前端"},
					{id: 2, name: "服务器"},
					{id: 3, name: "Node"},
				],
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "9",
				title: "程序员全职接单一个月的感触",
				views: 32,
				label: [
					{id: 1, name: "前端"},
					{id: 2, name: "服务器"},
					{id: 3, name: "Node"},
				],
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "10",
				title: "程序员全职接单一个月的感触",
				views: 32,
				label: [
					{id: 1, name: "前端"},
					{id: 2, name: "服务器"},
					{id: 3, name: "Node"},
				],
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "11",
				title: "程序员全职接单一个月的感触",
				views: 32,
				label: [
					{id: 1, name: "前端"},
					{id: 2, name: "服务器"},
					{id: 3, name: "Node"},
				],
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
		])
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
	}, [])

	const mdParser = new MarkdownIt(/* Markdown-it options */)
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	}
	return (
		<div className="the-article">
			<Screening>
				<div>
					<Select
						value={screeningClassify}
						onChange={(value) => setScreeningClassify(value)}
						placeholder="请选择文章分类"
					>
						<Select.Option value="jack">Jack</Select.Option>
						<Select.Option value="lucy">Lucy</Select.Option>
						<Select.Option value="Yiminghe">yiminghe</Select.Option>
					</Select>
					<Input
						value={screeningTitle}
						onChange={(e) => setScreeningTitle(e.target.value)}
						placeholder="请输入文章标题"
					/>
				</div>
				<div>
					<Button onClick={screeningPass} type="primary">
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
					<Button>删除文章</Button>
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
									<i className="state-icon state-err-icon" />
									<span>{state ? "显示" : "隐藏"}</span>
								</div>
							)}
						/>
						<Table.Column title="浏览量" dataIndex="views" width={150} align="center" key="id" />
						<Table.Column title="评论数量" dataIndex="comment" width={150} align="center" key="id" />
						<Table.Column
							title="文章标签"
							dataIndex="label"
							width={300}
							align="center"
							key="id"
							render={(label) => (
								<>
									{label.map((v) => {
										return (
											<Tag color={randomColor()} key={v.id}>
												{v.name}
											</Tag>
										)
									})}
								</>
							)}
						/>
						<Table.Column title="发布时间" dataIndex="time" key="id" />
						<Table.Column
							title="操作"
							width={150}
							key="id"
							render={() => (
								<>
									{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
									<span onClick={aaaaa} className="edit-btn" role="button">
										编辑
									</span>
									<span className="delete-btn">删除</span>
								</>
							)}
						/>
					</Table>
				</div>
				<div className="table-config">
					<div className="table-border">
						<div className="the-block">
							<Button onClick={onChooseThe} className="the-btn" type="primary">
								反选
							</Button>
							{selectedRowKeys.length}/{dataSource.length}
						</div>
						<Pagination
							total={85}
							showSizeChanger
							showQuickJumper
							showTotal={(total) => `共 ${total} 条`}
						/>
					</div>
				</div>
			</div>
			<Drawer
				title="添加文章"
				visible={visible}
				closable={false}
				getContainer={false}
				onClose={drawerFormReturn}
				width="70%"
				extra={
					<Space>
						<Button onClick={drawerFormPass} type="primary">
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
											<Select.Option value="xiao">Xiaoxiao Fu</Select.Option>
											<Select.Option value="mao">Maomao Zhou</Select.Option>
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={15}>
								<Col span={12}>
									<Form.Item name="label" label="文章标签">
										<Select mode="multiple" placeholder="请选择文章标签">
											<Select.Option value="Javascript">Javascript</Select.Option>
											<Select.Option value="CSS3">CSS3</Select.Option>
											<Select.Option value="NodeJS">NodeJS</Select.Option>
										</Select>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item name="state" label="文章状态">
										<Select allowClear placeholder="请选择文章状态">
											<Select.Option value="xiao">置顶</Select.Option>
											<Select.Option value="mao">隐藏</Select.Option>
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={15}>
								<Col span={12}>
									<Form.Item name="time" initialValue={moment()} label="发布时间">
										<DatePicker showTime style={{width: "100%"}} placeholder="请选择发布时间" />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item name="thumbnail" label="缩略图地址">
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
							<Upload.Dragger listType="picture" className="thumbnail-upload">
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
								onClick={() => fileItemCurrent(v)}
								className={thumbnailCurrent === v.url ? "file-item-current" : ""}
								key={v.filename}
							/>
						)
					})}
				</div>
			</Modal>
		</div>
	)
}

export default Index
