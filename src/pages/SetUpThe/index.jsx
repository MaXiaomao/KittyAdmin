import "./index.css"
import {Row, Col, Input} from "antd"
import TitleBlock from "../../components/TitleBlock"

const Index = function () {
	return (
		<div className="set-up-the">
			<div className="main-block">
				<TitleBlock title="系统设置" />
				<Row className="row-block" gutter={15}>
					<Col span={12}>
						<h6>备案号</h6>
						<Input className="m-input" defaultValue="mysite" size="large" />
						<h6>版权声明</h6>
						<Input className="m-input" defaultValue="mysite" size="large" />
					</Col>
					<Col span={12}>
						<h6>备案链接</h6>
						<Input className="m-input" defaultValue="26888888" size="large" />
						<h6>站点公告</h6>
						<Input.TextArea
							defaultValue="mysite"
							placeholder="Controlled autosize"
							autoSize={{minRows: 3, maxRows: 5}}
						/>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default Index
