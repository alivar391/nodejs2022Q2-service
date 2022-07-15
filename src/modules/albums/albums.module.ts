import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumsDataBase } from './albums-storage';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsDataBase],
})
export class AlbumsModule {}
