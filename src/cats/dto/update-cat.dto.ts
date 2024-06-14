import { IsInt, IsString } from 'class-validator'
export class UpdateCatDTO {
  @IsInt()
  id: number
  @IsString()
  name: string
  @IsInt()
  age: number
  @IsString()
  color: string
}
