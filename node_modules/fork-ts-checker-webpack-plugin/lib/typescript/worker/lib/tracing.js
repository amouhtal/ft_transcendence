"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpTracingLegendIfNeeded = exports.stopTracingIfNeeded = exports.startTracingIfNeeded = void 0;
const config_1 = require("./config");
const typescript_1 = require("./typescript");
const worker_config_1 = require("./worker-config");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tracing = typescript_1.typescript.tracing;
function startTracingIfNeeded(compilerOptions) {
    if (compilerOptions.generateTrace && tracing) {
        tracing.startTracing((0, config_1.getConfigFilePathFromCompilerOptions)(compilerOptions), compilerOptions.generateTrace, worker_config_1.config.build);
    }
}
exports.startTracingIfNeeded = startTracingIfNeeded;
function stopTracingIfNeeded(program) {
    const compilerOptions = program.getCompilerOptions();
    if (compilerOptions.generateTrace && tracing) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tracing.stopTracing(program.getProgram().getTypeCatalog());
    }
}
exports.stopTracingIfNeeded = stopTracingIfNeeded;
function dumpTracingLegendIfNeeded() {
    if (tracing) {
        tracing.dumpLegend();
    }
}
exports.dumpTracingLegendIfNeeded = dumpTracingLegendIfNeeded;
