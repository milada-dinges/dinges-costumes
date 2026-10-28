'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

import { supabase } from "@/services/supabase"

export default function Admin() {
    const router = useRouter();

    const [credential, setCredential] = useState({
        email: '',
        password: '',
    })

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setCredential({
            ...credential, [id]: value
        })
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        try{
            const { data, error } = await supabase.auth.signInWithPassword({
                email: credential.email,
                password: credential.password
            })
            if (error) {
                alert(`Ошибка входа: ${error.message}`)
                return
            }
        } catch(err) {
            alert('Критическая ошибка, попробуйте позже')
            return
        }

        router.push('/admin/dashboard')
    };

    return(
        <div className="admin">
            <form className="admin__form" onSubmit={handleSubmit}>
                <label htmlFor="email">Почта:</label>
                <input className="admin__input" id="email" type="email" onChange={handleChange} value={credential.email} required/>

                <label htmlFor="password">Пароль:</label>
                <input className="admin__input" id="password" type="password" onChange={handleChange} value={credential.password} required/>

                <button className="admin__btn" type="submit">
                    Войти
                </button>
            </form>
        </div>
    )
}