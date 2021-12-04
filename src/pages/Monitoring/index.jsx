import {useEffect, useState} from "react"
import {Button, Radio} from "antd"
// eslint-disable-next-line import/no-extraneous-dependencies
import {Column, Line} from "@ant-design/plots"
import {ArrowDownOutlined, ArrowUpOutlined, LinkOutlined} from "@ant-design/icons"
import BlockTitle from "../../components/BlockTitle"
import "./index.css"

const Index = function () {
	const chartData = [
		{
			Date: "2010-01",
			scales: 20,
		},
		{
			Date: "2010-02",
			scales: 13,
		},
		{
			Date: "2010-03",
			scales: 39,
		},
		{
			Date: "2010-04",
			scales: 8,
		},
		{
			Date: "2010-05",
			scales: 26,
		},
		{
			Date: "2010-06",
			scales: 95,
		},
		{
			Date: "2010-07",
			scales: 68,
		},
		{
			Date: "2010-08",
			scales: 56,
		},
	]
	const chartData1 = [
		{
			Date: "2010-01",
			scales: 19,
		},
		{
			Date: "2010-02",
			scales: 13,
		},
		{
			Date: "2010-03",
			scales: 39,
		},
		{
			Date: "2010-04",
			scales: 8,
		},
		{
			Date: "2010-05",
			scales: 26,
		},
		{
			Date: "2010-06",
			scales: 95,
		},
		{
			Date: "2010-07",
			scales: 68,
		},
		{
			Date: "2010-08",
			scales: 56,
		},
		{
			Date: "2010-09",
			scales: 23,
		},
		{
			Date: "2010-10",
			scales: 72,
		},
		{
			Date: "2010-11",
			scales: 68,
		},
		{
			Date: "2010-12",
			scales: 53,
		},
	]

	const [visitorsData, setVisitorsData] = useState(chartData)
	const [viewsData, setViewsData] = useState([])
	const [commentsData, setCommentsData] = useState([])

	useEffect(() => {
		setViewsData(chartData)
		setCommentsData(chartData)
	}, [])

	const dataChange = (e) => {
		if (e.target.value === 7) {
			setVisitorsData(chartData)
		} else {
			setVisitorsData(chartData1)
		}
	}

	const columnConfig = {
		width: "100%",
		height: "210px",
		xField: "Date",
		yField: "scales",
		label: {
			position: "middle",
			style: {
				fill: "#ffffff",
			},
		},
		yAxis: {max: 100},
	}
	const lineConfig = {
		width: "100%",
		height: "100%",
		xField: "Date",
		yField: "scales",
		yAxis: {max: 100},
		smooth: true,
		color: "#ff4475",
	}
	return (
		<div className="monitoring">
			<div className="statistics">
				<BlockTitle title="数据统计">
					<div>
						<Button type="primary" disabled>
							<LinkOutlined />
							数据大屏
						</Button>
					</div>
				</BlockTitle>
				<div className="number-lists">
					<div className="number-item">
						<em>文章总量</em>
						<p>1000</p>
					</div>
					<div className="number-item">
						<em>评论总量</em>
						<p>1000</p>
					</div>
					<div className="number-item">
						<em>标签总量</em>
						<p>1000</p>
					</div>
					<div className="number-item">
						<em>待审核评论</em>
						<p className="number-err">1000</p>
					</div>
					<div className="number-item">
						<em>当日浏览量</em>
						<p className="number-err">
							<strong>1000</strong>
							{1 === "1" ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
						</p>
					</div>
				</div>
			</div>
			<div className="the-article-chart">
				<div className="views">
					<BlockTitle title="浏览量排名" />
					<div className="chart-height">
						<div className="chart-block">
							<Column data={viewsData} {...columnConfig} />
						</div>
					</div>
				</div>
				<div className="comments">
					<BlockTitle title="评论量排名" />
					<div className="chart-height">
						<div className="chart-block">
							<Column data={commentsData} color="#67c23a" {...columnConfig} />
						</div>
					</div>
				</div>
			</div>
			<div className="visitors-chart">
				<BlockTitle title="访客走势">
					<Radio.Group onChange={dataChange} defaultValue={7}>
						<Radio.Button value={7}>近一周</Radio.Button>
						<Radio.Button value={30}>近一月</Radio.Button>
					</Radio.Group>
				</BlockTitle>
				<div className="chart-height">
					<div className="chart-block">
						<Line data={visitorsData} {...lineConfig} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Index
