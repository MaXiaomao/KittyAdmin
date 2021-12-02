import React from "react"
import {Routes, Route} from "react-router-dom"
import LeftNav from "../components/LeftNav"
import TopBar from "../components/TopBar"
import SpinLoading from "../components/SpinLoading"
import "./app.css"

const Monitoring = React.lazy(() => import("../pages/Monitoring"))
const Classification = React.lazy(() => import("../pages/Classification"))
const TheArticle = React.lazy(() => import("../pages/TheArticle"))
const Comments = React.lazy(() => import("../pages/Comments"))
const SetUpThe = React.lazy(() => import("../pages/SetUpThe"))

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
							<React.Suspense fallback={<SpinLoading />}>
								<Monitoring />
							</React.Suspense>
						}
					/>
					<Route
						path="/classification"
						element={
							<React.Suspense fallback={<SpinLoading />}>
								<Classification />
							</React.Suspense>
						}
					/>
					<Route
						path="/theArticle"
						element={
							<React.Suspense fallback={<SpinLoading />}>
								<TheArticle />
							</React.Suspense>
						}
					/>
					<Route
						path="/comments"
						element={
							<React.Suspense fallback={<SpinLoading />}>
								<Comments />
							</React.Suspense>
						}
					/>
					<Route
						path="/setUpThe"
						element={
							<React.Suspense fallback={<SpinLoading />}>
								<SetUpThe />
							</React.Suspense>
						}
					/>
				</Routes>
			</div>
		</>
	)
}
export default App
