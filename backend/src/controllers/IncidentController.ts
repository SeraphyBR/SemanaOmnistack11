import connection from "../database/connection";
import { Response, Request } from "express";
import Incident from "../models/incident";

class IncidentController {
    private static db_name: string = "incidents";

    public static async create(req: Request, res: Response): Promise<Response> {
        const new_incident: Incident = req.body;

        if (req.headers.authorization !== undefined) {
            new_incident.ong_id = req.headers.authorization;
            const result = await connection(IncidentController.db_name).insert(new_incident);
            return res.json({ id: result[0]});
        }
        else{
            return res.status(401).json({ error: "Operation not permitted."});
        }
    }

    public static async index(req: Request, res: Response): Promise<Response> {
        const page: number = req.query.page || 1;
        const incidents: Incident[] = await connection(IncidentController.db_name)
            .join("ongs", "ongs.id", "=", "incidents.ong_id")
            .limit(5)
            .offset((page - 1) * 5)
            .select<Incident[]>([
                "incidents.*",
                "ongs.name",
                "ongs.email",
                "ongs.whatsapp",
                "ongs.city",
                "ongs.uf"
            ]);

        const [count] = await connection(IncidentController.db_name).count("*");
        res.header("X-Total-Count", count["count(*)"]);

        return res.json(incidents);
    }

    public static async delete(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const ong_id = req.headers.authorization;

        const incident = await connection(IncidentController.db_name)
            .where("id", id)
            .select<Incident>("ong_id")
            .first();

        if(incident?.ong_id !== ong_id){
            return res.status(401).json({ error: "Operation not permitted."});
        }

        await connection(IncidentController.db_name).where("id", id).delete();

        return res.status(204).send();
    }
}

export default IncidentController;
