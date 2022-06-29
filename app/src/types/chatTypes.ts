import {UserType} from './userTypes';


export type GetAllChatDataDTO = {
  userName: string;
}

export type GetAllChatOptionsDTO = {
    limit: number;
    offset: number;
  }


export type GetChatsDTO = {
    data: GetAllChatDataDTO,
    options: GetAllChatOptionsDTO
}


export type ChatType = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
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
    chatID: number;
    userID: number;
    message: string;
    readed: boolean;
    files: string[];
    createdAt: string;
    updatedAt: string;
    pinnedMessage?: MessagePinnedMessage[];
}


// API

export type GetAllChatsResponse = {
    message: string,
    chats: ChatType,
}
