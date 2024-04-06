export type MessageType = {
    _id: number;
    text: string;
    createdAt: Date;
    from: "user" | "hygeia"
}