import { Injectable } from '@nestjs/common';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsDataBase {
  albums: Album[] = [];

  create(album: Album) {
    this.albums.push(album);
    return album;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  update(id: string, newAlbum: UpdateAlbumDto): Album {
    const album = this.albums.find((album) => album.id === id);
    Object.assign(album, newAlbum);
    return album;
  }

  delete(id: string) {
    const length = this.albums.length;
    this.albums = this.albums.filter((item) => item.id !== id);
    return length === this.albums.length;
  }
}
