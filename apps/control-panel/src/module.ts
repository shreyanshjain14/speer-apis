import { BoatModule } from "@libs/boat";
import { UserLibModule } from "@libs/users";
import { Module } from "@nestjs/common";

import { AdminSeeder } from "./commands/createAdmin";
import { ControlPanelController } from "./controller";

@Module({
  imports: [BoatModule, UserLibModule],
  controllers: [ControlPanelController],
  providers: [AdminSeeder],
})
export class AppModule {}
