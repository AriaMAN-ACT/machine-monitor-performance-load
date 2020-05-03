const os = require('os');

const cpus = os.cpus();

const osType = `${os.type()}: ${os.platform()}`;
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

const getPerformanceData = async () => {
    const osUpTime = os.uptime();
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor(usedMem / totalMem * 100) / 100;
    const cpuUsage = await getCpuLoad();
    return {
        osType,
        osUpTime,
        freeMem,
        totalMem,
        memUsage,
        cpusModel,
        cpusSpeed,
        coresCount,
        cpusCount,
        cpuUsage
    };
};

const cpuAverageUsage = () => {
    const cpus = os.cpus();
    let idleMs = 0;
    let totalMs = 0;
    cpus.forEach(core => {
        for (type in core.times) {
            totalMs += core.times[type];
        }
        idleMs += core.times.idle;
    });
    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length
    };
};


const getCpuLoad = () => {
    return new Promise(((resolve, reject) => {
        const start = cpuAverageUsage();
        setTimeout(() => {
            const end = cpuAverageUsage();
            const idleDifference = start.idle - end.idle;
            const totalDifference = start.total - end.total;
            const cpuUsage =
                Math.floor((100 - Math.floor(idleDifference / totalDifference * 10000) / 100) * 100) / 100;
            resolve(cpuUsage);
        }, 100);
    }));
};