import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async register(body: CreateUserDto) {
    const userUsernameExist = await this.userService.findByUsername(
      body.username,
    );
    if (userUsernameExist)
      throw new BadRequestException('Username already exist');

    const userEmailExist = await this.userService.findByEmail(body.email);
    if (userEmailExist) throw new BadRequestException('Email already exist');

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await this.userService.create({
      ...body,
      password: hashedPassword,
    });
    const tokens = await this.getTokens(newUser.id, newUser.username);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async login(body: AuthDto) {
    const user = await this.userService.findByUsername(body.username);
    if (!user) throw new BadRequestException('User does not exist');

    const passwordMatches = await bcrypt.compare(body.password, user.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');

    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    console.log(tokens);
    return tokens;
  }

  async logout(userId: number) {
    return this.userService.update(userId, { refreshToken: null });
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access denied');

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access denied');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '5m',
        },
      ),
      this.jwt.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.update(userId, { refreshToken: hashedRefreshToken });
  }
}
