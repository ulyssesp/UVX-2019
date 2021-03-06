"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./store/operator/types");
var actions_1 = require("./store/operator/actions");
var websocket_actions_1 = require("./store/common/websocket_actions");
var actions_2 = require("./store/client/actions");
var types_2 = require("./store/client/types");
exports.thunkCueVote = function (voteId) { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch(actions_1.cueVote(voteId));
        dispatch(websocket_actions_1.websocketSend({ type: types_1.CUE_VOTE, payload: voteId }));
        return [2 /*return*/];
    });
}); }; };
exports.thunkCueBatch = function () { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch(websocket_actions_1.websocketSend({ type: types_1.CUE_BATCH }));
        return [2 /*return*/];
    });
}); }; };
exports.thunkEndVote = function () { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch(websocket_actions_1.websocketSend({ type: types_1.END_VOTE }));
        return [2 /*return*/];
    });
}); }; };
exports.thunkClearVoteResult = function () { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch(websocket_actions_1.websocketSend({ type: types_1.CLEAR_VOTE_RESULT }));
        return [2 /*return*/];
    });
}); }; };
exports.thunkReset = function () { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch(websocket_actions_1.websocketSend({ type: types_1.RESET }));
        return [2 /*return*/];
    });
}); }; };
exports.thunkVote = function (userId, voteId, voteChoice) { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    var voteAction;
    return __generator(this, function (_a) {
        voteAction = { voteId: voteId, vote: voteChoice, userId: userId };
        dispatch(actions_2.vote(voteAction));
        dispatch(websocket_actions_1.websocketSend({ type: types_2.VOTE, payload: voteAction }));
        return [2 /*return*/];
    });
}); }; };
exports.thunkReloadData = function () { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch(websocket_actions_1.websocketSend({ type: types_1.RELOAD_DATA }));
        return [2 /*return*/];
    });
}); }; };
exports.thunkCueCue = function (cueId) { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch(websocket_actions_1.websocketSend({ type: types_1.CUE_CUE, payload: cueId }));
        return [2 /*return*/];
    });
}); }; };
exports.thunkDecueCue = function (cueId, finishTime) { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch(websocket_actions_1.websocketSend({ type: types_1.DECUE_CUE, payload: [cueId, finishTime] }));
        return [2 /*return*/];
    });
}); }; };
exports.thunkChangePaused = function (paused) { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch(websocket_actions_1.websocketSend({ type: types_1.CHANGE_PAUSED, payload: paused }));
        return [2 /*return*/];
    });
}); }; };
exports.connectws = function (url) { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch(websocket_actions_1.websocketConnect({ url: url }));
        return [2 /*return*/];
    });
}); }; };
//# sourceMappingURL=thunks.js.map