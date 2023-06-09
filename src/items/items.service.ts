/**
 * Data Model Interfaces
 */
import { BaseItem, Item } from "./item.interface";
import { Items } from "./items.interface";

/**
 * In-Memory Store
 */
let items: Items = {
    1: {
        id: 1,
        name: "Burger",
        price: 220,
        description: "Tasty",
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
    },
    2: {
        id: 2,
        name: "Pizza",
        price: 320,
        description: "Cheesy",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
    },
}

/**
 * Service Methods
 */
export const findAll = async (): Promise<Item[]> => Object.values(items);

export const find = async(id: number): Promise<Item> => items[id];

export const create = async(newItem: BaseItem): Promise<Item> => {
    const id = Object.keys(items).length + 1;

    items[id] = {
        id,
        ...newItem
    }

    return items[id]
} 

export const update = async(id: number, updatedItem: BaseItem): Promise<Item | null> => {
    const item = await find(id);

    if(!item) return null;

    items[id] = {
        id, 
        ...updatedItem
    }

    return items[id];
}

export const remove = async(id: number): Promise<null | void> => {
    const item = await find(id);

    if(!item) return null;

    delete items[id];
}