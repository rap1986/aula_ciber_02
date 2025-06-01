// mikro-orm.config.ts
import { Options } from '@mikro-orm/postgresql';

const config: Options = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  dbName: process.env.DB_NAME || 'nest_mikro_db',
  entities: ['./dist/**/*.entity.js'], // Caminho para suas entidades compiladas
  entitiesTs: ['./src/**/*.entity.ts'], // Caminho para suas entidades TypeScript
  debug: true, // Habilita o log de queries SQL no console
  migrations: {
    path: './dist/migrations', // Caminho para as migrações compiladas
    pathTs: './src/migrations', // Caminho para as migrações TypeScript
  },
};

export default config;
