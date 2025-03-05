import { Request, Response, Router } from 'express';

export default (router: Router): void => {
    router.get('/', async (req: Request, res: Response) => {
        res.status(200).json("For Outsera!!");
    });
};
