import { Inject } from '@nestjs/common';
import { Connection, ConnectionOptions } from 'typeorm';
import { EntityClassOrSchema } from '../interfaces/entity-class-or-schema.type';
export declare const InjectRepository: (entity: EntityClassOrSchema, connection?: string) => ReturnType<typeof Inject>;
export declare const InjectConnection: (connection?: Connection | ConnectionOptions | string) => ReturnType<typeof Inject>;
export declare const InjectEntityManager: (connection?: Connection | ConnectionOptions | string) => ReturnType<typeof Inject>;
