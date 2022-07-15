import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksDataBase } from './tracks-storage';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksDataBase],
})
export class TracksModule {}
