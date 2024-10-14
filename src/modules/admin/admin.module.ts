import { Module } from "@nestjs/common";

import { PrismaModule } from "src/database/prisma.module";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";

@Module({
    imports: [PrismaModule],
    controllers: [AdminController],
    providers: [AdminService],
})

export class AdminModule { }
