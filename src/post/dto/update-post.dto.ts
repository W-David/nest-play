import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'

@InputType()
export class UpdatePostDto {
  @Field()
  @IsNumber()
  id: number

  @Field()
  @IsString()
  title: string

  @Field()
  @IsString()
  content: string
}
