"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.auto_delete = exports.auto_put = exports.auto_post = exports.auto_get = exports.autos_get = void 0;
var auto_1 = require("../db/auto");
// Получить все машины
var autos_get = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sort, autos, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                sort = null;
                switch (req.query.sort) {
                    case "brandUp":
                        sort = { brand: 1 };
                        break;
                    case "brandDown":
                        sort = { brand: -1 };
                        break;
                    case "nameUp":
                        sort = { name: 1 };
                        break;
                    case "nameDown":
                        sort = { name: -1 };
                        break;
                    case "prodDateUp":
                        sort = { prodDate: 1 };
                        break;
                    case "prodDateDown":
                        sort = { prodDate: -1 };
                        break;
                    case "priceUp":
                        sort = { price: 1 };
                        break;
                    case "priceDown":
                        sort = { price: -1 };
                        break;
                    default:
                        break;
                }
                return [4 /*yield*/, auto_1.Auto.find({ status: "actual" }).sort(sort)];
            case 1:
                autos = _a.sent();
                res.send(autos);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.autos_get = autos_get;
// Получить одну машину по id
var auto_get = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auto, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, auto_1.Auto.findById(req.query.id).populate("oldVersions")];
            case 1:
                auto = _a.sent();
                if (!auto) {
                    throw new Error();
                }
                res.send(auto);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.auto_get = auto_get;
// Добавить машину
var auto_post = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auto, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, auto_1.Auto.create(req.body)];
            case 1:
                auto = _a.sent();
                if (!auto) {
                    throw new Error();
                }
                res.send(auto);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.auto_post = auto_post;
// Изменить машину
var auto_put = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var autoToUpd, brand, name_1, prodDate, price, oldAuto, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, auto_1.Auto.findById(req.body.id)];
            case 1:
                autoToUpd = _a.sent();
                if (autoToUpd.status === "deprecated") {
                    throw new Error("Изменение устаревших данных запрещено");
                }
                brand = autoToUpd.brand, name_1 = autoToUpd.name, prodDate = autoToUpd.prodDate, price = autoToUpd.price;
                if (req.body.data.prodDate === null) {
                    throw new Error("Некорректная дата");
                }
                oldAuto = new auto_1.Auto({
                    brand: brand,
                    name: name_1,
                    prodDate: prodDate,
                    price: price,
                    status: "deprecated"
                });
                return [4 /*yield*/, auto_1.Auto.findByIdAndUpdate(autoToUpd._id, req.body.data, {
                        "new": true
                    }).populate("oldVersions")];
            case 2:
                autoToUpd = _a.sent();
                if (!autoToUpd) {
                    throw new Error();
                }
                autoToUpd.oldVersions.push(oldAuto._id);
                oldAuto.save();
                return [4 /*yield*/, autoToUpd.save()];
            case 3:
                _a.sent();
                res.send(autoToUpd);
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.auto_put = auto_put;
// Удалить машину
var auto_delete = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auto, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, auto_1.Auto.findById(req.query.id)];
            case 1:
                auto = _a.sent();
                if (auto.status === "deprecated") {
                    throw new Error("Удаление устаревших данных запрещено");
                }
                return [4 /*yield*/, auto_1.Auto.findByIdAndDelete(req.query.id)];
            case 2:
                auto = _a.sent();
                auto.oldVersions.map(function (v) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, auto_1.Auto.findByIdAndRemove(v)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                if (!auto) {
                    throw new Error("Не найден");
                }
                res.send(auto);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.auto_delete = auto_delete;
