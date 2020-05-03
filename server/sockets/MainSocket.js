module.exports = (io, socket) => {
    socket.on('performanceData', data => {});
    socket.on('clientAuth', data => {
        socket.join('clients');
    });
};