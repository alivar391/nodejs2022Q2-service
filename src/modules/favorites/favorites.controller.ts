import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.removeArtistFromFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.removeTrackFromFavorites(id);
  }
}
