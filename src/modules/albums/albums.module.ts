import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumsDataBase } from './albums-storage';
import { TracksDataBase } from '../tracks/tracks-storage';
import { FavoritesDataBase } from '../favorites/favorites-storage';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsDataBase, TracksDataBase, FavoritesDataBase],
})
export class AlbumsModule {}
