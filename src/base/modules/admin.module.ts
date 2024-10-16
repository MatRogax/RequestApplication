import { AdminController } from "@controllers/admin.controller";
import { PrismaModule } from "@modules/prisma.module";
import { Module } from "@nestjs/common";
import { AdminRepository } from "@repositories/admin.repository";



@Module({
    imports: [PrismaModule],
    controllers: [AdminController],
    providers: [AdminRepository],
})

export class AdminModule { }
