import { CategoryController } from "@controllers/category.controller";
import { PrismaModule } from "@modules/prisma.module";
import { Module } from "@nestjs/common";
import { CategoryRepository } from "@repositories/category.repository";
import { AuthModule } from "./auth.module";



@Module({
    imports: [PrismaModule,AuthModule],
    controllers: [CategoryController],
    providers: [CategoryRepository],
    exports: [CategoryRepository],
})

export class CategoryModule { }
