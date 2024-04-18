import { Request, Response } from "express";
import producto from "../models/producto";



export const getProducts = async (req: Request, res: Response) => {

    const ListProducts = await producto.findAll()

    res.json(ListProducts)
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await producto.findByPk(id);

    if (product) {
        res.json(product)

    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    }

}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await producto.findByPk(id);

    if (!product) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    } else {
        await product.destroy()
        res.json({
            msg: 'El producto fue eliminado con exito'
        })
    }
}

export const postProduct = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await producto.create(body);

        res.json({
            msg: 'El producto fue agragado con exito!'
        })

    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ups ocurrio un error, comuniquese con soporte'
        })
    }



}

export const updateProduct = async (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params;
    const product = await producto.findByPk(id);

    try {

        if (product) {
            await product.update(body);
            res.json({
                smg: "El producto fue actualizado con exito!"
            })
        } else {
            res.status(404).json({
                smg: `No existe un producto con el id ${id}`
            })
        }


    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ups ocurrio un error, comuniquese con soporte'
        })

    }



}