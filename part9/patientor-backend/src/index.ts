import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnosis";

const app = express();
app.use(express.json());

const PORT = 3001;

app.use(cors());

app.use("/api/diagnosis", diagnosisRouter);

app.get("/api/ping", (_req, res) => {
	console.log("someone pinged here");
	res.send("pong");
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
