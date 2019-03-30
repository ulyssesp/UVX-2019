"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var Option_1 = require("fp-ts/lib/Option");
var fparr = __importStar(require("fp-ts/lib/Array"));
var fpm = __importStar(require("fp-ts/lib/StrMap"));
var fpfold = __importStar(require("fp-ts/lib/Foldable2v"));
var util_1 = require("./util");
var function_1 = require("fp-ts/lib/function");
var Monoid_1 = require("fp-ts/lib/Monoid");
function startVote(voteId) {
    var voteChoiceToNum = function (vc) {
        switch (vc) {
            case "optionA": return "1";
            case "optionB": return "2";
            case "optionC": return "3";
        }
    };
    var F = fpfold.getFoldableComposition(fparr.array, Option_1.option);
    var bfvToMovie = function (bfv, vrs) {
        return Option_1.some(fparr.array.map(bfv.basis, function (s) { return types_1.voteResult.at(s).get(vrs); }))
            .filter(function (vcs) { return fparr.array.foldr(vcs, true, function (a, b) { return a.isSome() && b; }); })
            .map(function (vcs) { return fparr.array.map(vcs, function (vc) { return vc.map(voteChoiceToNum); }); })
            .map(function (vcs) { return F.reduce(vcs, "", Monoid_1.monoidString.concat); })
            .chain(function (nums) { return Option_1.fromNullable(bfv.durations[nums]).map(function (d) { return [nums, d]; }); })
            .map(function (_a) {
            var nums = _a[0], d = _a[1];
            return ({
                batchFile: bfv.prefix + nums + bfv.extension,
                batchLength: d,
                loopFile: bfv.prefix + nums + "_loop" + bfv.extension
            });
        });
    };
    return function (s) {
        return types_1.findVote.at(voteId).get(s)
            .filter(types_1.isVotedFilmVote)
            .map(util_1.createActiveVote)
            .map(function (v) { return types_1.activeVoteLens.set(Option_1.some(v))(s); })
            .alt(types_1.findVote.at(voteId).get(s)
            .filter(types_1.isBasisFilmVote)
            .map(function (bfv) { return bfvToMovie(bfv, s.voteResults); })
            .map(function (movie) { return types_1.activeMovieLens.set(movie)(s); }))
            .getOrElse(s);
    };
}
exports.startVote = startVote;
function endVote() {
    var findWinner = function (v, vm) {
        return vm.reduceWithKey(new fpm.StrMap({}), function (k, counts, vc) {
            return fpm.insert(vc, fpm.lookup(vc, counts).getOrElse(1), counts);
        })
            .reduceWithKey([0, types_1.options(v)[Math.floor(Math.random() * types_1.options(v).length)][1]], function (key, vv, count) {
            return vv[0] > count ?
                vv : [count, key];
        })[1];
    };
    return function (s) {
        return types_1.activeVote.getOption(s)
            .map(function (av) {
            return function_1.compose(types_1.allVoteResults.modify(function (vrs) { return fpm.insert(av.vote.id, findWinner(av.vote, av.voteMap), vrs); }), types_1.filmVote.getOption(av.vote).map(function (_) { return types_1.voteResults.compose(types_1.latestFilmVoteId).set(Option_1.some(av.vote.id)); }).getOrElse(function_1.identity), types_1.showVote.getOption(av.vote).map(function (_) { return types_1.voteResults.compose(types_1.latestShowVoteId).set(Option_1.some(av.vote.id)); }).getOrElse(function_1.identity), types_1.latestVoteResultId.set(Option_1.some(av.vote.id)))(s);
        })
            .map(types_1.activeVoteLens.set(Option_1.none))
            .getOrElse(s);
    };
}
exports.endVote = endVote;
function cueBatch() {
    return function (s) {
        return types_1.latestVoteResultId.get(s)
            .chain(function (vrid) {
            return types_1.latestVoteResultChoice(s)
                .map(function (vrch) { return [vrid, vrch]; });
        })
            .chain(function (vr) { return fparr
            .findFirst(s.filmVotes, function (x) { return x.id === vr[0]; })
            .filter(types_1.isVotedFilmVote)
            .map(function (fv) { return types_1.voteMovie(fv, vr[1]); }); })
            .map(function (vr) { return Option_1.some(vr); })
            .map(types_1.activeMovieLens.set)
            .map(function (setActiveMovie) { return types_1.latestVoteResultId.set(Option_1.none)(setActiveMovie(s)); })
            .getOrElse(s);
    };
}
exports.cueBatch = cueBatch;
function vote(voteAction) {
    return types_1.activeVoteMap.modify(function (vm) { return fpm.insert(voteAction.userId, voteAction.vote, vm); });
}
exports.vote = vote;
function clearVoteResult() {
    return types_1.latestVoteResultId.set(Option_1.none);
}
exports.clearVoteResult = clearVoteResult;
function runMovie(state, movie) {
    return types_1.activeMovieLens.set(Option_1.some(movie))(state);
}
exports.runMovie = runMovie;
function runCue(cue) {
    return function_1.compose(types_1.activeCues.modify(function (cs) { return cs.concat([[cue, new Date().getTime() + cue.duration * 1000]]); }), clearInactiveCues);
}
exports.runCue = runCue;
function clearInactiveCues(state) {
    return types_1.activeCues.modify(function (cs) { return fparr.filter(cs, function (_a) {
        var _ = _a[0], d = _a[1];
        return new Date().getTime() < d;
    }); })(state);
}
exports.clearInactiveCues = clearInactiveCues;
function changePaused(newPaused) {
    return function (s) {
        return types_1.paused.set(newPaused ? Option_1.some(new Date().getTime()) : Option_1.none)(types_1.paused.get(s)
            .map(function (p) { return types_1.activeVoteFinish.modify(function (t) { return t + new Date().getTime() - p; }); })
            .map(function (avf) { return avf(s); })
            .getOrElse(s));
    };
}
exports.changePaused = changePaused;
//# sourceMappingURL=state.js.map