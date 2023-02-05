import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FileService } from './file/file.service';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register()],
  controllers: [AppController],
  providers: [AppService, FileService],
})
export class AppModule {}
