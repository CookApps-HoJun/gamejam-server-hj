import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PvpService } from "./pvp.service";

@Controller("pvp")
export class PvpController {
  constructor(private readonly pvpService: PvpService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get("rank")
  @ApiTags("pvp API")
  @ApiOperation({
    summary: "랭킹 조회",
    description: "100위까지의 랭킹을 조회한다.",
  })
  getRank(@Req() req) {
    return this.pvpService.getRank();
  }
}
