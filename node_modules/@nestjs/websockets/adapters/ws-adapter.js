"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractWsAdapter = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const core_1 = require("@nestjs/core");
const constants_1 = require("../constants");
class AbstractWsAdapter {
    constructor(appOrHttpServer) {
        if (appOrHttpServer && appOrHttpServer instanceof core_1.NestApplication) {
            this.httpServer = appOrHttpServer.getUnderlyingHttpServer();
        }
        else {
            this.httpServer = appOrHttpServer;
        }
    }
    bindClientConnect(server, callback) {
        server.on(constants_1.CONNECTION_EVENT, callback);
    }
    bindClientDisconnect(client, callback) {
        client.on(constants_1.DISCONNECT_EVENT, callback);
    }
    async close(server) {
        const isCallable = server && (0, shared_utils_1.isFunction)(server.close);
        isCallable && (await new Promise(resolve => server.close(resolve)));
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async dispose() { }
}
exports.AbstractWsAdapter = AbstractWsAdapter;
