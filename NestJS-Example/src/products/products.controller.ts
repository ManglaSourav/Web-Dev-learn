import { Controller, Post, Body, Get, Param, Patch, Delete, Req, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Request } from 'express';
import { ProductDTO } from "./dto/product.dto";

@Controller('products') //auto add path to API
export class ProductsController {

    constructor(private readonly productsService: ProductsService){}

    @Post()
    addProduct(
        @Body() productDTO:ProductDTO
        // @Body('title') prodTitle: string,
        // @Body('description') prodDesc: string,
        // @Body('price') prodPrice: number,
    ){
        const generatedId = this.productsService.insertProduct(productDTO);
        return { id : generatedId };
    }

    @Get()
    @HttpCode(201) //setting response HTTP status code
    getAllProducts(@Req() request: Request) { //accessing request params
        // console.log(request);
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string) {
        this.productsService.deleteProduct(prodId);
        return null;
    }
}
