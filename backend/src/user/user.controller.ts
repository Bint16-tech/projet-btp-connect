import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileValidator,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin/admin.guard';
import { extname } from 'node:path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

class CustomImageValidator extends FileValidator {
  constructor() {
    super({});
  }

  isValid(file: Express.Multer.File): boolean {
    if (!file) return true;
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return validMimeTypes.includes(file.mimetype);
  }

  buildErrorMessage(): string {
    return 'Le fichier doit être une image au format PNG, JPG ou JPEG.';
  }
}

const userStorage = diskStorage({
  destination: './uploads/users',
  filename: (req, file, callback) => {
    const uniqueName = `user_${Date.now()}${extname(file.originalname)}`;
    callback(null, uniqueName);
  },
});

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return this.userService.findOneById(req.user._id);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', { storage: userStorage }))
  async updateProfile(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5242880,
            message: 'Le fichier est trop lourd (max 5Mo)',
          }),

          new CustomImageValidator(),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    const user = await this.userService.findOneById(req.user._id);

    if (file) {
      updateUserDto.image = `uploads/users/${file.filename}`;
    } else {
      updateUserDto.image = user?.image || 'uploads/users/default_users.png';
    }

    const { role, ...updateData } = updateUserDto;
    return this.userService.update(req.user._id, updateData);
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  deleteProfile(@Request() req) {
    if (req.user.role === 'admin') {
      throw new UnauthorizedException('Non autorisé');
    }
    return this.userService.delete(req.user._id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    return this.userService.findAll(page, limit, search);
  }

  @Get('stats/count')
  @UseGuards(JwtAuthGuard, AdminGuard)
  countAll() {
    return this.userService.countAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch(':id/role')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateRole(@Param('id') id: string, @Body('role') role: string) {
    return await this.userService.updateRole(id, role);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor('image', { storage: userStorage }))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5242880,
            message: 'Le fichier est trop lourd (max 5Mo)',
          }),

          new CustomImageValidator(),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    const user = await this.userService.findOneById(id);

    if (file) {
      updateUserDto.image = `uploads/users/${file.filename}`;
    } else {
      updateUserDto.image = user?.image || 'uploads/users/default_users.png';
    }

    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async remove(@Param('id') id: string, @Request() req) {
    const user = await this.userService.findOneById(id);
    if (id === req.user._id && user.role === 'admin') {
      throw new UnauthorizedException('Non autorisé');
    }
    return this.userService.delete(id);
  }
}
