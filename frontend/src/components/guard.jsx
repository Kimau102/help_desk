import React from 'react'

export function useGuard() {
	const [loading, setLoading] = React.useState(true)
	const [loginStatus, setLoginStatus] = React.useState(null)
	const [clientAuthorization, setClientAuthorization] = React.useState(null)
	const [adminAuthorization, setAdminAuthorization] = React.useState(null)

	React.useEffect(() => {
		(async () => {
			try {
				const res = await (await fetch('/api/user/session')).json()
				if (res.login_status === true) {
					setLoading(false)
					setLoginStatus(res.login_status)
					setClientAuthorization(res.client_authorization)
					setAdminAuthorization(res.admin_authorization)
				} else {
					setLoading(false)
					setLoginStatus(false)
					
				}
			} catch (error) {
				console.error(error)
			}
		})()
	}, [])

	return { loading, loginStatus, clientAuthorization, adminAuthorization }
}