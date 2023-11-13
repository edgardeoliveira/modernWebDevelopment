import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { User } from '@/model/user';
import { Roles } from '@/model/roles';
import { userService } from '@/services/user.service';
import { rolesService } from '@/services/role.service';
import UserList from '@/components/user-list';
import { authService } from '@/services/auth.service';
import RolesList from '@/components/role-list';


export default function HomePage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Roles[]>([]);

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    // Função para buscar a lista de usuários
    function fetchUsers() {
        userService.getList()
            .then((list) => setUsers(list))
            .catch(treat);
    }


    // Função para buscar a lista de roles
    function fetchRoles() {
            rolesService.getList()
                .then((listR) => setRoles(listR))
                .catch(treat);
    }


    // Função para lidar com erros
    function treat(error: any) {
        if (authService.isUnauthorized(error)) {
            router.replace('login');
        } else {
            alert(error.message);
        }
    }

    // Função para editar um usuário
    function edit(id: number) {
        router.push(`/user/${id}`);
    }

    // Função para remover um usuário
    function remove(id: number) {
        userService.remove(id)
            .then((removed) => fetchUsers())
            .catch(treat);
    }

      // Função para editar uma Roles
      function editroles(id: number) {
        router.push(`/roles/${id}`);
    }

    // Função para remover um Roles
    function removeroles(id: number) {
        rolesService.remove(id)
            .then((removed) => fetchRoles())
            .catch(treat);
    }

    // Função para redirecionar para a página de cadastro de usuário
    function goToUser() {
        router.push('/user/0');
    }

    // Função para redirecionar para a página de cadastro de role
    function goToRole() {
        router.push('/role/0');
    }

    return (
        <>
            <Head>
                <title>Home Page</title>
            </Head>
            <main>
                <div className={styles.homeHeader}>
                    <div>
                        <button onClick={() => router.replace('login')}>Sair</button>
                    </div>
                    <h3>Listagem de Usuários</h3>
                    <div>
                        <button onClick={goToUser}>Add</button>
                    
                    </div>
                </div>

                <div className={styles.homeMain}>
                    <UserList users={users} edit={edit} remove={remove} />
                </div>

                <div>
                    <button className={styles.buttonRole} onClick={goToRole}>Role</button> 
                </div>
                <h3>Listagem de Roles</h3>
                <div className={styles.homeMain}>
                    <RolesList roles ={roles} edit={editroles} remove={removeroles} />
                </div>
            </main>
        </>
    );
}
