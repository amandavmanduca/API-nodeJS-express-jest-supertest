import { Request, Response } from "express";
import { ApiError } from "../../../utils/errorExceptions";
import { DeviceService } from "../service/devices-service";

export class DeviceController {
    constructor(private deviceService: DeviceService) {}

    async index(req: Request, res: Response) {
        try {
            const result = await this.deviceService.listAll()
            return res.json(result)
        } catch (error: ApiError | any) {
            res.status(error.status).json({
                message: error.message,
                name: error.name,
                status: error.status,
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body
            const result = await this.deviceService.createOne(data)
            return res.json(result);
        } catch (error: ApiError | any) {
            res.status(error.status).json({
                message: error.message,
                name: error.name,
                status: error.status,
            });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const result = await this.deviceService.findOne(id)
            return res.json(result);
        } catch (error: ApiError | any) {
            res.status(error.status).json({
                message: error.message,
                name: error.name,
                status: error.status,
            });
        }

    }

    async updateById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const data = req.body
            const result = await this.deviceService.updateOne({ id, data })
            return res.json(result);
        } catch (error: ApiError | any) {
            res.status(error.status).json({
                message: error.message,
                name: error.name,
                status: error.status,
            });
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const result = await this.deviceService.deleteOne({ id })
            return res.json(result);
        } catch (error: ApiError | any) {
            res.status(error.status).json({
                message: error.message,
                name: error.name,
                status: error.status,
            });
        }
    }
}