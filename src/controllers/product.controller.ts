import { Request, Response } from 'express';
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { AdminRequest, ExtendedRequest } from '../libs/types/member';
import { ProductInput, ProductInquiry } from '../libs/types/product';
import ProductService from '../models/Product.service';
import { ProductCollection } from '../libs/enums/product.enum';
  
const productService = new ProductService();

const productController: T = {};



/**  SPA **/

productController.getProducts = async (req: Request, res: Response) => {
    try {
        console.log("getAllProducts");

        const {page, limit, order, productCollection, search} = req.query;
         
        const inquiry: ProductInquiry = {
            order: String(order),
            page: Number(page),
            limit: Number(limit),
        };
        if(productCollection) 
           inquiry.productCollection = productCollection as ProductCollection;

        if(search) inquiry.search = String(search);

        const result = await productService.getProducts(inquiry)

        

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getAllProducts", err);
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard)

    }
}

productController.getProduct = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("getProduct");
        const {id} = req.params;

        const memberId = req.member?._id ?? null; // TODO: check memberId

        const result = await productService.getProduct(memberId, id);

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getProduct", err);
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard)

    }
}



/**  SSR **/

productController.getAllProducts = async (req: AdminRequest, res: Response) => {
    try {
        console.log("getAllProducts");
        const data = await productService.getAllProducts();
        console.log("data", data);
      

        res.render("products",{products: data});

        // TODO: Token
    } catch (err) {
        console.log("Error, getAllProducts", err);
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard)
    }
};

productController.createNewProduct = async (req: AdminRequest, res: Response) => {
    try {
        console.log("createNewProduct");
        console.log(req.files);
        
        if(!req.files?.length) throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

        const data: ProductInput = req.body;
        data.productImages = req.files?.map((ele) => {
            return ele.path;
        });
        
        await productService.createNewProduct(data)

        res.send(
            `<script> alert("Sucessful creation); window.location.replace('admin/product/all')<script>`
        );

    } catch (err) {
        console.log("Error, createNewProduct", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script> alert("${message}); window.location.replace('admin/product/all')<script>`
        )
    }
};

productController.UpdateChoosenProduct = async (req: Request, res: Response) => {
    try {
        console.log("UpdateChoosenProduct");
        const id = req.params.id;

        const result = await productService.updateChosenProduct(id, req.body);
        
        res.send(result);

        // TODO: Token
    } catch (err) {
        console.log("Error, UpdateChoosenProduct", err);
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard)
    }
};


export default productController;