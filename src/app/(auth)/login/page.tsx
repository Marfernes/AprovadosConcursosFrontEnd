"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.scss";
import { api } from "@/services/api";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
        const res = await api.post("/auth/login", {
            email,
            password
        });

        console.log("LOGIN RESPONSE:", res.data);

        const token = res.data.token;

        if (!token) {
            throw new Error("Token não retornado pelo backend");
        }

        localStorage.setItem("token", token);

        console.log("TOKEN SALVO:", token);

        const role = res.data.role;

        if (role === "Admin") {
            router.push("/admin");
        } else {
            router.push("/dashboard");
        }

    } catch (err) {
        console.error(err);
        alert("Erro no login");
    }
}
    return (
        <div className={styles.page}>
            <div className={styles.container}>

                <div className={styles.logoWrapper}>
                    <div className={styles.orbit}></div>
                    <div className={styles.orbit2}></div>

                    <div className={styles.logo}>
                        Aprovados Questões Concursos
                    </div>
                </div>

                <div className={styles.left}>
                    <h1>Sua aprovação começa aqui</h1>
                    <p>
                        Treine questões, evolua diariamente e conquiste sua vaga nos concursos públicos.
                    </p>
                </div>

                <div className={styles.right}>
                    <h2>Acesse sua conta</h2>

                    <input
                        className={styles.input}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className={styles.input}
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className={styles.button}
                        onClick={handleLogin}
                    >
                        Entrar
                    </button>

                    <span
                        className={styles.link}
                        onClick={() => router.push("/register")}
                    >
                        Criar conta
                    </span>
                </div>
            </div>
        </div>
    );
}