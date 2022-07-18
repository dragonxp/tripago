import { useState, useEffect } from "react"

export function useFetch(url) {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const controller = new AbortController()

		const fetchData = async () => {
			setIsLoading(true)

			try {
				const response = await fetch(url, { signal: controller.signal })
				if (!response.ok) throw new Error(response.statusText)
				const json = await response.json()
				setIsLoading(false)
				setData(json)
				setError(null)
			} catch(err) {
				if (err.name === 'AbortError') console.log('The fetch was aborted')
				else {
					setIsLoading(false)
					setError('Couldnot fetch the data')
				}
			}
			
		}

		fetchData()

		return () => controller.abort()
	}, [url])

	return { data, isLoading, error }
}