const mongoose = require('mongoose');

const systemSchema = new mongoose.Schema({
    macAddress: String,
    cpuLoad: Number,
    freeMem: Number,
    totalMem: Number,
    usedMem: Number,
    osType: String,
    upTime: Number,
    cpusModel: String,
    cpusSpeed: String,
    coresCount: Number
});

const System = mongoose.model('System', systemSchema);
module.exports = System;