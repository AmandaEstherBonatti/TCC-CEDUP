// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { from, map, mergeMap, Observable, of, switchMap, take } from 'rxjs';
// import { Repository } from 'typeorm';
// import { UsersEntity } from '../user/users.entity';
// import { ConversationDto } from './dtos/conversation.dto';
// import { ActiveConversationEntity } from './entitys/active-conversation.entity';
// import { ConversationEntity } from './entitys/conversation.entity';
// import { MessageEntity } from './entitys/message.entity';

// @Injectable()
// export class ConversationService {
//   constructor(
//     @InjectRepository(ConversationEntity)
//     private readonly conversationRepository: Repository<ConversationEntity>,
//     @InjectRepository(ActiveConversationEntity)
//     private readonly activeConversationRepository: Repository<ActiveConversationEntity>,
//     @InjectRepository(MessageEntity)
//     private readonly messageRepository: Repository<MessageEntity>,
//   ) {}

//   getConversation(
//     creatorId: number,
//     friendId: number,
//   ): Observable<ConversationDto | undefined> {
//     return from(
//       this.conversationRepository
//         .createQueryBuilder('conversation')
//         .leftJoin('conversation.users', 'user')
//         .where('user.id = :creatorId', { creatorId })
//         .orWhere('user.id = :friendId', { friendId })
//         .groupBy('conversation.id')
//         .having('COUNT(*) > 1')
//         .getOne(),
//     ).pipe(map((conversation: ConversationDto) => conversation || undefined));
//   }

//   createConversation(creator: UsersEntity, friend: UsersEntity): Observable<ConversationDto> {
//     return this.getConversation(creator.id, friend.id).pipe(
//       switchMap((conversation: ConversationDto) => {
//         const doesConversationExist = !!conversation;
//         if (!doesConversationExist) {
//           const newConversation: ConversationDto = {
//             users: [creator, friend],
//           };
//           return from(this.conversationRepository.save(newConversation));
//         }
//         return of(conversation);
//       }),
//     );
//   }

//   getConversationsForUser(userId: number): Observable<Conversation[]> {
//     return from(
//       this.conversationRepository
//         .createQueryBuilder('conversation')
//         .leftJoin('conversation.users', 'user')
//         .where('user.id = :userId', { userId })
//         .orderBy('conversation.lastUpdated', 'DESC')
//         .getMany(),
//     );
//   }

//   getUsersInConversation(conversationId: number): Observable<Conversation[]> {
//     return from(
//       this.conversationRepository
//         .createQueryBuilder('conversation')
//         .innerJoinAndSelect('conversation.users', 'user')
//         .where('conversation.id = :conversationId', { conversationId })
//         .getMany(),
//     );
//   }

//   getConversationsWithUsers(userId: number): Observable<Conversation[]> {
//     return this.getConversationsForUser(userId).pipe(
//       take(1),
//       switchMap((conversations: Conversation[]) => conversations),
//       mergeMap((conversation: Conversation) => {
//         return this.getUsersInConversation(conversation.id);
//       }),
//     );
//   }

//   joinConversation(
//     friendId: number,
//     userId: number,
//     socketId: string,
//   ): Observable<ActiveConversation> {
//     return this.getConversation(userId, friendId).pipe(
//       switchMap((conversation: Conversation) => {
//         if (!conversation) {
//           console.warn(
//             `No conversation exists for userId: ${userId} and friendId: ${friendId}`,
//           );
//           return of();
//         }
//         const conversationId = conversation.id;
//         return from(this.activeConversationRepository.findOne({ userId })).pipe(
//           switchMap((activeConversation: ActiveConversation) => {
//             if (activeConversation) {
//               return from(
//                 this.activeConversationRepository.delete({ userId }),
//               ).pipe(
//                 switchMap(() => {
//                   return from(
//                     this.activeConversationRepository.save({
//                       socketId,
//                       userId,
//                       conversationId,
//                     }),
//                   );
//                 }),
//               );
//             } else {
//               return from(
//                 this.activeConversationRepository.save({
//                   socketId,
//                   userId,
//                   conversationId,
//                 }),
//               );
//             }
//           }),
//         );
//       }),
//     );
//   }

//   leaveConversation(socketId: string): Observable<DeleteResult> {
//     return from(this.activeConversationRepository.delete({ socketId }));
//   }

//   getActiveUsers(conversationId: number): Observable<ActiveConversation[]> {
//     return from(
//       this.activeConversationRepository.find({
//         where: [{ conversationId }],
//       }),
//     );
//   }

//   createMessage(message: Message): Observable<Message> {
//     return from(this.messageRepository.save(message));
//   }

//   getMessages(conversationId: number): Observable<Message[]> {
//     return from(
//       this.messageRepository
//         .createQueryBuilder('message')
//         .innerJoinAndSelect('message.user', 'user')
//         .where('message.conversation.id =:conversationId', { conversationId })
//         .orderBy('message.createdAt', 'ASC')
//         .getMany(),
//     );
//   }

//   // Note: Would remove below in production - helper methods
//   removeActiveConversations() {
//     return from(
//       this.activeConversationRepository.createQueryBuilder().delete().execute(),
//     );
//   }

//   removeMessages() {
//     return from(this.messageRepository.createQueryBuilder().delete().execute());
//   }

//   removeConversations() {
//     return from(
//       this.conversationRepository.createQueryBuilder().delete().execute(),
//     );
//   }
// }
