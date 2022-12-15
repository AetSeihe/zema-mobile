import {UserType} from './userTypes';


export type GetAllChatOptionsType = {
    limit: number,
    offset: number
}

export type GetChatByUserType = {
    userOneId: number,
    userTwoId: number
}

export type GetUsersInChatsByName = {
    name: string,
}

export type GetChatsByMsgText = {
    text: string,
}

export type GetMessagesInChatType = {
    chatId: string,
    offset: number,
    limit: number;
}

export type ResponseGetMessagesInChatType = {
    messages: MessageType[]
}


export type GetAllChatsResponseType = {
    chats: ChatType[]
}

export type ChatType = {
    id: number;
    userOneId: number;
    userTwoId: number;
    createdAt: string;
    updatedAt: string;
    messages: MessageType[];
    companion: UserType;
}

export type SendMessageType = {
    message: string,
    userTo: number,
    replyMessageId?: number,
}
export interface ReplyMessageType {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    messageId: number;
    replyMessageId: number;
    reply: MessageType;
}

export type MessageFileType = {
    id: number;
    chatID: number;
    messageID: number;
    fileName: string;
    fileType: string;
    createdAt: string;
    updatedAt: string;
}

export type MessageType = {
    id: number | string;
    message: string;
    readed: boolean;
    chatId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    sending?: boolean;
    isNewMessage?: boolean;
    replies?: ReplyMessageType[];
    files?: MessageFileType[];
}
