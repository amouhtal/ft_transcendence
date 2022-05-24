"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeOrmProviders = void 0;
const typeorm_1 = require("typeorm");
const typeorm_utils_1 = require("./common/typeorm.utils");
function createTypeOrmProviders(entities, connection) {
    return (entities || []).map((entity) => ({
        provide: (0, typeorm_utils_1.getRepositoryToken)(entity, connection),
        useFactory: (connection) => {
            if (entity instanceof Function &&
                (entity.prototype instanceof typeorm_1.Repository ||
                    entity.prototype instanceof typeorm_1.AbstractRepository)) {
                return connection.getCustomRepository(entity);
            }
            return connection.options.type === 'mongodb'
                ? connection.getMongoRepository(entity)
                : connection.getRepository(entity);
        },
        inject: [(0, typeorm_utils_1.getConnectionToken)(connection)],
        /**
         * Extra property to workaround dynamic modules serialisation issue
         * that occurs when "TypeOrm#forFeature()" method is called with the same number
         * of arguments and all entities share the same class names.
         */
        targetEntitySchema: (0, typeorm_1.getMetadataArgsStorage)().tables.find((item) => item.target === entity),
    }));
}
exports.createTypeOrmProviders = createTypeOrmProviders;
