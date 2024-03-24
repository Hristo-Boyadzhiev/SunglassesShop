import { Sunglasses } from "./sunglasses";

export interface Purchase {
    _ownerId: string,
    sunglassesDetail: Sunglasses,
    "quantity": number,
    "BuyerId": string,
    "_createdOn": number,
    "_id": string
}