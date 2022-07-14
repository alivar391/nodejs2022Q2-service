import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsDataBase } from './artists-storage';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsDataBase],
})
export class ArtistsModule {}
