import { Roles } from "@/model/roles"
import { authServiceRoles } from "./auth.serviceRoles"
import { authService } from "./auth.service"

class RolesService {

    private readonly urlRole = 'http://localhost:3030/roles'

    private getHeaders() {
        const logged = authService.getLoggedUser()
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
        const response = await fetch(this.urlRole, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(roles)
          
            
        })

        const data = await this.validate(response)
        return data as Roles
    }

    public async getList() {
        const response = await fetch(this.urlRole, {
            method: 'GET',
            headers: this.getHeaders()
        })

        const data = await this.validate(response)
        return data as Roles[]
    }

    public async update(idroles: number, roles: Roles) {
        const response = await fetch(`${this.urlRole}/${idroles}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(roles)
        })

        const data = await this.validate(response)
        return data as Roles
    }

    public async remove(idroles: number) {
        const response = await fetch(`${this.urlRole}/${idroles}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        })

        const data = await this.validate(response)
        return data as boolean
    }

    public async get(idroles: number) {
        const response = await fetch(`${this.urlRole}/${idroles}`, {
            method: 'GET',
            headers: this.getHeaders(),
        })

        const data = await this.validate(response)
        return data as Roles
    }
    
}
export const rolesService = new RolesService() 