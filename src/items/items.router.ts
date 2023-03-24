/**
 * Required External Modules and Interfaces
 */
import express, {Request, Response} from "express";
import * as ItemService from "./items.service"
import {BaseItem, Item} from "./item.interface";

/**
 * Router Definition
 */
export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
itemsRouter.get("/", async(req: Request, res: Response) => {
    try{
        const items: Item[] = await ItemService.findAll();
        res.status(200).json({
            items,
            message: "Items fetched successfully"
        });
    }catch(err){
        res.status(500).json(err);
    }
})

// GET items/:id
itemsRouter.get("/:id", async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try{
        const item: Item = await ItemService.find(id);
        res.status(200).json({
            item,
            message: "Successfully fetched item"
        });
    }catch(err){
        res.status(500).json(err);
    }
})

// POST items
itemsRouter.post("/", async(req: Request, res: Response) => {
    try{
        const itemToCreate: BaseItem = req.body;
        
        const newItem: Item = await ItemService.create(itemToCreate);
        res.status(200).json({
            item: newItem,
            message: "Item created successfully"
        })
    }catch(err){
        res.status(500).json(err)
    }
})

// PUT items/:id
itemsRouter.put("/:id", async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try{
        const itemToUpdate: BaseItem = req.body;

        const existingItem: Item = await ItemService.find(id);

        if(existingItem){
            const updatedItem = await ItemService.update(id, itemToUpdate);
            res.status(200).json({
                item: updatedItem,
                message: "Item updated successfully"
            })
        }
        const newItem = await ItemService.create(itemToUpdate);
         res.status(200).json({
                item: newItem,
                message: "Item created successfully"
            })
    }catch(err){
        res.status(500).json(err)
    }
})

// DELETE items/:id
itemsRouter.delete("/:id", async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try{
        await ItemService.remove(id);

        res.status(204)
    }catch(err){
        res.status(500).json(err)
    }
})