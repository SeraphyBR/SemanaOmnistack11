import connection from "../database/connection";
import { Response, Request } from "express";
import Incident from "../models/incident";

class ProfileController {
    private static db_name: string = "incidents";

    public static async index(req: Request, res: Response): Promise<Response> {
        const ong_id = req.headers.authorization || "";
        const incidents: Incident[] = await connection(ProfileController.db_name)
            .where("ong_id", ong_id)
            .select<Incident[]>("*");
        return res.json(incidents);
    }
}

export default ProfileController;
