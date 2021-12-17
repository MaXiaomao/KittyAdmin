import {useEffect, useState} from "react"
import {Input, Tag} from "antd"
import TitleBlock from "../../components/TitleBlock"
import {randomColor} from "../../config/plugIn"

import "./index.css"

const Index = function () {
	const [labelLoading, setLabelLoading] = useState(false)
	const [labelData, setLabelData] = useState([])

	const labelAdd = () => {
		setLabelLoading(true)
		setTimeout(() => {
			setLabelLoading(false)
		}, 3000)
	}
	const labelDelete = (value) => {
		console.log(value)
	}

	useEffect(() => {
		let aaa = []
		for (let i = 0; i < 100; i++) {
			aaa.push({
				id: i,
				name: `tab${i}`,
			})
		}
		setLabelData(aaa)
	}, [])

	return (
		<div className="label">
			<div className="main-block">
				<TitleBlock title="标签管理">
					<Input.Search
						className="label-add"
						enterButton="添加"
						onSearch={labelAdd}
						loading={labelLoading}
						placeholder="请输入标签名称"
					/>
				</TitleBlock>
				<div className="label-list">
					{labelData.map((v) => {
						return (
							<Tag onClose={() => labelDelete(v)} color={randomColor()} closable key={v.id}>
								{v.name}
							</Tag>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Index
