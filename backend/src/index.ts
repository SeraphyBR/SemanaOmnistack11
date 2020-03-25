import express from "express";

let app = express();

app.get("/", (req,res) => {
    return res.json({
        evento: "Semana Omnistack 11.0",
        aluno: "SeraphyBR"
    });
});
app.listen(3333);