import { Roles } from "@/model/roles";

class AuthRepositoryRole {

    private static readonly LOGGED_KEY = '@AULA_AUTH_LOGGED'

    public getLogged() {
        const json = localStorage.getItem(AuthRepositoryRole.LOGGED_KEY)
        return json ? JSON.parse(json) as Roles : null
    }

    public setLogged(roles: Roles) {
        const json = JSON.stringify(roles)
        localStorage.setItem(AuthRepositoryRole.LOGGED_KEY, json)
    }

    public removeLoggedUser() {
        localStorage.removeItem(AuthRepositoryRole.LOGGED_KEY)
    }

}

export const authRepositoryrole = new AuthRepositoryRole()