import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user.module';
import { PrismaModule } from '@modules/prisma.module';
import { AdminModule } from '@modules/admin.module';

@Module({
  imports: [AdminModule, UserModule, PrismaModule],
  controllers: [],
  providers: [],
})

export class AppModule { }
