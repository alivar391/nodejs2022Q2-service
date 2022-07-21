import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksDataBase } from './tracks-storage';
import { FavoritesDataBase } from '../favorites/favorites-storage';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksDataBase, FavoritesDataBase],
})
export class TracksModule {}
