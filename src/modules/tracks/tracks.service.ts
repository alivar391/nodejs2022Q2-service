import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './entities/track.entity';
import { TracksDataBase } from './tracks-storage';
import { FavoritesDataBase } from '../favorites/favorites-storage';

@Injectable()
export class TracksService {
  constructor(
    private readonly tracksDataBase: TracksDataBase,
    private readonly favoritesDataBase: FavoritesDataBase,
  ) {}

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack = {
      id: uuidv4(),
      ...createTrackDto,
    };
    return this.tracksDataBase.create(newTrack);
  }

  findAll() {
    return this.tracksDataBase.findAll();
  }

  findOne(id: string) {
    const track = this.tracksDataBase.findOne(id);
    if (!track) {
      throw new NotFoundException('Not found');
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.tracksDataBase.findOne(id);
    if (!track) {
      throw new NotFoundException('Not found');
    }
    return this.tracksDataBase.update(id, updateTrackDto);
  }

  remove(id: string) {
    const track = this.tracksDataBase.findOne(id);
    if (!track) {
      throw new NotFoundException('Not found');
    }
    this.favoritesDataBase.deleteTrackFromFavorites(id);
    return this.tracksDataBase.delete(id);
  }
}
