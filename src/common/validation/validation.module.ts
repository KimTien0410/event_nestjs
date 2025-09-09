import { Module } from '@nestjs/common'
import { IsUniqueConstraint } from './is-unique.constraint'

@Module({
  providers: [IsUniqueConstraint],
  exports: [IsUniqueConstraint],
})
export class ValidationModule {}
