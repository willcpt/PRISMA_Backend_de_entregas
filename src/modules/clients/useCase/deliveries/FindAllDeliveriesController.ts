import { Request, Response } from "express";
import { FindAllDeliveriesUseCase } from "./FindAllDeliveriesUseCase";


export class FindAllDeliveriesController {
    async handle(request: Request, response: Response){

        const { id_client } = request;
        const findAlldeliveriesUseCase = new FindAllDeliveriesUseCase();
        const deliveries = await findAlldeliveriesUseCase.execute(id_client);

        return response.json(deliveries);
    }
}