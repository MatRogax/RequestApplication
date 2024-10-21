import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;

        if (!authorization) {
            throw new UnauthorizedException('Token não encontrado.');
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token inválido.');
        }

        try {
            const decoded = this.authService.validateToken(token);
            request.user = decoded;

            return true;
        } catch (error) {
            throw new UnauthorizedException('Token inválido ou expirado.');
        }
    }
}
