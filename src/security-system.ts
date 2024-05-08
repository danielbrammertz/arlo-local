import { Device, DeviceProvider, OnOff, ScryptedDeviceBase, ScryptedDeviceType, ScryptedInterface, SecuritySystem, SecuritySystemMode } from '@scrypted/sdk';
import { ArloDeviceBase } from './arlo-device-base';
import { DeviceSummary, DeviceRegistration, DeviceStatus } from './base-station-api-client';
import { ArloDeviceProvider } from './main';
import sdk from '@scrypted/sdk';


const { deviceManager } = sdk;

export class ArloSecuritySystem extends ScryptedDeviceBase implements SecuritySystem, OnOff, DeviceProvider {
	deviceSummary: DeviceSummary;
    deviceRegistration: DeviceRegistration;

	readonly supportedModes = [SecuritySystemMode.Disarmed, SecuritySystemMode.AwayArmed];
	
	constructor(public provider: ArloDeviceProvider, nativeId: string, deviceSummary: DeviceSummary, deviceRegistration: DeviceRegistration | undefined, deviceStatus: DeviceStatus | undefined) {
		super(nativeId);
		this.console.log('ArloSecuritySystem-CONSTRUCTOR');

        this.deviceSummary = deviceSummary;
		this.on = false;
		this.on = true;
		this.running = false;
		this.running = true;
		this.paused = false;
		this.securitySystemState = {
			"supportedModes": this.supportedModes,
			"mode": SecuritySystemMode.AwayArmed,
			triggered: false,
		}
		this.discoverDevices();
		const state = deviceManager.getDeviceState(this.nativeId);
		this.console.log('Got DeviceState: ', JSON.stringify(state));
		state.securitySystemState = this.securitySystemState;
		state.on = false;
		state.on = true;
		state.running = false;
		state.running = true;
		state.paused = false;
		

		
    }

	async discoverDevices() {
		const scryptedDevices: Device[] = [];
this.storage
		scryptedDevices.push(  {
			"info": {
				"model": 'SIREN' + this.deviceSummary.friendly_name,
				"manufacturer": "Arlo",
				"firmware": '123',
				"serialNumber": 'SIREN' + this.deviceSummary.serial_number,
			},
			"nativeId": 'SIREN' + this.deviceSummary.serial_number,
			"name": 'SIREN' + 'SIREN' + this.deviceSummary.serial_number,
			"interfaces": [ScryptedInterface.OnOff],
			"type": ScryptedDeviceType.Siren,
			"providerNativeId": this.nativeId,
		});
		this.console.log('ArloSecuritySystem-Before publish');
		
		await deviceManager.onDevicesChanged({
            providerNativeId: this.nativeId,
            devices: scryptedDevices,
        });

		this.console.log('ArloSecuritySystem-AFTER publish');

	}
	async getDevice(nativeId: string): Promise<any> {
		this.console.log('ArloSecuritySystem-getDevice');
		return this;
	}


	async releaseDevice(id: string, nativeId: string): Promise<void> {
		
	}
	async turnOff(): Promise<void> {
		this.console.log('Turning off security system');
	}
	async turnOn(): Promise<void> {
		this.console.log('Turning on security system');
	}

	async armSecuritySystem(mode: SecuritySystemMode): Promise<void> {
		this.console.log(`Arming security system to ${mode}`);
		this.securitySystemState = {
			"supportedModes": this.supportedModes,
			"mode": mode,
			triggered: false,
		}
		this.provider.baseStationApiClient.arm(this.deviceSummary.serial_number);
	}

	async disarmSecuritySystem(): Promise<void> {
		this.console.log('Disarming security system');
		this.securitySystemState = {
			supportedModes: this.supportedModes,
			"mode": SecuritySystemMode.Disarmed,
			triggered: false,
		}
		this.provider.baseStationApiClient.disarm(this.deviceSummary.serial_number)
	}

}