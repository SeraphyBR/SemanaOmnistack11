import connection from "../database/connection";
import { Response, Request } from "express";
import Incident from "../models/incident";
import crypto from "crypto";

class IncidentController {
    public static async create(req: Request, res: Response): Promise<Response> {
        const new_incident: Incident = req.body;
        new_incident.ong_id = req.headers.authorization || "";
        const result = await connection("incidents").insert(new_incident);
        return res.json({ id: result[0]});
    }

    public static async index(req: Request, res: Response): Promise<Response> {
        const incidents: Incident[] = await connection("incidents").select<Incident[]>("*");
        return res.json(incidents);
    }
}

export default IncidentController;
