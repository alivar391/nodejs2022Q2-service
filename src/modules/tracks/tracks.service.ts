import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const res = await this.prisma.track.create({ data: createTrackDto });
    return res;
  }

  async findAll() {
    const res = await this.prisma.track.findMany();
    return res;
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Not found');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Not found');
    }
    return this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
  }

  async remove(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Not found');
    }
    await this.prisma.track.delete({ where: { id } });
  }
}
