import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './modules/artists/artists.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { UsersModule } from './modules/users/users.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AlbumsController } from './modules/albums/albums.controller';
import { ArtistsController } from './modules/artists/artists.controller';
import { FavoritesController } from './modules/favorites/favorites.controller';
import { TracksController } from './modules/tracks/tracks.controller';
import { UsersController } from './modules/users/users.controller';

@Module({
  imports: [
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    UsersModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        AlbumsController,
        ArtistsController,
        FavoritesController,
        TracksController,
        UsersController,
      );
  }
}
