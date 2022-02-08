import { Device } from "../../../src/modules/devices/entities/devices"
import { DeviceService } from "../../../src/modules/devices/service/devices-service"

export async function createDevice(data: Device | any): Promise<Device> {
    const createdDevice = await new DeviceService().createOne(data)
    return createdDevice
}
