import { DEVICE_NOT_FOUND, INVALID_DEVICE_TYPE, INVALID_MAC_ADDRESS_FORMAT } from "./errorConstants";

export class ApiError extends Error {
    status?: number;
}

export class NotFoundError extends ApiError {
    constructor () {
      super();
      this.name = DEVICE_NOT_FOUND;
      this.message = "Dispositivo não encontrado";
      this.status = 404
    }
}

export class InvalidFormatError extends ApiError {
    constructor () {
      super();
      this.name = INVALID_MAC_ADDRESS_FORMAT;
      this.message = "O campo MAC Address deve ter o formato XX-XX-XX-XX-XX-XX";
      this.status = 400
    }
}

export class InvalidTypeError extends ApiError {
    constructor () {
      super();
      this.name = INVALID_DEVICE_TYPE;
      this.message = "O campo 'tipo' deve ser câmera, sensor ou controle remoto";
      this.status = 400
    }
}
