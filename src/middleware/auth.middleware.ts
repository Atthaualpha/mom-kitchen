import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if ((req.headers["x-auth-token"] == null || req.headers["x-auth-token"] == '') && req.baseUrl != "") {
            res.status(401).json({ message: "Access Denied"});
        } else {
            next()
        }
    }
}