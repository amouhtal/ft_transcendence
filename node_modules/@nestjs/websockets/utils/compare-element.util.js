"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareElementAt = void 0;
function compareElementAt(prev, curr, index) {
    return prev && curr && prev[index] === curr[index];
}
exports.compareElementAt = compareElementAt;
