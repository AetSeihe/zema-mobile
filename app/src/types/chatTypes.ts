import {UserType} from './userTypes';


export type ChatType = {
    id: number;
    createdAt: string;
    updatedAt: string;
    messages: MessageType[];
    companion: UserType;
}

export type PinnedMessagePinnedMessage = {
    id: number;
    messageID: number;
    messageAndPintedMessageID: number;
    createdAt: Date;
    updatedAt: Date;
    message: MessageType;
}

export type MessagePinnedMessage = {
    id: number;
    rootMessageID: number;
    createdAt: Date;
    updatedAt: Date;
    pinnedMessage: PinnedMessagePinnedMessage[];
}

export type MessageType = {
    id: number;
    chatId: number;
    userId: number;
    message: string;
    readed: boolean;
    files: string[];
    createdAt: string;
    updatedAt: string;
    pinnedMessage?: MessagePinnedMessage[];
    chat?: {
        id: number,
        userOneId: number,
        userTwoId: number,
        createdAt: string,

    }
}


// API

export type GetAllChatsResponse = {
    message: string,
    chats: ChatType[],
}

export type GetAllMessagesResponse = {
    message: string,
    messages: MessageType[],
}

export type GetAllChatDataDTO = {
    userName?: string;
  }

export type GetAllChatOptionsDTO = {
      limit: number;
      offset: number;
    }

export type GetChatsDTO = {
    data: GetAllChatDataDTO,
    options: GetAllChatOptionsDTO
}


export type GetAllMessagesInChat = {
  chatId: number;
  limit: number;
  offset: number;
}

