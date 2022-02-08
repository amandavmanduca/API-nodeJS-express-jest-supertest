import { Router } from "express";
import { createDeviceFactory } from "./src/modules/devices/controller/device-factory";

const routes = Router();

routes.get("/devices", (request, response) => createDeviceFactory().index(request, response));
routes.get("/device/:id", (request, response) => createDeviceFactory().findById(request, response));
routes.post("/create-device", (request, response) => createDeviceFactory().create(request, response));
routes.post("/update-device/:id", (request, response) => createDeviceFactory().updateById(request, response));
routes.delete("/delete-device/:id", (request, response) => createDeviceFactory().deleteById(request, response));

export { routes };
