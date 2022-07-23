import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const res = await this.prisma.artist.create({
      data: createArtistDto,
    });
    return res;
  }

  async findAll(): Promise<Artist[]> {
    const res = await this.prisma.artist.findMany();
    return res;
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Not found');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Not found');
    }
    return this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async remove(id: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Not found');
    }
    this.prisma.artist.delete({ where: { id } });

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
