import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersController } from "./users.controller";
import { UsersEntity } from "./users.entity";
import { UsersService } from "./users.service";

const userEntityList: UsersEntity[] = [
    new UsersEntity({ id: '1', email: 'amandae@Gmail.com', password: '123456789', role: 1 }),
    new UsersEntity({ id: '2', email: 'esther@Gmail.com', password: '123456789', role: 1, }),
    new UsersEntity({ id: '3', email: 'bonatti@Gmail.com', password: '123456789', role: 1 }),
];

const newUserEntity = new UsersEntity({ email: 'Nbonatti@Gmail.com', password: '123456789', role: 1 });
const updatedUserEntity = new UsersEntity({ email: '1bonatti@Gmail.com', password: '123456789', role: 1 });

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue(userEntityList),
                        create: jest.fn().mockResolvedValue(newUserEntity),
                        findOneOrFail: jest.fn().mockResolvedValue(userEntityList[0]),
                        update: jest.fn().mockResolvedValue(updatedUserEntity),
                        deleteById: jest.fn().mockResolvedValue(undefined),
                    },
                },
            ],
        }).compile();

        usersController = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(usersController).toBeDefined();
        expect(usersService).toBeDefined();
    });

    describe('index', () => {
        it('should return a users list entity successfully', async () => {
            // Act
            const result = await usersController.index();
            // Assert
            expect(result).toEqual(userEntityList);
            expect(typeof result).toEqual('object');
            expect(usersService.findAll).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', () => {
            // Arrange
            jest.spyOn(usersService, 'findAll').mockRejectedValueOnce(new Error());

        });
    });

    describe('create', () => {
        it('should create a new user successfully', async () => {
            // Arrange
            const body: any = {
                email: 'Nbonatti@Gmail.com', password: '123456789', role: 1
            };

            // Act
            const result = await usersController.store(body);

            // Assert
            expect(result).toEqual(newUserEntity);
            expect(usersService.store).toHaveBeenCalledTimes(1);
            expect(usersService.store).toHaveBeenCalledWith(body);
        });

        it('should throw an exception', () => {
            // Arrange
            const body: any = {
                email: 'amandae@Gmail.com', password: '123456789'
            };

            jest.spyOn(usersService, 'store').mockRejectedValueOnce(new Error());

            // Assert
            expect(usersService.store(body)).rejects.toThrowError();
        });
    });
    describe('show', () => {
        it('should get a user successfully', async () => {
            // Act
            const result = await usersController.show('1');

            // Assert
            expect(result).toEqual(userEntityList[0]);
            expect(usersService.findOneOrFail).toHaveBeenCalledTimes(1);
            expect(usersService.findOneOrFail).toHaveBeenCalledWith('1');
        });

        it('should throw an exception', () => {
            // Arrange
            jest
                .spyOn(usersService, 'findOneOrFail')
                .mockRejectedValueOnce(new Error());
        });
    });

    describe('update', () => {
        it('should update a user successfully', async () => {
            // Arrange
            const body: any = {
                email: '1bonatti@Gmail.com', password: '123456789', role: 1
            };

            // Act
            const result = await usersController.update('1', body);

            // Assert
            expect(result).toEqual(updatedUserEntity);
            expect(usersService.update).toHaveBeenCalledTimes(1);
            expect(usersService.update).toHaveBeenCalledWith('1', body);
        });

        it('should throw an exception', () => {
            // Arrange
            const body: any = {
                email: 'amandae@Gmail.com', password: '123456789'
            };

            jest.spyOn(usersService, 'update').mockRejectedValueOnce(new Error());

        });
    });

    describe('destroy', () => {
        it('should remove a user successfully', async () => {
            // Act
            const result = await usersController.destroy('1');

            // Assert
            expect(result).toBeUndefined();
        });

        it('should throw an exception', () => {
            // Arrange
            jest.spyOn(usersService, 'destroy').mockRejectedValueOnce(new Error());
        });
    });

});