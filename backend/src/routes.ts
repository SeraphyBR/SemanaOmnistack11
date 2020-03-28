import express from "express";
import OngController from "./controllers/OngController";
import IncidentController from "./controllers/IncidentController";
import ProfileController from "./controllers/ProfileController";

const routes = express.Router();

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.get("/incidents", IncidentController.index);
routes.post("/incidents", IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete);

routes.get("/profile", ProfileController.index);

export default routes;
