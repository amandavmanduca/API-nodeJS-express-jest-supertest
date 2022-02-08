import { Device, DeviceType } from "../entities/devices";
import { getRepository, Repository } from "typeorm";
import { InvalidFormatError, InvalidTypeError, NotFoundError } from "../../../utils/errorExceptions";

export class DeviceService {
    constructor (
        private deviceRepository: Repository<Device> | any = getRepository(Device)
    ){}

    async listAll(): Promise<Device[]> {
        const devices: Device[] = await this.deviceRepository.find()
        return devices;
    }

    async createOne(data: Device): Promise<Device> {
        if (data.mac_address?.length !== 12) {
            throw new InvalidFormatError()
        }
        if (/[^A-Za-z0-9]/.test(data.mac_address)) {
            throw new InvalidFormatError()
        }
        if (data.type && !Object.values(DeviceType).includes(data.type)) {
            throw new InvalidTypeError()
        }
        const device = this.deviceRepository.create(data);
        await this.deviceRepository.save(device);
        return device;
    }

    async findOne(id: string): Promise<Device> {
        const foundDevice: Device | any = await this.deviceRepository.findOne({
            where: {
                id: id,
            },
        })
        if (!foundDevice) {
            throw new NotFoundError()
        }
        return foundDevice
    }

    async updateOne({ id, data }: {
        id: string;
        data: Device;
    }): Promise<Device> {
        const foundDevice: any = await this.deviceRepository.findOne({ where: { id: id } });
        if (!foundDevice) {
            throw new NotFoundError()
        }
        if (data.mac_address && data.mac_address.length !== 12) {
            throw new InvalidFormatError()
        }
        if (data.mac_address && /[^A-Za-z0-9]/.test(data.mac_address)) {
            throw new InvalidFormatError()
        }
        if (data.type && !Object.values(DeviceType).includes(data.type)) {
            throw new InvalidTypeError()
        }
        const updatedDevice: Device = await this.deviceRepository.save({ ...foundDevice, ...data });

        return updatedDevice
    }

    async deleteOne({ id }: {
        id: string;
    }): Promise<Device> {
        const foundDevice: any = await this.deviceRepository.findOne({ where: { id: id } });
        if (foundDevice?.id == id) {
            await this.deviceRepository.delete(id);
        } else {
            throw new NotFoundError()
        }
        return foundDevice
    }
}
  
