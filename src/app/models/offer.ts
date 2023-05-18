import { KeyValue } from "@angular/common";

export interface Offer {
    id: number;
    title: string;
    description: string;
    createdByUserID: number;
    imageURL?: string;
    pricePH: number;
    availability?: KeyValue<string, boolean>[];
}
