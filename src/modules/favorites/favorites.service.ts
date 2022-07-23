import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
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
    const artists1 = this.artistsService.findAll();
    const tracks1 = this.tracksService.findAll();
    const albums1 = this.albumsService.findAll();
    const favorites = this.favoritesDataBase.findAll();
    const answer = {
      // artists: artists1.filter((item) => favorites.artists.includes(item.id)),
      // albums: albums1.filter((item) => favorites.albums.includes(item.id)),
      // tracks: tracks1.filter((item) => favorites.tracks.includes(item.id)),
    };
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
