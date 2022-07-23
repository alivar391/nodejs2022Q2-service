import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistsDataBase } from './artists-storage';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
// import { v4 as uuidv4 } from 'uuid';
// import { Artist } from './entities/artist.entity';
import { AlbumsDataBase } from '../albums/albums-storage';
import { TracksDataBase } from '../tracks/tracks-storage';
import { FavoritesDataBase } from '../favorites/favorites-storage';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    const res = await this.prisma.artist.create({
      data: createArtistDto,
    });
    return res;
  }

  async findAll() {
    const res = await this.prisma.artist.findMany();
    return res;
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Not found');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Not found');
    }
    return this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async remove(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Not found');
    }
    return this.prisma.artist.delete({ where: { id } });

    // this.albumsDataBase
    //   .findAll()
    //   .filter((item) => item.artistId === id)
    //   .map((item) => {
    //     this.albumsDataBase.update(item.id, { ...item, artistId: null });
    //     return { ...item, artistId: null };
    //   });

    // this.tracksDataBase
    //   .findAll()
    //   .filter((item) => item.artistId === id)
    //   .map((item) => {
    //     this.tracksDataBase.update(item.id, { ...item, artistId: null });
    //     return { ...item, artistId: null };
    //   });
    // this.favoritesDataBase.deleteArtistFromFavorites(id);

    // return this.artistsDataBase.delete(id);
  }
}
