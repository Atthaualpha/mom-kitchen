import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        const allowedScopes = ["test1", "test2"]

        if ((req.headers["x-auth-token"] == null || req.headers["x-auth-token"] == '') && req.baseUrl != "") {
            return res.status(401).json({ message: "Access Denied" });
        } else {
            if (req.query["api"] && (allowedScopes.findIndex(scope => scope == req.query["api"]) == -1)) {
                return res.status(404).json({ message: "Resource not found" });
            } else {
                next()
            }
        }
    }
}