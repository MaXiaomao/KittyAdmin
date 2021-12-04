import "./index.css"

const Index = function (props) {
	const {title, children} = props
	return (
		<div className="block-title">
			<strong>{title}</strong>
			{children}
		</div>
	)
}

export default Index
