import { AppDataSource } from "../config/db";
import { Token } from "../entity/token.entity";
import { User } from "../entity/user.entity";


export class UserService {
    async create (userData: User) {
        const businessCustomerRecordRepository =
        AppDataSource.manager.getRepository(User);
    return businessCustomerRecordRepository.save(userData);
    }

    public async checkifUserExists(email: string) {
        const userExists = await AppDataSource.manager.findOne(User, {
            where: {
                email: email,
            },
            select: [
                "id",
                "name",
                "email",
                "password",
            ]
        });
        return userExists;
    }

    public async getUserIdByJwt(jwtToken: string): Promise<Token[]> {
        const user = await AppDataSource.manager.findBy(Token, {
            token: jwtToken,
        });

        return user;
    }
}