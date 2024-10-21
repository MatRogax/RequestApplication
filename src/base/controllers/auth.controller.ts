import { AuthForgetDto } from '@dtos/auth-forget.dto';
import { LoginDto } from '@dtos/auth-login.dto';
import { AuthRegisterDto } from '@dtos/auth-register.dto';
import { AuthGuard } from '@guards/auth.guard';
import { Body, Controller, Headers, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@services/auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso.', type: Object })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
    async login(@Body() user: LoginDto) {
        const loginIn = await this.authService.login(user.email, user.password);
        return loginIn;
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: 'Usuário cadastrado com sucesso.', type: Object })
    @ApiResponse({ status: 400, description: 'Erro ao cadastrar usuário.' })
    async register(@Body() user: AuthRegisterDto) {

        const RegisterAuth = await this.authService.register(user)
        return RegisterAuth;
    }

    //Todo -> fazer o serviço de email para receber o token e poder resetar o password

    @Post('password/forget')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Email de recuperação enviado.' })
    @ApiResponse({ status: 404, description: 'Email não encontrado.' })
    async forgetPassword(@Body() { email }: AuthForgetDto) {

        const sendEmailForgetPass = await this.authService.forget(email);
        return sendEmailForgetPass;
    }

    @Post('password/reset')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @ApiResponse({ status: 200, description: 'Senha redefinida com sucesso.' })
    @ApiResponse({ status: 400, description: 'Erro ao redefinir a senha.' })
    async resetPassword(@Body() password: string, @Headers('token') token: string) {
        const resetPassword = await this.authService.reset(password, token);
        return resetPassword;
    }
}
