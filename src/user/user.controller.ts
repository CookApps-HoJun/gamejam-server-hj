import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '유저생성',
    description: '유저를 생성한다.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: '유저 조회(전체)',
    description: '전체유저를 조회한다.',
  })
  findAll(@Req() req) {
    return this.userService.findAll();
  }

  @Get(':uid')
  @ApiOperation({
    summary: '유저 조회(단일)',
    description: '단일유저를 조회한다.',
  })
  findOne(@Param('uid') uid: number) {
    return this.userService.findOne({ uid });
  }

  @Patch()
  @ApiOperation({
    summary: '유저 수정',
    description: '유저를 수정한다.',
  })
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const { uid } = req.user;
    return this.userService.update(+uid, updateUserDto);
  }

  @Delete(':uid')
  @ApiOperation({
    summary: '유저 삭제',
    description: '유저를 삭제한다.',
  })
  remove(@Param('uid') uid: string) {
    return this.userService.remove(+uid);
  }
}
