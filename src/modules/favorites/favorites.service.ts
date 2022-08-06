import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async addArtistToFavorites(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new UnprocessableEntityException('Not found');
    }
    const favorites = await this.prisma.favorites.findFirst();
    if (!favorites) {
      await this.prisma.favorites.create({ data: {} });
    }
    const { id: favId } = await this.prisma.favorites.findFirst();

    const newArtist = await this.prisma.artist.update({
      where: { id },
      data: { favoriteId: favId },
    });
    return newArtist;
  }

  async addAlbumToFavorites(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new UnprocessableEntityException('Not found');
    }
    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      await this.prisma.favorites.create({ data: {} });
    }
    const { id: favId } = await this.prisma.favorites.findFirst();

    const newAlbum = await this.prisma.album.update({
      where: { id },
      data: { favoriteId: favId },
    });
    return newAlbum;
  }

  async addTrackToFavorites(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new UnprocessableEntityException('Not found');
    }
    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      await this.prisma.favorites.create({ data: {} });
    }
    const { id: favId } = await this.prisma.favorites.findFirst();

    const newTrack = await this.prisma.track.update({
      where: { id },
      data: { favoriteId: favId },
    });
    return newTrack;
  }

  async findAll() {
    const favorites = await this.prisma.favorites.findFirst({
      select: {
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
        artists: {
          select: { id: true, name: true, grammy: true },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });
    if (!favorites) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }
    return favorites;
  }

  async removeArtistFromFavorites(id: string) {
    await this.prisma.artist.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }

  async removeAlbumFromFavorites(id: string) {
    await this.prisma.album.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }

  async removeTrackFromFavorites(id: string) {
    await this.prisma.track.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }
}
