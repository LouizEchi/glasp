"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typeorm_encrypted_1 = require("typeorm-encrypted");
const config_1 = __importDefault(require("./config"));
require("reflect-metadata");
const config = config_1.default();
class Database {
    constructor() {
        this.connectionManager = typeorm_1.getConnectionManager();
    }
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const CONNECTION_NAME = `default`;
            let connection;
            if (this.connectionManager.has(CONNECTION_NAME)) {
                console.log(`Database.getConnection()-using existing connection ...`);
                connection = yield this.connectionManager.get(CONNECTION_NAME);
                if (!connection.isConnected) {
                    connection = yield connection.connect();
                }
            }
            else {
                console.log(`Database.getConnection()-creating connection ...`);
                connection = yield typeorm_1.createConnection({
                    type: 'postgres',
                    host: config.host,
                    port: config.port,
                    username: config.user,
                    password: config.password,
                    database: config.database,
                    synchronize: true,
                    logging: false,
                    entities: ['.build/src/entity.js'],
                    extra: {
                        ssl: config.dbsslconn,
                    },
                    subscribers: [typeorm_encrypted_1.AutoEncryptSubscriber],
                });
            }
            return connection;
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map