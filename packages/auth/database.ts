import {
  Connection,
  ConnectionManager,
  createConnection,
  getConnectionManager,
} from 'typeorm'
import { AutoEncryptSubscriber } from 'typeorm-encrypted'

import getEnv from './config'

import 'reflect-metadata'

const config = getEnv()

export class Database {
  private connectionManager: ConnectionManager

  constructor() {
    this.connectionManager = getConnectionManager()
  }

  public async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = `default`

    if (this.connectionManager.has(CONNECTION_NAME)) {
      await this.connectionManager.get(CONNECTION_NAME).close()
    }

    return createConnection({
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
        ssl: config.dbsslconn, // if not development, will use SSL
      },
      subscribers: [AutoEncryptSubscriber],
    })
  }
}
