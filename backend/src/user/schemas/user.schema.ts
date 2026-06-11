import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ default: 'uploads/users/default_users.png' })
  image?: string;

  @Prop({ enum: ['user', 'admin'], default: 'user' })
  role!: string;

  @Prop()
  googleId?: string;

  @Prop({ required: true, select: false })
  password!: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
