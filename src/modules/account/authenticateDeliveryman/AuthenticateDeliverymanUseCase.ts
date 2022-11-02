import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";




interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman){

        // Verificar se username cadastrado
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username,
            },
        });

        if (!deliveryman){
            throw new Error("Username or password invalid!");
        }

        // Verificar se senha corresponde ao username
        const passwordMatch = await compare(password, deliveryman.password);

        if(!passwordMatch){
            throw new Error("Username or password invalid!");
        }

        // Gerar o token
        const token = sign({ username }, "6fbc10faa450d7734cc8c7aeda4736c8", {
            subject: deliveryman.id,
            expiresIn: "1d",
        });
        
        return token;
    }

}