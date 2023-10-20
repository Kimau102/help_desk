import { Request, Response, NextFunction } from 'express'

export const isLoggedInAPI = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.session?.user_email) {
		next()
	} else {
		res.status(401).json({msg: 'No Authorization'})
	}
}
