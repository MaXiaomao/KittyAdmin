import Axios from "axios"
import AxiosDoll from "./config"

export const Login = (params) => {
	return Axios.post("/api/user/login", params)
}

// 添加分类信息
export const postClassify = (params) => {
	return AxiosDoll("post", "/api/classify", {data: params})
}

// 删除分类信息
export const deleteClassify = (params) => {
	return AxiosDoll("delete", "/api/classify", {data: params})
}

// 添加分类信息
export const putClassify = (params) => {
	return AxiosDoll("put", "/api/classify", {data: params})
}

// 获取分类信息
export const getClassify = (params) => {
	return AxiosDoll("get", "/api/classify", {params})
}

// 编辑排序信息
export const putQueue = (params) => {
	return AxiosDoll("put", "/api/queue", {data: params})
}

// 添加标签信息
export const postLabel = (params) => {
	return AxiosDoll("post", "/api/label", {data: params})
}

// 删除标签信息
export const deleteLabel = (params) => {
	return AxiosDoll("delete", "/api/label", {data: params})
}

// 编辑标签信息
export const putLabel = (params) => {
	return AxiosDoll("put", "/api/label", {data: params})
}

// 获取标签信息
export const getLabel = (params) => {
	return AxiosDoll("get", "/api/label", {params})
}

// 上传文件
export const postFile = (params) => {
	return AxiosDoll("post", "/api/file", {data: params})
}

// 删除文件
export const deleteFile = (params) => {
	return AxiosDoll("delete", "/api/file", {data: params})
}

// 获取文件
export const getFile = (params) => {
	return AxiosDoll("get", "/api/file", {params})
}

// 新建文件夹
export const postFolder = (params) => {
	return AxiosDoll("post", "/api/folder", {data: params})
}

// 添加文章信息
export const postArticle = (params) => {
	return AxiosDoll("post", "/api/article", {data: params})
}

// 删除文章信息
export const deleteArticle = (params) => {
	return AxiosDoll("delete", "/api/article", {data: params})
}

// 编辑文章信息
export const putArticle = (params) => {
	return AxiosDoll("put", "/api/article", {data: params})
}

// 获取文章信息
export const getArticle = (params) => {
	return AxiosDoll("get", "/api/article", {params})
}
