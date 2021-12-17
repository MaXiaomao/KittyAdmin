const randomColor = function () {
	const r = Math.floor(Math.random() * 256)
	const g = Math.floor(Math.random() * 256)
	const b = Math.floor(Math.random() * 256)
	return `rgb(${r},${g},${b})`
}

// eslint-disable-next-line import/prefer-default-export
export {randomColor}
