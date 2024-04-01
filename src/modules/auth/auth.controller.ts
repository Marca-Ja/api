import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '../../decorators/user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { GoogleOAuthGuard } from '../../guards/google-oauth.guard';
import { DoctorService } from '../doctor/doctor.service';
import { AuthLoginDTO } from './DTO/auth-login.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responses } from '../../global/docs/schema.docs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private doctorService: DoctorService,
  ) {}

  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({
    summary: 'Cadastro de um médico',
    description:
      'Essa rota cria um novo médico no banco de dados a partir de seu cadastro pelo google',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Get()
  async googleAuth(@Request() req) {}

  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({
    summary: 'Redirecionamento do google para login',
    description:
      'Essa rota redireciona um médico e retorna seu token de acesso',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Get('google-redirect')
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }

  @ApiOperation({
    summary: 'Login de um médico',
    description: 'Essa rota faz o login de um médico',
  })
  @ApiResponse(responses.created)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Verificação de token',
    description:
      'Essa rota verifica e retorna informações do médico autenticado',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Post('token')
  async verifyToken(@User() user: any) {
    return {
      user,
    };
  }
}
