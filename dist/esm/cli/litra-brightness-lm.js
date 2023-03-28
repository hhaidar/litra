#!/usr/bin/env node
import { program } from 'commander';
import { getBrightnessInLumen, setBrightnessInLumen } from '../driver';
import { getDeviceForCLI, parseIntOption } from './utils';
program
    .name('litra-brightness')
    .description("Manages the brightness of a Litra device. If a brightness argument is provided, it sets the device's brightness to the supplied value in Lumen. If no brightness argument is provided, it returns the current brightness in Lumen.")
    .option('-s, --serial-number <serialNumber>', 'serial number of the Litra device. If this is not specified and multiple devices are connected, this will default to the first identified device, which is not guaranteed to be the same every time you run this command')
    .argument('[brightness]', 'the brightness in Lumen, e.g. `80`', parseIntOption);
program.parse();
const { serialNumber } = program.opts();
const [brightness] = program.processedArgs;
try {
    const device = getDeviceForCLI(serialNumber);
    if (brightness) {
        setBrightnessInLumen(device, brightness);
    }
    else {
        console.log(getBrightnessInLumen(device));
    }
    process.exit(0);
}
catch (e) {
    console.log(e);
    process.exit(1);
}
