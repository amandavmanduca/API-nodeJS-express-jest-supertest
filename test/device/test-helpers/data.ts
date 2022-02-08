import { Device, DeviceType } from "../../../src/modules/devices/entities/devices"

export const deviceData: Device = {
    name: "DEVICE NAME TEST",
    serial: "12312",
    mac_address: "AABBCCDDEEFF",
    type: DeviceType.CAMERA
}

export const deviceDataWithMacAddressLengthError: Device = {
    name: "DEVICE NAME TEST",
    serial: "12312",
    mac_address: "AABBCCDDEEFFasdasdasd",
    type: DeviceType.CAMERA
}

export const deviceDataWithMacAddressCharError: Device = {
    name: "DEVICE NAME TEST",
    serial: "12312",
    mac_address: "AABBCCDDEEF*",
    type: DeviceType.CAMERA
}

export const deviceDataWithTypeError: any = {
    name: "DEVICE NAME TEST",
    serial: "12312",
    mac_address: "AABBCCDDEEFA",
    type: "NOT_USED_TYPE"
}

export const updatedDevice: Device = {
    name: "DEVICE NAME TEST UPDATED",
    serial: "12312",
    mac_address: "AABB22DDE4FF",
    type: DeviceType.SENSOR
}