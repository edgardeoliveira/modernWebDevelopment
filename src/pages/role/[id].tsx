

import React from 'react'
import Head from "next/head"

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import MyInput from '../../components/input'
import styles from './styles.module.css'
import { rolesService } from '@/services/role.service'
import { authService } from '@/services/auth.service'
import { Roles } from '@/model/roles'

export default function RolesPage() {

    const router = useRouter()
    const params = useParams()

    const [title, setTitle] = React.useState('Nova Role')


    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        const user = authService.getLoggedUser()
        if (!user) router.replace('/login')
    } , [])

    
    async function saveRole() {
           
      await rolesService.create({ name, description })
      router.back()
 
    }

    return (
        <div className={styles.loginPage}>
            <Head> <title>Cadastro de Usuário</title> </Head>

            <main className={styles.main}>
                <h2>{title}</h2>

                <div className={styles.inputs}>
                    <MyInput
                        label='Nome'
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <MyInput
                        label='Descriçao'
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />

                </div>

                <button className={styles.button} onClick={saveRole}>Salvar</button>
            </main>
        </div>
    )
}