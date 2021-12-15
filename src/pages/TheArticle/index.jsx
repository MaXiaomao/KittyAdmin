import {useEffect, useRef, useState} from "react"
import PubSub from "pubsub-js"
import MarkdownIt from "markdown-it"
import MdEditor from "react-markdown-editor-lite"
import {Button, Drawer, Form, Input, Pagination, Select, Space, Table, DatePicker} from "antd"
import TitleBlock from "../../components/TitleBlock"
import Screening from "../../components/Screening"
import "react-markdown-editor-lite/lib/index.css"
import "./index.css"

const Index = function () {
	const [dataSource, setDataSource] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [tableHeight, setTableHeight] = useState(0)
	const [visible, setVisible] = useState(false)
	const tableBlock = useRef()
	const [form] = Form.useForm()

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
	const showDrawer = () => {
		setVisible(true)
	}
	const onClose = () => {
		setVisible(false)
	}
	const handleEditorChange = ({html, text}) => {
		console.log("handleEditorChange", html, text)
	}
	const onClickForm = () => {
		console.log(form.getFieldsValue())
	}
	const aaaaa = () => {
		setVisible(true)
		form.setFieldsValue({title: "从地上到处都是"})
	}
	const handleChange = (value) => {
		console.log(`selected ${value}`)
	}

	useEffect(() => {
		PubSub.publish("pageName", "文章管理")
		setTableHeight(tableBlock.current.offsetHeight - 85)
		setDataSource([
			{
				id: "1",
				title: "程序员全职接单一个月的感触",
				views: 32,
				source: "掘金前端",
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "2",
				title: "程序员全职接单一个月的感触",
				views: 32,
				source: "掘金前端",
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "3",
				title: "程序员全职接单一个月的感触",
				views: 32,
				source: "掘金前端",
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "4",
				title: "程序员全职接单一个月的感触",
				views: 32,
				source: "掘金前端",
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "5",
				title: "程序员全职接单一个月的感触",
				views: 32,
				source: "掘金前端",
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "6",
				title: "程序员全职接单一个月的感触",
				views: 32,
				source: "掘金前端",
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "7",
				title: "程序员全职接单一个月的感触",
				views: 32,
				source: "掘金前端",
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "8",
				title: "程序员全职接单一个月的感触",
				views: 32,
				source: "掘金前端",
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "9",
				title: "程序员全职接单一个月的感触",
				views: 32,
				source: "掘金前端",
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "10",
				title: "程序员全职接单一个月的感触",
				views: 32,
				source: "掘金前端",
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
			},
			{
				id: "11",
				title: "程序员全职接单一个月的感触",
				views: 32,
				source: "掘金前端",
				state: false,
				comment: 80,
				time: "2020-11-29 18:00:00",
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
					<Select placeholder="请选择文章分类" onChange={handleChange}>
						<Select.Option value="jack">Jack</Select.Option>
						<Select.Option value="lucy">Lucy</Select.Option>
						<Select.Option value="Yiminghe">yiminghe</Select.Option>
					</Select>
					<Input placeholder="请输入文章标题" />
				</div>
				<div>
					<Button type="primary">查询</Button>
					<Button danger>重置</Button>
				</div>
			</Screening>
			<div className="main-block">
				<TitleBlock title="文章管理">
					<Button onClick={showDrawer} type="primary">
						添加文章
					</Button>
					<Button danger>删除文章</Button>
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
						<Table.Column title="文章标题" dataIndex="title" key="id" />
						<Table.Column title="文章来源" dataIndex="source" width={200} align="center" key="id" />
						<Table.Column
							title="文章状态"
							dataIndex="state"
							width={200}
							align="center"
							key="id"
							render={(state) => (
								<>
									<i />
									<span>{state ? "显示" : "隐藏"}</span>
								</>
							)}
						/>
						<Table.Column title="浏览量" dataIndex="views" width={150} align="center" key="id" />
						<Table.Column title="评论数量" dataIndex="comment" width={150} align="center" key="id" />
						<Table.Column title="发布时间" dataIndex="time" width={300} key="id" />
						<Table.Column
							title="操作"
							width={150}
							key="id"
							render={() => (
								<>
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
				onClose={onClose}
				getContainer={false}
				width="40%"
				extra={
					<Space>
						<Button onClick={onClickForm} type="primary">
							确定
						</Button>
						<Button>取消</Button>
					</Space>
				}
			>
				<Form layout="vertical" form={form}>
					<div className="form-row">
						<div className="form-col">
							<Form.Item name="title" label="文章标题">
								<Input placeholder="请输入文章标题" />
							</Form.Item>
						</div>
						<div className="form-col">
							<Form.Item name="classify" label="文章分类">
								<Select placeholder="请选择文章分类">
									<Select.Option value="xiao">Xiaoxiao Fu</Select.Option>
									<Select.Option value="mao">Maomao Zhou</Select.Option>
								</Select>
							</Form.Item>
						</div>
					</div>
					<div className="form-row">
						<div className="form-col">
							<Form.Item name="source" initialValue="本站" label="文章来源">
								<Input placeholder="请输入文章来源" />
							</Form.Item>
						</div>
						<div className="form-col">
							<Form.Item name="sourceUrl" label="来源链接">
								<Input addonBefore="http://" placeholder="请输入来源链接" />
							</Form.Item>
						</div>
					</div>
					<div className="form-row">
						<div className="form-col">
							<Form.Item name="state" label="文章状态">
								<Select placeholder="请选择文章状态">
									<Select.Option value="xiao">展示</Select.Option>
									<Select.Option value="mao">隐藏</Select.Option>
								</Select>
							</Form.Item>
						</div>
						<div className="form-col">
							<Form.Item name="time" label="发布时间">
								<DatePicker showTime style={{width: "100%"}} />
							</Form.Item>
						</div>
					</div>
					<Form.Item name="body" label="文章内容">
						<MdEditor
							style={{height: "300px"}}
							renderHTML={(text) => mdParser.render(text)}
							onChange={handleEditorChange}
						/>
					</Form.Item>
				</Form>
			</Drawer>
		</div>
	)
}

export default Index
