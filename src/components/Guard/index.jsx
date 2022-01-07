import React from "react"
import {Navigate} from "react-router-dom"
import "./index.css"

const Index = function ({children}) {
	const token = sessionStorage.getItem("token")
	return token !== null ? children : <Navigate to="/login" replace />
}

export default Index
