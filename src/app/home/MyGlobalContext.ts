import { createContext, useContext } from "react"

export interface UserData{
    userName?:string
    token?:string
}
export type GlobalContent = {
    userData?: UserData|null
  login:() => void
}
export const MyGlobalContext = createContext<GlobalContent>({
    userData: null,
    login: () => {},
})
export const useGlobalContext = () => useContext(MyGlobalContext)