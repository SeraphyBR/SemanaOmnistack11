import connection from "../database/connection";
import { Response, Request } from "express";
import Incident from "../models/incident";

class ProfileController {
    public static async index(req: Request, res: Response): Promise<Response> {
        const ong_id = req.headers.authorization || "";
        const incidents: Incident[] = await connection("incidents")
            .where("ong_id", ong_id)
            .select<Incident[]>("*");
        return res.json(incidents);
    }
}

export default ProfileController;
