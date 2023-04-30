import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserMiddleware } from './users/users.middleware';
import { ProjectsModule } from './projects/projects.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [AuthModule, UsersModule, ProjectsModule, VehiclesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*'); // Apply the middleware to all routes
  }
}
