import express from "express";
import routes from "./routes"
import cors from "cors";

const app = express();

app.use(cors());

// Faz com que o express converta as requisições em json.
app.use(express.json());
app.use(routes);


// Inicia o servidor na porta 3333
app.listen(3333);
