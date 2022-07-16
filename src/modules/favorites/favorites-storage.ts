import { Injectable } from '@nestjs/common';
// import { UpdateTrackDto } from './dto/update-track.dto';
// import { Track } from './entities/track.entity';

@Injectable()
export class FavoritesDataBase {
  artists: string[] = [];
  albums: string[] = [];
  tracks: string[] = [];

  private static instance;
  constructor() {
    if (!FavoritesDataBase.instance) {
      FavoritesDataBase.instance = this;
    }
    Object.assign(this, FavoritesDataBase.instance);
  }

  addArtistToFavorites(artistId: string) {
    this.artists.push(artistId);
    return artistId;
  }

  addAlbumToFavorites(albumId: string) {
    this.albums.push(albumId);
    return albumId;
  }

  addTrackToFavorites(trackId: string) {
    this.tracks.push(trackId);
    return trackId;
  }

  findAll() {
    return {
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks,
    };
  }

  deleteArtistFromFavorites(id: string) {
    const length = this.artists.length;
    this.artists = this.artists.filter((item) => item !== id);
    return length === this.artists.length;
  }

  deleteAlbumFromFavorites(id: string) {
    const length = this.albums.length;
    this.albums = this.albums.filter((item) => item !== id);
    return length === this.albums.length;
  }

  deleteTrackFromFavorites(id: string) {
    const length = this.tracks.length;
    this.tracks = this.tracks.filter((item) => item !== id);
    return length === this.tracks.length;
  }
}
