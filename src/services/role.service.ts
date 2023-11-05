import { Roles } from "@/model/roles"
import { authServiceRoles } from "./auth.serviceRoles"

class RolesService {

    private readonly url = 'http://localhost:3030/roles'

    private getHeaders() {
        const logged = authServiceRoles.getLoggedUser()
        if (!logged) throw new Error('Unauthorized')

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${logged.token}`,
        }
    }

    private async validate(response: Response) {
        const data = await response.json()

        if (response.status === 401) {
            throw new Error(response.statusText)
        } else if (response.status > 299) {
            throw new Error(data.message)
        }
        return data
    }

    public async create(roles: Roles) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(roles)
        })

        const data = await this.validate(response)
        return data as Roles
    }

    public async getList() {
        const response = await fetch(this.url, {
            method: 'GET',
            headers: this.getHeaders()
        })

        const data = await this.validate(response)
        return data as Roles[]
    }
    
}
export const rolesService = new RolesService() 