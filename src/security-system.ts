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

  constructor(
    public provider: ArloDeviceProvider,
    nativeId: string,
    private deviceSummary: DeviceSummary,
    private deviceRegistration: DeviceRegistration | undefined,
    deviceStatus: DeviceStatus | undefined
  ) {
    super(nativeId);
  }

  async turnOff(): Promise<void> {
    this.console.log("Turning off security system " +this.deviceSummary?.serial_number);
	try{
    await this.provider.baseStationApiClient.disarm(this.deviceSummary.serial_number);
	}catch(e){
		this.console.log(e);
	}
  }
  async turnOn(): Promise<void> {
    this.console.log("Turning on security system " +this.deviceSummary?.serial_number);
    try{
	await this.provider.baseStationApiClient.arm(this.deviceSummary.serial_number);
	}catch (e){
		this.console.log(e);
	}
  }
}
