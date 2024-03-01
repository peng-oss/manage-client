import { createContext, useContext } from "react"

export interface UserData{
    username?:string
    sex?: string
    role?: {
        code?: string,
        value:String
    }
    token?: string
    phone?: string,
    receiveStatus?: boolean
}
export type GlobalContent = {
    userData?: UserData|null
 
}
export const MyGlobalContext = createContext<GlobalContent>({
    userData: null,
})
export const useGlobalContext = () => useContext(MyGlobalContext)