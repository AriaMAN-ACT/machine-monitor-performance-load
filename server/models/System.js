const mongoose = require('mongoose');

const systemSchema = new mongoose.Schema({
    macAddress: String,
    cpuUsage: Number,
    freeMem: Number,
    totalMem: Number,
    memUsage: Number,
    osType: String,
    osUpTime: Number,
    cpusModel: [String],
    cpusSpeed: [String],
    coresCount: Number,
    cpusCount: Number
});

const System = mongoose.model('System', systemSchema);
module.exports = System;