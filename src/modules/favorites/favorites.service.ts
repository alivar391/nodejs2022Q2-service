import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AlbumsDataBase } from '../albums/albums-storage';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsDataBase } from '../artists/artists-storage';
import { ArtistsService } from '../artists/artists.service';
import { TracksDataBase } from '../tracks/tracks-storage';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesDataBase } from './favorites-storage';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesDataBase: FavoritesDataBase,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  addArtistToFavorites(id: string) {
    const artist = this.artistsService.findOne(id);
    if (!artist) {
      throw new UnprocessableEntityException('Not found');
    }
    this.favoritesDataBase.addArtistToFavorites(id);
    return artist;
  }

  addAlbumToFavorites(id: string) {
    const album = this.albumsService.findOne(id);
    if (!album) {
      throw new UnprocessableEntityException('Not found');
    }
    this.favoritesDataBase.addArtistToFavorites(id);
    return album;
  }

  addTrackToFavorites(id: string) {
    const track = this.tracksService.findOne(id);
    if (!track) {
      throw new UnprocessableEntityException('Not found');
    }
    this.favoritesDataBase.addArtistToFavorites(id);
    return track;
  }

  findAll() {
    return this.favoritesDataBase.findAll();
  }

  removeArtistFromFavorites(id: string) {
    return this.favoritesDataBase.deleteArtistFromFavorites(id);
  }

  removeAlbumFromFavorites(id: string) {
    return this.favoritesDataBase.deleteAlbumFromFavorites(id);
  }

  removeTrackFromFavorites(id: string) {
    return this.favoritesDataBase.deleteTrackFromFavorites(id);
  }
}
