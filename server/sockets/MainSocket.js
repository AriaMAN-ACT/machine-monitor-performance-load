const mongoose = require('mongoose');

const System = require('../models/System');

mongoose.connect('mongodb://127.0.0.1/performance-data-monitor', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log('database connected');
});

const checkAndAdd = async data => {
    const isSystemAlreadyExists = await System.findOne({macAddress: data.macAddress});
    if (isSystemAlreadyExists) {
        return false;
    } else {
        const system = await System.create(data);
        return true;
    }
};

const checkAndUpdate = async (data, macAddress) => {
    const isSystemAlreadyExists = await System.findOneAndUpdate({macAddress}, data);
    return isSystemAlreadyExists && true;
};

module.exports = (io, socket) => {
    let macAddress;
    socket.on('performanceData', async data => {
        const result = await checkAndUpdate(data, macAddress);
        if (!result) {
            socket.emit('rebuild');
        }
        io.to('reactclients').emit('data', data);
    });
    socket.on('clientAuth', () => {
        socket.join('clients');
    });
    socket.on('reactAuth', () => {
        socket.join('reactclients');
    });
    socket.on('initPerformanceData', async data => {
        macAddress = data.macAddress;
        const result = await checkAndAdd(data);
    });
};