import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    let user = await this.userService.findOne(loginDto);

    if (!user) {
      user = await this.userService.create(loginDto);
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const { uid, deviceId } = await this.userService.findOne(loginDto);
    return {
      access_token: this.jwtService.sign({ uid, deviceId }),
    };
  }
}
