import { IsNotEmpty } from 'class-validator';

export class CreteVehicleDto {
  @IsNotEmpty()
  name: string;
}
