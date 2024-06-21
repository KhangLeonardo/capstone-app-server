// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { join } from 'path';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.getOrThrow('POSTGRES_HOST'),
//         port: 5432,
//         username: configService.getOrThrow('POSTGRES_USER'),
//         password: configService.getOrThrow('POSTGRES_PASSWORD'),
//         database: configService.getOrThrow('POSTGRES_DB'),
//         autoLoadEntities: true,
//         entities: [join(process.cwd(), 'dist/**/*.entity.js')],
//         migrations: [join(process.cwd(), 'dist/migrations/*{.ts,.js}')],
//         // do NOT use synchronize: true in real projects
//         synchronize: false,
//       }),
//     }),
//   ],
// })
// export class PostgresModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../../../../db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => dataSourceOptions,
    }),
  ],
})
export class PostgresModule {}
