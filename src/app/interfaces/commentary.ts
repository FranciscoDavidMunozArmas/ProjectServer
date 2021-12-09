export interface Commentary {
    id: string,
    author: string,
    authorID: string,
    message: string,
    date: string
}

export const commentaryConverter = {
    toJSON(data: any): any{
        return {
            id: data._id,
            author: data.author,
            authorID: data.authorID,
            message: data.message,
            date: data.date
        };
    }
}