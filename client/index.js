const os = require('os');
const io = require('socket.io-client');

const socket = io('http://127.0.0.1:3001');

socket.on('connect', () => {
    console.log('connected');
    const networkInterface = os.networkInterfaces();
    let macAddress;
    for (let key in networkInterface) {
        if (!networkInterface[key][0].internal) {
            macAddress = networkInterface[key][0].address;
            break;
        }
    }
    if (!macAddress) {
        console.error('Internet Error: You need to be connected to network');
        process.exit(1);
    }
    socket.emit('clientAuth');
    getPerformanceData()
        .then(data => {
            data.macAddress = macAddress;
            socket.emit('initPerformanceData', data);
        })
        .catch(err => console.log(err));
    const getPerformanceDataInterval = setInterval(() => {
        getPerformanceData().then(data => socket.emit('performanceData', data)).catch(err => console.log(err));
    }, 1000);
    socket.on('rebuild', () => {
        getPerformanceData()
            .then(data => {
                data.macAddress = macAddress;
                socket.emit('initPerformanceData', data);
            })
            .catch(err => console.log(err));
    });
    socket.on('disconnect', () => {
        clearInterval(getPerformanceDataInterval);
    });
});

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
    const memUsage = Math.floor((Math.floor(usedMem / totalMem * 10000) / 100) * 100) / 100;
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
        cpuUsage,
        isOffline: false
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