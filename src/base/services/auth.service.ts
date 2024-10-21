import { PrismaService } from "@database/prisma.service";
import { AuthRegisterDto } from "@dtos/auth-register.dto";
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from "@prisma/client";
import { UserRepository } from "@repositories/user.repository";

@Injectable()
export class AuthService {
    private readonly ACCESS_TOKEN_EXPIRATION = '15m';
    private readonly REFRESH_TOKEN_EXPIRATION = '7d';

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userRepository: UserRepository,
    ) { }

    private createToken(user: User) {
        return this.jwtService.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            {
                expiresIn: this.ACCESS_TOKEN_EXPIRATION,
                subject: user.id,
                issuer: "API HostSuperMarket Login",
                audience: "users",
            }
        );
    }

    private createRefreshToken(user: User) {
        return this.jwtService.sign(
            {
                id: user.id,
            },
            {
                expiresIn: this.REFRESH_TOKEN_EXPIRATION,
                subject: user.id,
                issuer: "API HostSuperMarket Login",
                audience: "users",
            }
        );
    }

    validateToken(token: string) {
        try {
            return this.jwtService.verify(token, {
                audience: "users",
                issuer: "API HostSuperMarket Login",
            });
        } catch (error) {
            throw new BadRequestException(`Erro ao validar a autenticação: ${error.message}`);
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: { email, password },
        });

        if (!user) {
            throw new UnauthorizedException('Email e/ou senha inválidos!');
        }

        const accessToken = this.createToken(user);
        const refreshToken = this.createRefreshToken(user);

        return {
            user: {
                name: user.name,
                email: user.email,
            },
            accessToken,
            refreshToken,
        };
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                audience: "users",
                issuer: "API HostSuperMarket Login",
            });

            const user = await this.userRepository.findById(payload.id);
            if (!user) {
                throw new UnauthorizedException('Refresh token inválido!');
            }

            const accessToken = this.createToken(user);
            const newRefreshToken = this.createRefreshToken(user);

            return { accessToken, refreshToken: newRefreshToken };
        } catch (error) {
            throw new UnauthorizedException('Refresh token inválido!');
        }
    }

    async forget(email: string) {
        const user = await this.prisma.user.findFirst({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Email inválido!');
        }

        return user;
    }

    async reset(password: string, token: string) {
        const decoded = this.jwtService.decode(token) as { email: string };
        if (!decoded) {
            throw new BadRequestException('Token inválido!');
        }

        await this.prisma.user.update({
            where: {
                email: decoded.email,
            },
            data: {
                password,
            },
        });

        return { message: 'Senha alterada com sucesso.' }; 
    }

    async register(userData: AuthRegisterDto) {
        const user = await this.userRepository.createUser(userData);
        const accessToken = this.createToken(user);
        const refreshToken = this.createRefreshToken(user);
        return {
            user: {
                name: user.name,
                email: user.email,
            },
            accessToken,
            refreshToken,
        };
    }
}
