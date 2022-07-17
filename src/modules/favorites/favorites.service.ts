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
    private readonly artistsDataBase: ArtistsDataBase,
    private readonly albumsDataBase: AlbumsDataBase,
    private readonly tracksDataBase: TracksDataBase,
  ) {}

  addArtistToFavorites(id: string) {
    const artist = this.artistsDataBase.findOne(id);
    // if (!artist) {
    //   throw new UnprocessableEntityException('Not found');
    // }
    this.favoritesDataBase.addArtistToFavorites(id);
    return { id: id };
  }

  addAlbumToFavorites(id: string) {
    const album = this.albumsDataBase.findOne(id);
    // if (!album) {
    //   throw new UnprocessableEntityException('Not found');
    // }
    this.favoritesDataBase.addAlbumToFavorites(id);
    return { id: id };
  }

  addTrackToFavorites(id: string) {
    const track = this.tracksDataBase.findOne(id);
    // if (!track) {
    //   throw new UnprocessableEntityException('Not found');
    // }
    this.favoritesDataBase.addTrackToFavorites(id);
    return { id: id };
  }

  findAll() {
    const artists = this.artistsService.findAll();
    console.log('====', artists);
    const tracks = this.tracksService.findAll();
    const albums = this.albumsService.findAll();
    const favorites = this.favoritesDataBase.findAll();
    const answer = {
      // artists: artists.filter((item) => favorites.artists.includes(item.id)),
      // albums: albums.filter((item) => favorites.albums.includes(item.id)),
      // tracks: tracks.filter((item) => favorites.tracks.includes(item.id)),
      artists: artists,
      albums: albums,
      tracks: tracks,
    };
    console.log('_________________________');
    console.log(answer);
    return answer;
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
