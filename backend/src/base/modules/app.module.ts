import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user.module';
import { PrismaModule } from '@modules/prisma.module';
import { AdminModule } from '@modules/admin.module';
import { CategoryModule } from '@modules/category.module';
import { AuthModule } from '@modules/auth.module';

@Module({
  imports: [AdminModule, UserModule, PrismaModule, CategoryModule, AuthModule],
  controllers: [],
  providers: [],
})

export class AppModule { }
