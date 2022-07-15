import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumsDataBase } from './albums-storage';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(private readonly albumsDataBase: AlbumsDataBase) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    return this.albumsDataBase.create(newAlbum);
  }

  findAll() {
    return this.albumsDataBase.findAll();
  }

  findOne(id: string) {
    const album = this.albumsDataBase.findOne(id);
    if (!album) {
      throw new NotFoundException('Not found');
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.albumsDataBase.findOne(id);
    if (!album) {
      throw new NotFoundException('Not found');
    }
    return this.albumsDataBase.update(id, updateAlbumDto);
  }

  remove(id: string) {
    const album = this.albumsDataBase.findOne(id);
    if (!album) {
      throw new NotFoundException('Not found');
    }
    return this.albumsDataBase.delete(id);
  }
}
