import { AuthController } from '@controllers/auth.controller';
import { AuthGuard } from '@guards/auth.guard';
import { PrismaModule } from '@modules/prisma.module';
import { UserModule } from '@modules/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@services/auth.service';


@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JwtKeyConstant,
            signOptions: { expiresIn: '10m' },
        }),
        forwardRef(() => UserModule),
        PrismaModule
    ],
    providers: [AuthService, AuthGuard],
    controllers: [AuthController],
    exports: [AuthService, AuthGuard],
})
export class AuthModule { }
