import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { jwtProviders } from '../jwt/jwt.providers';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { JwtBlacklistService } from '../jwt/jwt-blacklist.service';
import { usersProviders } from '../user/user.providers';
import { databaseProviders } from "../database/databse.providers";
import { PassportModule } from '@nestjs/passport';

describe('AuthController', () => {
  let authController:AuthController;
  let authService:AuthService;

  beforeEach(async () => {
    const passportRegister = PassportModule.register({
      defaultStrategy:'jwt'
    });
    const moduleRef = await Test.createTestingModule({
      imports:[
        passportRegister
      ],
      providers:[
        ...jwtProviders,
        ...usersProviders,
        ...databaseProviders,
        UserService,
        JwtBlacklistService,
        JwtStrategy,
        AuthService
      ],
      controllers: [AuthController]
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  it('should register', async () => {
    const result = "";
    jest.spyOn(authService, 'register').mockImplementation(() => Promise.resolve(result));

    const userDTO:CreateUserDto = {
      firstName:'Kévin',
      lastName:'VOYER',
      email:'king.voyer@hotmail.com',
      password:'bad ass password',
      checkPassword:'bad ass password'
    };

    const res = await authController.register(userDTO);
    console.log(res);
    expect(res.code).toBe(200);
    expect(res.data).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
  });

});
