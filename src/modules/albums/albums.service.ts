import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const res = await this.prisma.album.create({ data: createAlbumDto });
    return res;
  }

  async findAll() {
    const res = await this.prisma.album.findMany();
    return res;
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('Not found');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('Not found');
    }
    return this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async remove(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('Not found');
    }
    this.prisma.album.delete({ where: { id } });
  }
}
