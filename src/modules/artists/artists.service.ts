import { Injectable } from '@nestjs/common';
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
      ...createArtistDto,
      id: uuidv4(),
    };
    return this.artistsDataBase.create(newArtist);
  }

  findAll() {
    return this.artistsDataBase.findAll();
  }

  findOne(id: string) {
    return this.artistsDataBase.findOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistsDataBase.update(id, updateArtistDto);
  }

  remove(id: string) {
    return this.artistsDataBase.delete(id);
  }
}
