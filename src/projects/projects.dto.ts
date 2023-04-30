import { IsNotEmpty } from 'class-validator';

export class CreteProjectDto {
  @IsNotEmpty()
  name: string;
}
