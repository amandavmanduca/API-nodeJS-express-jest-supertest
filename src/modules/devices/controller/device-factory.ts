import { getRepository } from "typeorm";
import { Device } from "../entities/devices";
import { DeviceService } from "../service/devices-service";
import { DeviceController } from "./device-controller";


export const createDeviceFactory = () => {
  const deviceRepository = getRepository(Device)
  const deviceService = new DeviceService(deviceRepository);
  const deviceController = new DeviceController(deviceService);
  return deviceController;
};