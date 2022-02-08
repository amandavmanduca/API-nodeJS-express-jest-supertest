import "../../config"
import { Device, DeviceType } from "../../../src/modules/devices/entities/devices"
import { DeviceService } from "../../../src/modules/devices/service/devices-service"
import { ApiError, InvalidFormatError, InvalidTypeError, NotFoundError } from "../../../src/utils/errorExceptions"
import { generateRandomUUID } from "../../../src/utils/utils"
import {
    deviceData,
    deviceDataWithMacAddressCharError,
    deviceDataWithMacAddressLengthError,
    deviceDataWithTypeError,
    updatedDevice
} from "../test-helpers/data"
import { createDevice } from "../test-helpers/functions"

describe("Create device", () => {
    it("Should have an id", async () => {
        expect(await createDevice(deviceData)).toHaveProperty("id")
    })
    it("Should match created data", async () => {
        const createdData = await createDevice(deviceData)
        expect(createdData?.name).toBe(deviceData?.name)
        expect(createdData?.mac_address).toBe(deviceData?.mac_address)
        expect(createdData?.serial).toBe(deviceData?.serial)
        expect(createdData?.type).toBe(deviceData?.type)
    })
    it("Should have mac_address with 12 caracters", async () => {
        const device = await createDevice(deviceData)
        expect(device?.mac_address).toHaveLength(12)
    })
    it("Should have type in TypeEnum format", async () => {
        const device: any = await createDevice(deviceData)
        expect(Object.values(DeviceType).includes(device.type)).toBe(true)
    })
})

describe("Create device Errors", () => {
    it("Should throw error on mac_address with invalid length format", async () => {
        try {
            await createDevice(deviceDataWithMacAddressLengthError)
        } catch (error: ApiError | any) {
            expect(error?.name).toBe(new InvalidFormatError().name);
        }
    })
    it("Should throw error on mac_address with invalid character format", async () => {  
        try {
            await createDevice(deviceDataWithMacAddressCharError)
        } catch (error: ApiError | any) {
            expect(error?.name).toBe(new InvalidFormatError().name);
        }
    })
    it("Should throw error type Enum", async () => {
        try {
            await createDevice(deviceDataWithTypeError)
        } catch (error: ApiError | any) {
            expect(error?.name).toBe(new InvalidTypeError().name);
        }
    })
})

describe("Find device", () => {
    it("Should return found device", async () => {
        const device: any = await createDevice(deviceData)
        const foundDevice = await new DeviceService().findOne(device.id)
        expect(device?.id).toBe(foundDevice?.id)
        expect(device?.name).toBe(foundDevice?.name)
        expect(device?.type).toBe(foundDevice?.type)
        expect(device?.mac_address).toBe(foundDevice?.mac_address)
        expect(device?.serial).toBe(foundDevice?.serial)
    })
})

describe("Find device Errors", () => {
    it("Should return not found device", async () => {
        try {
            await new DeviceService().findOne(generateRandomUUID())
        } catch (error: ApiError | any) {
            expect(error?.name).toBe(new NotFoundError().name);
        }
    })
})

describe("Update device", () => {
    it("Should update one device data", async () => {
        const createdDevice: Device | any = await createDevice(deviceData)
        const updatedDeviceData = await new DeviceService().updateOne({
            id: createdDevice.id, 
            data: updatedDevice
        })
        expect(updatedDeviceData?.name).toBe(updatedDevice?.name)
        expect(updatedDeviceData?.mac_address).toBe(updatedDevice?.mac_address)
        expect(updatedDeviceData?.serial).toBe(updatedDevice?.serial)
        expect(updatedDeviceData?.type).toBe(updatedDevice?.type)
    })
    it("Should have mac_address with 12 characters", async () => {
        const createdDevice: Device | any = await createDevice(deviceData)
        const device = await new DeviceService().updateOne({
            data: updatedDevice,
            id: createdDevice?.id
        })
        expect(device?.mac_address).toHaveLength(12)
        expect(device?.mac_address).toBe(updatedDevice?.mac_address)
    })
    it("Should have type in TypeEnum format", async () => {
        const createdDevice: Device | any = await createDevice(deviceData)
        const device: any = await new DeviceService().updateOne({
            data: updatedDevice,
            id: createdDevice?.id
        })
        expect(Object.values(DeviceType).includes(device.type)).toBe(true)
        expect(device.type).toBe(updatedDevice?.type);
    })
})

describe("Update device Errors", () => {
    it("Should return not found device", async () => {
        try {
            await new DeviceService().updateOne({
                data: updatedDevice,
                id: generateRandomUUID()
            })
            expect(true).toBe(false);
        } catch (error: ApiError | any) {
            expect(error?.name).toBe(new NotFoundError().name);
        }
    })
    it("Should throw error on mac_address with invalid length format", async () => {
        const createdDevice: Device | any = await createDevice(deviceData)
        try {
            await new DeviceService().updateOne({
                data: deviceDataWithMacAddressLengthError,
                id: createdDevice?.id
            })
            expect(true).toBe(false);
        } catch (error: ApiError | any) {
            expect(error?.name).toBe(new InvalidFormatError().name);
        }
    })
    it("Should throw error on mac_address with invalid character format", async () => {
        const createdDevice: Device | any = await createDevice(deviceData)
        try {
            await new DeviceService().updateOne({
                data: deviceDataWithMacAddressCharError,
                id: createdDevice?.id
            })
        } catch (error: ApiError | any) {
            expect(error?.name).toBe(new InvalidFormatError().name);
        }
    })
    it("Should throw error type Enum", async () => {
        const createdDevice: Device | any = await createDevice(deviceData)
        try {
            await new DeviceService().updateOne({
                data: deviceDataWithTypeError,
                id: createdDevice?.id
            })
        } catch (error: ApiError | any) {
            expect(error?.name).toBe(new InvalidTypeError().name);
        }
    })
})

describe("Delete device", () => {
    it("Should delete one device", async () => {
        const createdDevice: Device | any = await createDevice(deviceData)
        try {
            const deletedDevice: Device | any = await new DeviceService().deleteOne({ id: createdDevice?.id})
            await new DeviceService().findOne(deletedDevice?.id)
        } catch (error: ApiError | any) {
            expect(error?.name).toBe(new NotFoundError().name);
        }
    })
})

describe("Delete device Errors", () => {
    it("Should return not found device", async () => {
        try {
            const randomId: string | any = generateRandomUUID()
            await new DeviceService().deleteOne({ id: randomId })
        } catch (error: ApiError | any) {
            expect(error?.name).toBe(new NotFoundError().name);
        }
    })
})
