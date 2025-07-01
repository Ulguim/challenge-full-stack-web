import { IsString, IsEmail, Length, IsOptional } from "class-validator";


export class CreateStudentDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  ra: string;

  @IsString()
  @Length(11, 11)
  cpf: string;
}

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
