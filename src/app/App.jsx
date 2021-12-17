import {lazy, Suspense} from "react"
import {Routes, Route} from "react-router-dom"
import LeftNav from "../components/LeftNav"
import TopBar from "../components/TopBar"
import SpinLoading from "../components/SpinLoading"
import "./app.css"

const Monitoring = lazy(() => import("../pages/Monitoring"))
const Classification = lazy(() => import("../pages/Classification"))
const TheArticle = lazy(() => import("../pages/TheArticle"))
const Label = lazy(() => import("../pages/Label"))
const SetUpThe = lazy(() => import("../pages/SetUpThe"))

const App = function () {
	return (
		<>
			<LeftNav />
			<div className="right-block">
				<TopBar />
				<Routes>
					<Route
						path="/monitoring"
						element={
							<Suspense fallback={<SpinLoading />}>
								<Monitoring />
							</Suspense>
						}
					/>
					<Route
						path="/classification"
						element={
							<Suspense fallback={<SpinLoading />}>
								<Classification />
							</Suspense>
						}
					/>
					<Route
						path="/theArticle"
						element={
							<Suspense fallback={<SpinLoading />}>
								<TheArticle />
							</Suspense>
						}
					/>
					<Route
						path="/Label"
						element={
							<Suspense fallback={<SpinLoading />}>
								<Label />
							</Suspense>
						}
					/>
					<Route
						path="/setUpThe"
						element={
							<Suspense fallback={<SpinLoading />}>
								<SetUpThe />
							</Suspense>
						}
					/>
				</Routes>
			</div>
		</>
	)
}
export default App
