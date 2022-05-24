"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateString = exports.getConnectionName = exports.handleRetry = exports.getEntityManagerToken = exports.getConnectionPrefix = exports.getConnectionToken = exports.getCustomRepositoryToken = exports.getRepositoryToken = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const circular_dependency_exception_1 = require("../exceptions/circular-dependency.exception");
const typeorm_constants_1 = require("../typeorm.constants");
const logger = new common_1.Logger('TypeOrmModule');
/**
 * This function generates an injection token for an Entity or Repository
 * @param {EntityClassOrSchema} entity parameter can either be an Entity or Repository
 * @param {string} [connection='default'] Connection name
 * @returns {string} The Entity | Repository injection token
 */
function getRepositoryToken(entity, connection = typeorm_constants_1.DEFAULT_CONNECTION_NAME) {
    if (entity === null || entity === undefined) {
        throw new circular_dependency_exception_1.CircularDependencyException('@InjectRepository()');
    }
    const connectionPrefix = getConnectionPrefix(connection);
    if (entity instanceof Function &&
        (entity.prototype instanceof typeorm_1.Repository ||
            entity.prototype instanceof typeorm_1.AbstractRepository)) {
        if (!connectionPrefix) {
            return entity;
        }
        return `${connectionPrefix}${getCustomRepositoryToken(entity)}`;
    }
    if (entity instanceof typeorm_1.EntitySchema) {
        return `${connectionPrefix}${entity.options.target ? entity.options.target.name : entity.options.name}Repository`;
    }
    return `${connectionPrefix}${entity.name}Repository`;
}
exports.getRepositoryToken = getRepositoryToken;
/**
 * This function generates an injection token for an Entity or Repository
 * @param {Function} This parameter can either be an Entity or Repository
 * @returns {string} The Repository injection token
 */
function getCustomRepositoryToken(repository) {
    if (repository === null || repository === undefined) {
        throw new circular_dependency_exception_1.CircularDependencyException('@InjectRepository()');
    }
    return repository.name;
}
exports.getCustomRepositoryToken = getCustomRepositoryToken;
/**
 * This function returns a Connection injection token for the given Connection, ConnectionOptions or connection name.
 * @param {Connection | ConnectionOptions | string} [connection='default'] This optional parameter is either
 * a Connection, or a ConnectionOptions or a string.
 * @returns {string | Function} The Connection injection token.
 */
function getConnectionToken(connection = typeorm_constants_1.DEFAULT_CONNECTION_NAME) {
    return typeorm_constants_1.DEFAULT_CONNECTION_NAME === connection
        ? typeorm_1.Connection
        : 'string' === typeof connection
            ? `${connection}Connection`
            : typeorm_constants_1.DEFAULT_CONNECTION_NAME === connection.name || !connection.name
                ? typeorm_1.Connection
                : `${connection.name}Connection`;
}
exports.getConnectionToken = getConnectionToken;
/**
 * This function returns a Connection prefix based on the connection name
 * @param {Connection | ConnectionOptions | string} [connection='default'] This optional parameter is either
 * a Connection, or a ConnectionOptions or a string.
 * @returns {string | Function} The Connection injection token.
 */
function getConnectionPrefix(connection = typeorm_constants_1.DEFAULT_CONNECTION_NAME) {
    if (connection === typeorm_constants_1.DEFAULT_CONNECTION_NAME) {
        return '';
    }
    if (typeof connection === 'string') {
        return connection + '_';
    }
    if (connection.name === typeorm_constants_1.DEFAULT_CONNECTION_NAME || !connection.name) {
        return '';
    }
    return connection.name + '_';
}
exports.getConnectionPrefix = getConnectionPrefix;
/**
 * This function returns an EntityManager injection token for the given Connection, ConnectionOptions or connection name.
 * @param {Connection | ConnectionOptions | string} [connection='default'] This optional parameter is either
 * a Connection, or a ConnectionOptions or a string.
 * @returns {string | Function} The EntityManager injection token.
 */
function getEntityManagerToken(connection = typeorm_constants_1.DEFAULT_CONNECTION_NAME) {
    return typeorm_constants_1.DEFAULT_CONNECTION_NAME === connection
        ? typeorm_1.EntityManager
        : 'string' === typeof connection
            ? `${connection}EntityManager`
            : typeorm_constants_1.DEFAULT_CONNECTION_NAME === connection.name || !connection.name
                ? typeorm_1.EntityManager
                : `${connection.name}EntityManager`;
}
exports.getEntityManagerToken = getEntityManagerToken;
function handleRetry(retryAttempts = 9, retryDelay = 3000, connectionName = typeorm_constants_1.DEFAULT_CONNECTION_NAME, verboseRetryLog = false, toRetry) {
    return (source) => source.pipe((0, operators_1.retryWhen)((e) => e.pipe((0, operators_1.scan)((errorCount, error) => {
        if (toRetry && !toRetry(error)) {
            throw error;
        }
        const connectionInfo = connectionName === typeorm_constants_1.DEFAULT_CONNECTION_NAME
            ? ''
            : ` (${connectionName})`;
        const verboseMessage = verboseRetryLog
            ? ` Message: ${error.message}.`
            : '';
        logger.error(`Unable to connect to the database${connectionInfo}.${verboseMessage} Retrying (${errorCount +
            1})...`, error.stack);
        if (errorCount + 1 >= retryAttempts) {
            throw error;
        }
        return errorCount + 1;
    }, 0), (0, operators_1.delay)(retryDelay))));
}
exports.handleRetry = handleRetry;
function getConnectionName(options) {
    return options && options.name ? options.name : typeorm_constants_1.DEFAULT_CONNECTION_NAME;
}
exports.getConnectionName = getConnectionName;
const generateString = () => (0, uuid_1.v4)();
exports.generateString = generateString;
