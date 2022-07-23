import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsDataBase } from './artists-storage';
import { AlbumsDataBase } from '../albums/albums-storage';
import { TracksDataBase } from '../tracks/tracks-storage';
import { FavoritesDataBase } from '../favorites/favorites-storage';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    ArtistsDataBase,
    AlbumsDataBase,
    TracksDataBase,
    FavoritesDataBase,
    PrismaService,
  ],
})
export class ArtistsModule {}
