const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/performance-data-monitor', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log('database connected');
});

module.exports = (io, socket) => {
    let macAddress;
    socket.on('performanceData', data => {});
    socket.on('clientAuth', data => {
        socket.join('clients');
    });
    socket.on('initPerformanceData', data => {
        checkAndAdd(data.macAddress);
    });
};