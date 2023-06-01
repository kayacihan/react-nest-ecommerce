import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 'admin',
  database: process.env.POSTGRES_DB || 'shop',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: { migrationsDir: 'src/migrations' },
};

export default config;
