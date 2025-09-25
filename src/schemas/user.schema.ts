import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({
  collection: 'users',
  autoCreate: true,
})
export class UserEntity {
  @Prop({ type: String, required: true })
  name: string

  @Prop({ unique: true, type: String, required: true })
  email: string
}

export const UserSchema = SchemaFactory.createForClass(UserEntity)

export type UserDocument = UserEntity & Document<any>
