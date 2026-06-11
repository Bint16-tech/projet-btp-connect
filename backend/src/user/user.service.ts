import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  //get all users
  async findAll(
    page = 1,
    limit = 10,
    search?: string,
  ): Promise<{
    users: User[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }> {
    const skip =
      (Number.parseInt(page.toString()) - 1) *
      Number.parseInt(limit.toString());
    let query = {};

    if (search) {
      query = {
        $or: [
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const [users, totalItems] = await Promise.all([
      this.userModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.userModel.countDocuments(query).exec(),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      users,
      totalItems,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }

  // Get one user By Id
  async findOneById(id: string): Promise<any> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    return user;
  }

  // Get one user By Email
  async findOneByEmail(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    return user;
  }

  // Edit an user
  async update(id: string, dto: UpdateUserDto) {
    const { password_confirm, ...updateData } = dto;

    if (updateData.password) {
      if (updateData.password !== password_confirm) {
        throw new BadRequestException(
          'Les mots de passe doivent être identiques',
        );
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updateData.password, salt);
      updateData.password = hashedPassword;
    }

    if (updateData.email) {
      const userExists = await this.userModel.findOne({
        email: updateData.email,
      });
      if (userExists && userExists._id.toString() !== id) {
        throw new BadRequestException('Cette adresse email est déjà utilisée');
      }
    }

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    const defaultImage = 'uploads/users/default_users.png';
    if (
      updateData.image &&
      user.image &&
      user.image !== updateData.image &&
      user.image !== defaultImage
    ) {
      try {
        const absolutePath = path.resolve(user.image);

        await fs.access(absolutePath);

        await fs.unlink(absolutePath);
      } catch (error: any) {
        console.error(
          `Erreur lors de la suppression de l'image (${user.image}):`,
          error.message,
        );
      }
    }
    const updateUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { returnDocument: 'after' })
      .exec();

    return { message: 'Utilisateur modifié', user: updateUser };
  }

  // Delete an user
  async delete(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    const defaultImage = 'uploads/users/default_users.png';
    if (user.image && user.image !== defaultImage) {
      try {
        const absolutePath = path.resolve(user.image);

        await fs.access(absolutePath);

        await fs.unlink(absolutePath);
      } catch (error: any) {
        console.error(
          `Erreur lors de la suppression de l'image (${user.image}):`,
          error.message,
        );
      }
    }
    const deleteUser = await this.userModel.findByIdAndDelete(id).exec();
    return { message: 'Utilisateur supprimé' };
  }
  // Change users role
  async updateRole(id: string, role: string) {
    if (!['user', 'admin'].includes(role)) {
      throw new BadRequestException('Rôle invalide');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    if (user.role === 'admin') {
      throw new BadRequestException("Impossible de changer le rôle d'un admin");
    }
    const newRole = user.role === 'user' ? 'admin' : 'user';
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        role: newRole,
      },
      { returnDocument: 'after' },
    );
    return updatedUser;
  }

  //nombre d'utilisateur en bd
  async countAll() {
    return this.userModel.countDocuments().exec();
  }
}
