import { IsNotEmpty, IsOptional } from "class-validator";
import { UsersEntity } from "src/app/user/users.entity";

export class ConversationDto {

  @IsOptional()
  Users?: UsersEntity[];


  @IsNotEmpty()
  lastUpdated?: Date;
}
