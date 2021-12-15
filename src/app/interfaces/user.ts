class User {
    log: string;
    saves: string[];
    created: string[];

    constructor(log: string, saves: string[], created: string[]) {
        this.log = log;
        this.saves = saves;
        this.created = created;
    }
}

export const userConverter = {
    fromJSON: (json: any): User => {
        return new User(
            json.log,
            json.saves,
            json.created
        );
    },
    toJSON: (user: User): any => {
        return {
            log: user.log,
            saves: user.saves,
            created: user.created
        };
    }
};