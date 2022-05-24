import type * as ts from 'typescript';
export declare function startTracingIfNeeded(compilerOptions: ts.CompilerOptions): void;
export declare function stopTracingIfNeeded(program: ts.BuilderProgram): void;
export declare function dumpTracingLegendIfNeeded(): void;
