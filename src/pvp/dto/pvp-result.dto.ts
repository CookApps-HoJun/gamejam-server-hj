import { ApiProperty } from '@nestjs/swagger';
export class pvpReuslt {
  @ApiProperty({ description: 'enemyUid' })
  enemy: number;
  @ApiProperty({ description: 'pvpResult' })
  result: boolean;
  @ApiProperty({ description: '계속 진행여부 true일 경우 다음상대 리턴' })
  keepPvp: boolean;
}
