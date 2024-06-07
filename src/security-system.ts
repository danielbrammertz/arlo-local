import {
  Device,
  DeviceProvider,
  OnOff,
  ScryptedDeviceBase,
  ScryptedDeviceType,
  ScryptedInterface,
  SecuritySystem,
  SecuritySystemMode,
} from "@scrypted/sdk";
import { ArloDeviceBase } from "./arlo-device-base";
import {
  DeviceSummary,
  DeviceRegistration,
  DeviceStatus,
} from "./base-station-api-client";
import { ArloDeviceProvider } from "./main";

export class ArloSecuritySystem extends ScryptedDeviceBase implements OnOff {
  deviceSummary: DeviceSummary;
  deviceRegistration: DeviceRegistration;

  constructor(
    public provider: ArloDeviceProvider,
    nativeId: string,
    deviceSummary: DeviceSummary,
    deviceRegistration: DeviceRegistration | undefined,
    deviceStatus: DeviceStatus | undefined
  ) {
    super(nativeId);
  }

  async turnOff(): Promise<void> {
    this.console.log("Turning off security system");
    this.provider.baseStationApiClient.disarm(this.deviceSummary.serial_number);
  }
  async turnOn(): Promise<void> {
    this.console.log("Turning on security system");
    this.provider.baseStationApiClient.arm(this.deviceSummary.serial_number);
  }
}
