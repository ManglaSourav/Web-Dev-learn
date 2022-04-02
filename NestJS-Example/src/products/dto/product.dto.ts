import {IsInt, IsString} from 'class-validator';

export class ProductDTO {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsInt()
  readonly price: number;

}