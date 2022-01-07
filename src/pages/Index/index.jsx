import {Outlet} from "react-router-dom"
import LeftNav from "../../components/LeftNav"
import TopBar from "../../components/TopBar"
import "./index.css"

const App = function () {
	return (
		<>
			<LeftNav />
			<div className="right-block">
				<TopBar />
				<Outlet />
			</div>
		</>
	)
}
export default App
