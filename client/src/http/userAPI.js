import { $authHost, $host } from '.';
import { jwtDecode } from 'jwt-decode'

export const registration = async (id, email, password) => {
	const {data} = await $host.post('api/user/registration', {id, email, password, role: 'ADMIN'})

	localStorage.setItem('token', data.token)

	return jwtDecode(data.token)
}

export const login = async (id, email, password) => {
	const {data} = await $host.post('api/user/login', {email, password})

	localStorage.setItem('token', data.token)

	return jwtDecode(data.token)
}

export const check = async () => {
	const {data} = await $authHost.get('api/user/auth')

	localStorage.setItem('token', data.token)

	return jwtDecode(data.token)
}

export const fetchUsers = async () => {
	const {data} = await $host.get('api/user')

	return data
}

export const deleteUsers = async (id) => {
	const {data} = await $authHost.delete('api/user/' + id)

	return data
}