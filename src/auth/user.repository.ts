import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async singUp(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto;

    const user = new User();
    user.username = username;
    user.satl = await bcrypt.genSalt();
    user.password = await this.hashPassWord(password, user.satl);

    try {
      //   await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username error exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredenticalDto: AuthCredentialDto,
  ): Promise<string> {
    const { username, password } = authCredenticalDto;
    const user = await User.findOne({ username: username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassWord(password: string, salt: string): Promise<string> {
    return bcrypt.hashPassWord(password, salt);
  }
}
