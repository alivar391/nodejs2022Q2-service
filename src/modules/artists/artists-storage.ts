import { Injectable } from '@nestjs/common';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsDataBase {
  artists: Artist[] = [];

  create(artist: Artist) {
    this.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  update(id: string, newArtist: UpdateArtistDto) {
    const artist = this.artists.find((artist) => artist.id === id);
    Object.assign(artist, newArtist);
    return artist;
  }

  delete(id: string) {
    const length = this.artists.length;
    this.artists = this.artists.filter((item) => item.id !== id);
    return length === this.artists.length;
  }
}
