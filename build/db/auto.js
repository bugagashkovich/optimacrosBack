"use strict";
exports.__esModule = true;
exports.Auto = void 0;
var mongoose_1 = require("mongoose");
var autoSchema = new mongoose_1.Schema({
    status: {
        type: String,
        required: true,
        "enum": ["actual", "deprecated"],
        "default": "actual"
    },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    prodDate: { type: Date, required: true },
    price: { type: Number, required: true },
    oldVersions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Auto" }]
});
var Auto = (0, mongoose_1.model)("Auto", autoSchema);
exports.Auto = Auto;
