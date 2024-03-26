import { Sunglasses } from "./sunglasses";

export interface Purchase {
    _ownerId: string,
    sunglassesDetails: Sunglasses,
    quantity: number,
    buyerId: string,
    _createdOn: number,
    _id: string
}