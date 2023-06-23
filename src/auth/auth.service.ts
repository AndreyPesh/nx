import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ENV } from 'src/shared/config/constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { compareEncryptedData, hashData } from 'src/utils/crypt/hash';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    // console.log(this.configService.get<string>(ENV.JWT_ACCESS_EXPIRES));
    // return;

    const isUserExist = await this.userService.getByEmail(createUserDto.email);
    if (isUserExist) {
      throw new BadRequestException('User already is exist!');
    }

    const hashPassword = await hashData(createUserDto.password);

    const user = await this.userService.create({
      ...createUserDto,
      password: hashPassword,
    });

    const tokens = await this.signTokens(user.id, user.name);
    return tokens;
  }

  async login(data: AuthDto) {
    const user = await this.userService.getByEmail(data.email);
    if (!user) {
      throw new BadRequestException('User does not exist!');
    }

    const isPasswordMatch = await compareEncryptedData(
      data.password,
      user.password,
    );
    if (!isPasswordMatch) throw new BadRequestException('Invalid password');

    return await this.signTokens(user.id, user.name);
  }

  async signTokens(id: string, username: string) {
    const expiresInAccess = this.configService.get<string>(ENV.JWT_ACCESS_EXPIRES)
    const expiresInRefresh = this.configService.get<string>(ENV.JWT_REFRESH_EXPIRES)
    console.log(expiresInAccess, expiresInRefresh);
    

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id, username },
        {
          secret: this.configService.get<string>(ENV.JWT_ACCESS_SECRET),
          expiresIn: expiresInAccess,
        },
      ),
      this.jwtService.signAsync(
        { id, username },
        {
          secret: this.configService.get<string>(ENV.JWT_REFRESH_SECRET),
          expiresIn: expiresInRefresh,
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
