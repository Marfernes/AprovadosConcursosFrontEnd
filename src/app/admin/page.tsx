"use client";

import { useRouter } from "next/navigation";
import styles from "./admin.module.scss";

import {
    FileText,
    Users,
    BookOpen,
    ClipboardList,
    Building2,
    Settings,
    LogOut,
} from "lucide-react";
import { api } from "@/services/api";

export default function AdminPage() {
    const router = useRouter();

    async function logout() {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        } finally {
            router.push("/login");
        }
    }

    return (
        <div className={styles.container}>
            {/* SIDEBAR */}
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <h2>Painel Admin</h2>
                    <p>Aprovados Concursos</p>
                </div>

                <nav className={styles.menu}>
                    <div className={styles.menuItem}>
                        <FileText size={20} />
                        <span>Editais</span>
                    </div>

                    <div className={styles.menuItem}>
                        <Users size={20} />
                        <span>Usuários</span>
                    </div>

                    <div className={styles.menuItem}>
                        <BookOpen size={20} />
                        <span>Questões</span>
                    </div>

                    <div className={styles.menuItem}>
                        <ClipboardList size={20} />
                        <span>Simulados</span>
                    </div>

                    <div className={styles.menuItem}>
                        <Building2 size={20} />
                        <span>Bancas</span>
                    </div>

                    <div className={styles.menuItem}>
                        <Settings size={20} />
                        <span>Configurações</span>
                    </div>
                </nav>

                <div className={styles.footer}>
                    <button className={styles.logout} onClick={logout}>
                        <LogOut size={20} />
                        <span>Sair</span>
                    </button>
                </div>
            </aside>

            {/* CONTEÚDO */}
            <main className={styles.content}>
                <h1 className={styles.title}>Painel Administrativo</h1>

                <p className={styles.subtitle}>
                    Gerencie todas as informações do sistema.
                </p>

                <div className={styles.card}>
                    Bem-vindo ao painel administrativo.
                </div>
            </main>
        </div>
    );
}