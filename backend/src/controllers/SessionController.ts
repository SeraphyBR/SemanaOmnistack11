import connection from "../database/connection";
import { Response, Request } from "express";
import Ong from "../models/ong";

class SessionController {
    private static db_name: string = "ongs";

    public static async create(req: Request, res: Response): Promise<Response> {
        const id: string = req.body.id;
        const ong = await connection(SessionController.db_name).where("id", id).select<Ong>("name").first();
        if(ong !== undefined){
            return res.json(ong);
        }
        else return res.status(400).json({ error: "No ONG found with this ID"});
    }
}

export default SessionController;
