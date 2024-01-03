import { UserLibModule } from "@libs/users";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { BoatModule } from "../../../libs/boat/src/module";
import {
  AdminAuthController,
  UserAuthController,
  UserController,
} from "./controllers";
import { AuthApisService } from "./services/auth";
import { UserApiService } from "./services/user";

@Module({
  imports: [
    ConfigModule,
    UserLibModule,
    BoatModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get("auth"),
      inject: [ConfigService],
    }),
  ],
  controllers: [AdminAuthController, UserAuthController, UserController],
  providers: [AuthApisService, UserApiService],
})
export class AuthApisModule {}
