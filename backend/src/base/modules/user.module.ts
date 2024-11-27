import { UserController } from "@controllers/user.controller";
import { PrismaModule } from "@modules/prisma.module";
import { Module } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { AuthModule } from "./auth.module";

@Module({
  imports: [PrismaModule,AuthModule],
  controllers: [UserController],
  providers: [UserRepository],
  exports: [UserRepository],
})

export class UserModule { }
