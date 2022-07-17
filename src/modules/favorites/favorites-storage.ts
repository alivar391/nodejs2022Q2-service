import { Injectable } from '@nestjs/common';
// import { UpdateTrackDto } from './dto/update-track.dto';
// import { Track } from './entities/track.entity';

@Injectable()
export class FavoritesDataBase {
  base: { artists: string[]; albums: string[]; tracks: string[] } = {
    artists: [],
    albums: [],
    tracks: [],
  };

  private static instance;
  constructor() {
    if (!FavoritesDataBase.instance) {
      FavoritesDataBase.instance = this;
    }
    Object.assign(this, FavoritesDataBase.instance);
  }

  addArtistToFavorites(artistId: string) {
    this.base.artists.push(artistId);
    console.log(this.base.artists);
    return artistId;
  }

  addAlbumToFavorites(albumId: string) {
    this.base.albums.push(albumId);
    return albumId;
  }

  addTrackToFavorites(trackId: string) {
    this.base.tracks.push(trackId);
    return trackId;
  }

  findAll() {
    // console.log(this.base.artists);
    const obj = {
      artists: this.base.artists,
      albums: this.base.albums,
      tracks: this.base.tracks,
    };
    // console.log(obj);
    return obj;
  }

  deleteArtistFromFavorites(id: string) {
    const length = this.base.artists.length;
    this.base.artists = this.base.artists.filter((item) => item && item !== id);
    return length === this.base.artists.length;
  }

  deleteAlbumFromFavorites(id: string) {
    const length = this.base.albums.length;
    this.base.albums = this.base.albums.filter((item) => item && item !== id);
    return length === this.base.albums.length;
  }

  deleteTrackFromFavorites(id: string) {
    const length = this.base.tracks.length;
    this.base.tracks = this.base.tracks.filter((item) => item && item !== id);
    return length === this.base.tracks.length;
  }
}
