import { AdminController } from "@controllers/admin.controller";
import { PrismaModule } from "@modules/prisma.module";
import { Module } from "@nestjs/common";
import { AdminRepository } from "@repositories/admin.repository";
import { AuthModule } from "./auth.module";



@Module({
    imports: [PrismaModule,AuthModule],
    controllers: [AdminController],
    providers: [AdminRepository],
    exports: [AdminRepository],
})

export class AdminModule { }
