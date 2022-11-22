import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

class response {
  "access_token": string;
}

@Controller("auth")
@ApiTags("인증 API")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  @ApiOperation({
    summary: "로그인",
  })
  @ApiBody({
    type: LoginDto,
    examples: {
      1: {
        summary: "샘플 유저",
        description:
          "deviceId를 보내면 uid와 token을 반환합니다. 그 후 모든 요청에 토큰이 필요합니다.",
        value: { uid: 1, deviceId: "aaaa" } as LoginDto,
      },
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
