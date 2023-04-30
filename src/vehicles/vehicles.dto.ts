import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreteVehicleDto {
  @IsNotEmpty()
  name: string;
}

export class UpdateVehicleDto {
  @IsOptional()
  name: string;
}
