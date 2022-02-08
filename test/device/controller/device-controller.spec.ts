import "../../config"
import { Device } from "../../../src/modules/devices/entities/devices"
const request = require('supertest');
import { app } from '../../../src/app';
import { InvalidFormatError, InvalidTypeError, NotFoundError } from "../../../src/utils/errorExceptions";
import { generateRandomUUID } from "../../../src/utils/utils";
import {
    deviceData,
    deviceDataWithMacAddressCharError,
    deviceDataWithMacAddressLengthError,
    deviceDataWithTypeError,
    updatedDevice
} from "../test-helpers/data";
import { createDevice } from "../test-helpers/functions";

describe('Device success integration tests', function() {
    it('should create one device', async () => {
        const response: Device | any = async () => (
            await request(app)
            .post(`/create-device`)
            .send(deviceData)
            .set('Accept', 'application/json')
        )
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(response).toHaveProperty("id")
        .expect(response.name).toBe(deviceData.name)
        .expect(response.type).toBe(deviceData.type)
        .expect(response.mac_address).toBe(deviceData.mac_address)
        .expect(response.serial).toBe(deviceData.serial)
    });
    it('should get all devices', async () => {
        await request(app)
        .get('/devices')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
    it('should get one device', async () => {
        const createdDevice = await createDevice(deviceData)
        const response: Device | any = async () => (
            await request(app)
            .get(`/device/${createdDevice?.id}`)
            .set('Accept', 'application/json')
        )
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(response.id).toBe(createdDevice.id)
        .expect(response.name).toBe(createdDevice.name)
        .expect(response.type).toBe(createdDevice.type)
        .expect(response.mac_address).toBe(createdDevice.mac_address)
        .expect(response.serial).toBe(createdDevice.serial)
    });
    it('should update one device', async () => {
        const createdDevice = await createDevice(deviceData)
        const response: Device | any = async () => (
            await request(app)
            .post(`/update-device/${createdDevice?.id}`)
            .send(updatedDevice)
            .set('Accept', 'application/json')
        )
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(response.name).toBe(updatedDevice.name)
        .expect(response.type).toBe(updatedDevice.type)
        .expect(response.mac_address).toBe(updatedDevice.mac_address)
        .expect(response.serial).toBe(updatedDevice.serial)
    });
    it('should delete one device', async () => {
        const createdDevice = await createDevice(deviceData)
        await request(app)
        .delete(`/delete-device/${createdDevice?.id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
    });
});

describe('Create device integration tests with thrown errors', function() {
    it('should throw InvalidFormatError for mac_address length', async () => {
        await request(app)
        .post(`/create-device`)
        .send(deviceDataWithMacAddressLengthError)
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res: any) => {
            expect(res.body.name).toBe(new InvalidFormatError().name)
        })
    });
    it('should throw InvalidFormatError for mac_address invalid character', async () => {
        await request(app)
        .post(`/create-device`)
        .send(deviceDataWithMacAddressCharError)
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res: any) => {
            expect(res.body.name).toBe(new InvalidFormatError().name)
        })
    });
    it('should throw InvalidTypeError for invalid type', async () => {
        await request(app)
        .post(`/create-device`)
        .send(deviceDataWithTypeError)
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res: any) => {
            expect(res.body.name).toBe(new InvalidTypeError().name)
        })
    });
});

describe('Find device integration tests with thrown errors', function() {
    it('should throw NotFoundError for not found device', async () => {
        const randomId = generateRandomUUID()
        await request(app)
        .get(`/device/${randomId}`)
        .set('Accept', 'application/json')
        .expect(404)
        .expect((res: any) => {
            expect(res.body.name).toBe(new NotFoundError().name)
        })
    });
});

describe('Update device integration tests with thrown errors', function() {
    it('should throw NotFoundError for not found device', async () => {
        const randomId = generateRandomUUID()
        await request(app)
        .post(`/update-device/${randomId}`)
        .send(updatedDevice)
        .set('Accept', 'application/json')
        .expect(404)
        .expect((res: any) => {
            expect(res.body.name).toBe(new NotFoundError().name)
        })
    });
    it('should throw InvalidFormatError for mac_address length', async () => {
        const createdDevice: Device = await createDevice(deviceData)
        await request(app)
        .post(`/update-device/${createdDevice?.id}`)
        .send(deviceDataWithMacAddressLengthError)
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res: any) => {
            expect(res.body.name).toBe(new InvalidFormatError().name)
        })
    });
    it('should throw InvalidFormatError for mac_address invalid char', async () => {
        const createdDevice = await createDevice(deviceData)
        await request(app)
        .post(`/update-device/${createdDevice?.id}`)
        .send(deviceDataWithMacAddressCharError)
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res: any) => {
            expect(res.body.name).toBe(new InvalidFormatError().name)
        })
    });
    it('should throw InvalidTypeError for type', async () => {
        const createdDevice = await createDevice(deviceData)
        await request(app)
        .post(`/update-device/${createdDevice?.id}`)
        .send(deviceDataWithTypeError)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res: any) => {
            expect(res.body.name).toBe(new InvalidTypeError().name)
        })
    });
});

describe('Delete device integration tests with thrown errors', function() {
    it('should throw NotFoundError for not found device', async () => {
        const randomId = generateRandomUUID()
        await request(app)
        .delete(`/delete-device/${randomId}`)
        .expect(404)
        .expect((res: any) => {
            expect(res.body.name).toBe(new NotFoundError().name)
        })
    });
});
