require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

import express from "express";
import "express-async-errors";
import { routes } from "../routes";
import cors from 'cors';

import "dotenv/config";
import { connection } from "../src/database/connection";

connection.create();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

export { app };