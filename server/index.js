import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import DBConnection from './config/db.js';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "/client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
DBConnection();

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));