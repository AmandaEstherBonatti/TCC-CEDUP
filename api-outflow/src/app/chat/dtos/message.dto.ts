import { IsNotEmpty, IsOptional } from "class-validator";
import { UsersEntity } from "src/app/user/users.entity";
import { ConversationEntity } from "../entitys/conversation.entity";

export class CreateMessageDto {

  @IsOptional()
  message: string;

  @IsOptional()
  User: UsersEntity;

  @IsOptional()
  Conversation: ConversationEntity;

  @IsNotEmpty()
  createdAt?: Date;
}
