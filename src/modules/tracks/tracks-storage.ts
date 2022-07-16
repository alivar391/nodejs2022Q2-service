import { Injectable } from '@nestjs/common';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksDataBase {
  tracks: Track[] = [];

  private static instance;
  constructor() {
    if (!TracksDataBase.instance) {
      TracksDataBase.instance = this;
    }
    Object.assign(this, TracksDataBase.instance);
  }

  create(track: Track) {
    this.tracks.push(track);
    return track;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  update(id: string, newTrack: UpdateTrackDto): Track {
    const track = this.tracks.find((track) => track.id === id);
    Object.assign(track, newTrack);
    return track;
  }

  delete(id: string) {
    const length = this.tracks.length;
    this.tracks = this.tracks.filter((item) => item.id !== id);
    return length === this.tracks.length;
  }
}
