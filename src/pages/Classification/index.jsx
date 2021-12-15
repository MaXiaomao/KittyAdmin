import PubSub from "pubsub-js"
import "./index.css"
import {useEffect} from "react"

const Index = function () {
	useEffect(() => {
		PubSub.publish("pageName", "分类管理")
	}, [])

	return <div className="classification" />
}

export default Index
