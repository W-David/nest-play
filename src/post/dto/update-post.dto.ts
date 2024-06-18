import { InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class UpdatePostDto implements Prisma.PostUpdateInput {
  createdAt?: string | Date | Prisma.DateTimeFieldUpdateOperationsInput
  updatedAt?: string | Date | Prisma.DateTimeFieldUpdateOperationsInput
  title?: string | Prisma.StringFieldUpdateOperationsInput
  content?: string | Prisma.NullableStringFieldUpdateOperationsInput
  published?: boolean | Prisma.BoolFieldUpdateOperationsInput
  author?: Prisma.UserUpdateOneRequiredWithoutPostsNestedInput
}
