const os = require('os');

const cpus = os.cpus();

const osType = `${os.type()}: ${os.platform()}`;
const osUpTime = os.uptime();
const freeMem = os.freemem();
const totalMem = os.totalmem();
const usedMem = totalMem - freeMem;
const memUsage = Math.floor(usedMem / totalMem * 100) / 100;
const cpusModels = cpus.map(cpu => cpu.model);
const cpusModel = cpusModels.filter((val, index) => {
    for (let i = 0; i < index; i++) {
        if (cpusModels[i] === val) {
            return false;
        }
    }
    return true;
});
const cpusSpeeds = cpus.map(cpu => cpu.speed);
const cpusSpeed = cpusSpeeds.filter((val, index) => {
    for (let i = 0; i < index; i++) {
        if (cpusSpeeds[i] === val) {
            return false;
        }
    }
    return true;
});
const coresCount = cpus.length / 2;
const cpusCount = cpusModel.length;