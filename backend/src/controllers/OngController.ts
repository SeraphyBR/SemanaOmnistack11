import connection from "../database/connection";
import { Response, Request } from "express";
import Ong from "../models/ong";
import crypto from "crypto";

class OngController {
    public static async create(req: Request, res: Response): Promise<Response> {
        const new_ong: Ong = req.body;
        new_ong.id = crypto.randomBytes(4).toString("HEX");
        await connection("ongs").insert<Ong>(new_ong);
        return res.json({ id: new_ong.id });
    }

    public static async index(req: Request, res: Response): Promise<Response> {
        const ongs: Ong[] = await connection("ongs").select<Ong[]>("*");
        return res.json(ongs);
    }
}

export default OngController;
