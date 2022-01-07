import {lazy, Suspense} from "react"
import Index from "../pages/Index"
import Login from "../pages/Login"
import Guard from "../components/Guard"
import SpinLoading from "../components/SpinLoading"

const Monitoring = lazy(() => import("../pages/Monitoring"))
const Classification = lazy(() => import("../pages/Classification"))
const TheArticle = lazy(() => import("../pages/TheArticle"))
const Media = lazy(() => import("../pages/Media"))
const Label = lazy(() => import("../pages/Label"))
const SetUpThe = lazy(() => import("../pages/SetUpThe"))

const router = [
	{
		path: "/",
		element: <Index />,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<SpinLoading />}>
						<Guard>
							<Monitoring />
						</Guard>
					</Suspense>
				),
			},
			{
				path: "classification",
				element: (
					<Suspense fallback={<SpinLoading />}>
						<Guard>
							<Classification />
						</Guard>
					</Suspense>
				),
			},
			{
				path: "theArticle",
				element: (
					<Suspense fallback={<SpinLoading />}>
						<Guard>
							<TheArticle />
						</Guard>
					</Suspense>
				),
			},
			{
				path: "media",
				element: (
					<Suspense fallback={<SpinLoading />}>
						<Guard>
							<Media />
						</Guard>
					</Suspense>
				),
			},
			{
				path: "label",
				element: (
					<Suspense fallback={<SpinLoading />}>
						<Guard>
							<Label />
						</Guard>
					</Suspense>
				),
			},
			{
				path: "setUpThe",
				element: (
					<Suspense fallback={<SpinLoading />}>
						<Guard>
							<SetUpThe />
						</Guard>
					</Suspense>
				),
			},
		],
	},
	{path: "/login", element: <Login />},
]

export default router
