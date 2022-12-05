import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import UserEntity from 'src/entities/user.entity';
import { GenerateTokenDto } from './dtos/auth.dto';
import { CreateUserDto } from './dtos/user.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(user: UserEntity) {
    const token = await this.jwtService.signAsync({
      username: user.username,
      email: user.email,
      sub: user.id,
    });
    return token;
  }

  async verifyToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token);
      const user = await this.jwtService.decode(token);
      return { user };
    } catch (error) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: error.message,
      });
    }
  }

  async login(payload: GenerateTokenDto) {
    const user = await this.userRepository.findOne({
      where: { username: payload.username },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        salt: true,
      },
    });

    const IncorectException = new RpcException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Incorrect username or password.',
    });

    if (!user) throw IncorectException;

    const hasedPassword = await bcrypt.hash(payload.password, user.salt);

    if (user.password !== hasedPassword) throw IncorectException;

    const token = await this.generateToken(user);
    return { token };
  }

  async validateRegistration(payload: { username: string; email: string }) {
    const user = await this.userRepository.findOne({
      where: [
        { username: payload.username, deletedAt: null },
        { email: payload.email, deletedAt: null },
      ],
    });

    if (user) {
      const isUsernameDuplicated = user.username === payload.username;
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: isUsernameDuplicated
          ? 'Username has been already taken.'
          : 'Email has been already taken.',
      });
    }

    return user;
  }

  async register(payload: CreateUserDto) {
    await this.validateRegistration(payload);

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(payload.password, salt);

    const user = this.userRepository.create({
      ...payload,
      password,
      salt,
    });

    await this.userRepository.insert(user);

    const token = await this.login({
      username: user.username,
      password: payload.password,
    });

    return token;
  }
}
