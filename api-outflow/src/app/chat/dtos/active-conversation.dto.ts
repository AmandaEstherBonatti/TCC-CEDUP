import { IsNotEmpty, IsOptional } from "class-validator";

export class ActiveConversationDto {

  @IsOptional()
  socketId?: string;

  @IsOptional()
  userId: number;

  @IsOptional()
  conversationId: number;
}
