import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    ArtistsService,
    AlbumsService,
    TracksService,
    PrismaService,
    PrismaService,
  ],
})
export class FavoritesModule {}
