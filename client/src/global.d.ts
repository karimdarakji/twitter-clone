
export declare global {
    interface IAuth {
        component: any,
        path: string,
        header?: boolean,
        headerTitle?: string,
        back?: boolean
    
    }
    
    interface IUser {
        _id: string,
        name: string,
        email: string,
        username: string,
        image: string
    }
}
