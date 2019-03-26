"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var thunks_1 = require("../thunks");
var CueVote_1 = __importDefault(require("./CueVote"));
var types_1 = require("../../../types");
var StrMap_1 = require("fp-ts/lib/StrMap");
var Operator = /** @class */ (function (_super) {
    __extends(Operator, _super);
    function Operator(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { activeVoteMap: {} };
        _this.go = _this.go.bind(_this);
        _this.pause = _this.pause.bind(_this);
        return _this;
    }
    Operator.prototype.componentDidMount = function () {
        this.props.connectws("ws://localhost:8080");
    };
    Operator.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        this.props.operator.activeVote.map(function (av) {
            return Object.entries(av.voteMap).map(function (_a) {
                var k = _a[0], v = _a[1];
                return _this.props.operator.activeVote.chain(function (av) {
                    return types_1.voteChoice.getOption([av.vote, v])
                        .map(function (s) { return _this.state.activeVoteMap[k] = s; });
                });
            });
        });
    };
    Operator.prototype.pause = function () {
        this.props.thunkChangePaused(true);
    };
    Operator.prototype.go = function () {
        this.props.thunkChangePaused(false);
    };
    Operator.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "operator" },
            React.createElement("div", { className: "all-votes" },
                React.createElement("div", { className: "cue-votes film-votes" },
                    React.createElement("div", { className: "header" }, "Film Votes"),
                    this.props.operator.filmVotes.map(function (v) {
                        return (React.createElement(CueVote_1.default, { key: v.id, vote: v, cueVote: _this.props.thunkCueVote, voteResult: StrMap_1.lookup(v.id, _this.props.operator.voteResults.all) }));
                    })),
                React.createElement("div", { className: "cue-votes show-votes" },
                    React.createElement("div", { className: "header" }, "Show Votes"),
                    this.props.operator.showVotes.map(function (v) {
                        return (React.createElement(CueVote_1.default, { key: v.id, vote: v, cueVote: _this.props.thunkCueVote, voteResult: StrMap_1.lookup(v.id, _this.props.operator.voteResults.all) }));
                    }))),
            React.createElement("div", { className: "controls" },
                React.createElement("a", { className: "button", onClick: this.props.thunkEndVote }, "Early Vote Lock"),
                React.createElement("a", { className: "button", onClick: this.go }, "Go"),
                React.createElement("a", { className: "button", onClick: this.pause }, "Pause"),
                React.createElement("a", { className: "button", onClick: this.props.thunkCueBatch }, "Cue Batch"),
                React.createElement("a", { className: "button", onClick: this.props.thunkReset }, "Reset"))));
    };
    return Operator;
}(React.Component));
var mapStateToProps = function (state) { return ({
    operator: state.operator
}); };
exports.default = react_redux_1.connect(mapStateToProps, { thunkCueVote: thunks_1.thunkCueVote, thunkChangePaused: thunks_1.thunkChangePaused, thunkCueBatch: thunks_1.thunkCueBatch, thunkEndVote: thunks_1.thunkEndVote, thunkReset: thunks_1.thunkReset, connectws: thunks_1.connectws })(Operator);
//# sourceMappingURL=Operator.js.map