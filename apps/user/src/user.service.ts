import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  create(createUserInput: CreateUserInput) {
    const obj = {
      id: uuidv4(),
      ...createUserInput
    }
    this.users.push(obj);
    return createUserInput;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = updateUserInput;
    return updateUserInput;
  }

  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1)
    return true;
  }
}
