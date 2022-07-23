import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { PrismaService } from 'src/prisma.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, AlbumsService, TracksService, PrismaService],
})
export class ArtistsModule {}
