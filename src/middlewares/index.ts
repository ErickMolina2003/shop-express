import { Request, Response, NextFunction } from 'express';
import { merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const sessionToken = req.cookies['SHOP-AUTH'];

        if (!sessionToken) {
            return res.sendStatus(401);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        return next();

    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
}