import connection from "../database/connection";
import { Response, Request } from "express";
import Incident from "../models/incident";
import crypto from "crypto";

class IncidentController {
    public static async create(req: Request, res: Response): Promise<Response> {
        const new_incident: Incident = req.body;
        if (req.headers.authorization !== undefined) {
            new_incident.ong_id = req.headers.authorization;
            const result = await connection("incidents").insert(new_incident);
            return res.json({ id: result[0]});
        }
        else return res.status(401).json({ error: "Operation not permitted."});
    }

    public static async index(req: Request, res: Response): Promise<Response> {
        const incidents: Incident[] = await connection("incidents").select<Incident[]>("*");
        return res.json(incidents);
    }

    public static async delete(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const ong_id = req.headers.authorization;
        const incident = await connection("incidents")
            .where("id", id)
            .select<Incident>("ong_id")
            .first();
        if(incident?.ong_id !== ong_id){
            return res.status(401).json({ error: "Operation not permitted."});
        }

        await connection("incidents").where("id", id).delete();

        return res.status(204).send();
    }
}

export default IncidentController;
