import { $authHost, $host } from '.';

export const createProducts = async (product) => {
	const {data} = await $authHost.post('api/pizza', product)

	return data
}

export const deleteProducts = async (id) => {
	const {data} = await $authHost.delete('api/pizza/' + id)

	return data
}

export const fetchProducts = async () => {
	const {data} = await $host.get('api/pizza')

	return data
}

export const fetchOneProduct = async (id) => {
	const {data} = await $host.get('api/pizza/' + id)

	return data
}