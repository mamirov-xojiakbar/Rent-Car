import { IsNotEmpty, IsString } from "class-validator";

export class CreateMarkaDto {
    @IsString()
    @IsNotEmpty()
    name: string
}
