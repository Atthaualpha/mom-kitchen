import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if ((req.headers["x-auth-token"] == null || req.headers["x-auth-token"] == '' || req.headers["x-auth-token"] != '1234') && req.path!="/") {
            res.status(401).json({ message: "Access Denied"});
        } else {
            next()
        }
    }
}