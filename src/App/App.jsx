import {useState} from "react"
import {Button, Switch} from "antd"
import "./App.css"

const App = function () {
	const [btnText] = useState("按钮")

	const onChange = (checked) => {
		console.log(`switch to ${checked}`)
	}

	return (
		<div className="App">
			<Button type="primary">{btnText}</Button>
			<Button type="primary" danger>
				Primary
			</Button>
			<Switch defaultChecked onChange={onChange} />
		</div>
	)
}
export default App
