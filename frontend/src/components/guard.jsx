import React from 'react'

export function useGuard() {
	const [loading, setLoading] = React.useState(true)
	const [loginStatus, setLoginStatus] = React.useState(false)
	const [userAuthorization, setClientAuthorization] = React.useState(null)
	const [adminAuthorization, setAdminAuthorization] = React.useState(null)
	const [userID, setUserID] = React.useState(null)
	const [userName, setUserName] = React.useState(null)
	const [userAddress, setUserAddress] = React.useState(null)

	React.useEffect(() => {
		(async () => {
			try {
				const res = await (await fetch('/api/user/session')).json()
				if (res.login_status === true) {
					setLoading(false)
					setLoginStatus(res.login_status)
					setClientAuthorization(res.user_authorization)
					setAdminAuthorization(res.admin_authorization)
					setUserID(res.user_id)
					setUserName(res.user_first_name + ' ' + res.user_last_name)
					setUserAddress(res.address)
				} else {
					setLoading(false)
					setLoginStatus(false)
				}
			} catch (error) {
				console.error(error)
			}
		})()
	}, [loginStatus])

	return {
		loading,
		loginStatus,
		userAuthorization,
		adminAuthorization,
		userID,
		userName,
		userAddress
	}
}