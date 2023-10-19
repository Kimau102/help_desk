import { Request, Response, NextFunction } from 'express'

export const isLoggedInAPI = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.session?.user_email) {
		next()
	} else {
        return
	}
}