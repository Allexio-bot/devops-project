import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IsLoggedDto {
    @ApiProperty()
    @IsString()
    token:string
}