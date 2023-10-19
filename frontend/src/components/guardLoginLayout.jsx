import React from 'react'

export function useCheckIsLogin() {
	const [loginStatus, setLoginStatus] = React.useState(null)
	const [loading, setLoading] = React.useState(true)
	const [clientAuthorization, setClientAuthorization] = React.useState(null)
	const [adminAuthorization, setAdminAuthorization] = React.useState(null)

	React.useEffect(() => {
		;(async () => {
			try {
				const res = await (await fetch('/checkIsLogin')).json()
				if (res.login_status === true) {
					setLoginStatus(res.login_status)
					setClientAuthorization(res.client_authorization)
					setAdminAuthorization(res.admin_authorization)
				}
				setLoading(false)
			} catch (error) {
				console.error(error)
			}
		})()
	}, [])

	return { loginStatus, loading, clientAuthorization, adminAuthorization }
}
