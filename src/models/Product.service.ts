import { Product, ProductInput, ProductInquiry, ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import Errors from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import { Message } from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { ProductStatus } from "../libs/enums/product.enum";
import { T } from "../libs/types/common";

class ProductService {
    private readonly productModel;
    

    constructor() {
        this.productModel = ProductModel;
    }

    /** SPA */

    public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
        console.log("inquiry",inquiry);
        
        const match: T = {productStatus: ProductStatus.PROCESS};

        if(inquiry.productCollection) match.productCollection = inquiry.productCollection;

        if(inquiry.search) match.productName = { $regex: new RegExp(inquiry.search, "i")};

        const sort: T = 
            inquiry.order === "productPrice"
             ?{[inquiry.order]: 1}
             :{[inquiry.order]: -1};

        const result = await this.productModel.aggregate([
            
              {$match: match}, 
              {$sort: sort},
              {$skip: (inquiry.page * 1 - 1) * inquiry.limit},
              {$limit: inquiry.limit * 1}
            
        ]).exec();
        if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        
        return result;
    }

    /** SPA */
    public async getAllProducts (): Promise<Product[]> {
        const result = await this.productModel.find().exec();
        if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        console.log("result:", result);
        return result;
    }



    public async createNewProduct(input: ProductInput): Promise<Product> {
        try{
            return await this.productModel.create(input);
        } catch(err) {
            console.error("Error, model:createNewProduct:", err); 
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    public async updateChosenProduct (id: string,input: ProductUpdateInput): Promise<Product> {
        id = shapeIntoMongooseObjectId(id);
        const result = await this.productModel.findByIdAndUpdate({_id: id}, input, {new: true}).exec();
        if(!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

        console.log("result:", result);
        return result;
    }
}

export default ProductService;