import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDocument, UserEntity } from '../../schemas/user.schema'

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec()
  }

  async getUser(id: string): Promise<UserDocument | null | undefined> {
    return await this.userModel.findById(id)
  }

  async create(name: string, email: string): Promise<UserDocument> {
    return await this.userModel.create({
      name,
      email,
    })
  }

  async update(
    id: string,
    name: string,
    email: string,
  ): Promise<UserDocument | null> {
    return (
      (await this.userModel.findByIdAndUpdate(id, {
        name,
        email,
      })) ?? null
    )
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id)
  }

  async deleteAll(): Promise<void> {
    await this.userModel.deleteMany({})
  }
}
