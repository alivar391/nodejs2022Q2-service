import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistsDataBase } from './artists-storage';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(private readonly artistsDataBase: ArtistsDataBase) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    return this.artistsDataBase.create(newArtist);
  }

  findAll() {
    return this.artistsDataBase.findAll();
  }

  findOne(id: string) {
    const artist = this.artistsDataBase.findOne(id);
    if (!artist) {
      throw new NotFoundException('Not found');
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.artistsDataBase.findOne(id);
    if (!artist) {
      throw new NotFoundException('Not found');
    }
    return this.artistsDataBase.update(id, updateArtistDto);
  }

  remove(id: string) {
    const artist = this.artistsDataBase.findOne(id);
    if (!artist) {
      throw new NotFoundException('Not found');
    }
    return this.artistsDataBase.delete(id);
  }
}
