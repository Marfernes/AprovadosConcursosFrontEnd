"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.scss";
import { api } from "@/services/api";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  BarChart3,
  TrendingUp,
  User,
  Settings,
  LogOut
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        await api.get("/auth/me");
      } catch {
        router.push("/login");
      }
    }

    carregarUsuario();
  }, [router]);

  async function logout() {
    await api.post("/auth/logout");
    router.push("/login");
  }

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles.container}>

      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ""}`}>

        {/* TOPO */}
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <h2>{isOpen ? "Aprovados" : "AP"}</h2>
            {isOpen && <span>Concursos</span>}
          </div>

          <div className={styles.divider} />

          <button className={styles.toggleBtn} onClick={toggleSidebar}>
            {isOpen ? "⫷" : "⫸"}
          </button>
        </div>

        {/* MENU */}
        <nav className={styles.menu}>

          <a className={styles.item}>
            <LayoutDashboard size={20} />
            {isOpen && "Dashboard"}
          </a>

          <a className={styles.item}>
            <BookOpen size={20} />
            {isOpen && "Questões"}
          </a>

          <a className={styles.item}>
            <ClipboardList size={20} />
            {isOpen && "Simulados"}
          </a>

          <a className={styles.item}>
            <BarChart3 size={20} />
            {isOpen && "Desempenho"}
          </a>

          <a className={styles.item}>
            <TrendingUp size={20} />
            {isOpen && "Estatísticas"}
          </a>

        </nav>

        {/* FOOTER */}
        <div className={styles.footer}>

          <a className={styles.item}>
            <User size={20} />
            {isOpen && "Perfil"}
          </a>

          <a className={styles.item}>
            <Settings size={20} />
            {isOpen && "Configurações"}
          </a>

          <button className={styles.logout} onClick={logout}>
            <LogOut size={20} />
            {isOpen && "Sair"}
          </button>

        </div>

      </aside>
      {/* CONTEÚDO PRINCIPAL */}
      <main className={styles.content}>
        <h1>Dashboard</h1>

        <div className={styles.card}>
          Bem-vindo ao sistema Aprovados Concursos 🎯
        </div>
      </main>

    </div>
  );
}