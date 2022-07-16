import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesDataBase } from './favorites-storage';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsDataBase } from '../artists/artists-storage';
import { AlbumsDataBase } from '../albums/albums-storage';
import { TracksDataBase } from '../tracks/tracks-storage';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    FavoritesDataBase,
    ArtistsService,
    AlbumsService,
    TracksService,
    ArtistsDataBase,
    AlbumsDataBase,
    TracksDataBase,
  ],
})
export class FavoritesModule {}
