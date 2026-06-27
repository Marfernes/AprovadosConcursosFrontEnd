"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.scss";
import { api } from "@/services/api";
import EditaisAbertos from "./components/EditaisAbertos";
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

        <nav className={styles.menu}>
          <a className={styles.item}><LayoutDashboard size={20} />{isOpen && "Dashboard"}</a>
          <a className={styles.item}><BookOpen size={20} />{isOpen && "Questões"}</a>
          <a className={styles.item}><ClipboardList size={20} />{isOpen && "Simulados"}</a>
          <a className={styles.item}><BarChart3 size={20} />{isOpen && "Desempenho"}</a>
          <a className={styles.item}><TrendingUp size={20} />{isOpen && "Estatísticas"}</a>
        </nav>

        <div className={styles.footer}>
          <a className={styles.item}><User size={20} />{isOpen && "Perfil"}</a>
          <a className={styles.item}><Settings size={20} />{isOpen && "Configurações"}</a>

          <button className={styles.logout} onClick={logout}>
            <LogOut size={20} />
            {isOpen && "Sair"}
          </button>
        </div>

      </aside>

      {/* CONTEÚDO */}
      <main className={styles.content}>

        {/* HEADER NOVO */}
        <div className={styles.header}>
          <h1>Dashboard</h1>
          <p>Bem-vindo ao sistema Aprovados Concursos 🎯</p>
        </div>

        <div className={styles.main}>

          {/* CARD BOAS-VINDAS */}
          <div className={styles.welcomeCard}>
            <h2>Seu desempenho começa aqui 🚀</h2>
            <p>
              Acompanhe editais, resolva questões e aumente suas chances de aprovação.
            </p>
          </div>

          {/* CARROSSEL */}
          <div className={styles.carouselArea}>
            <EditaisAbertos />
          </div>

        </div>

      </main>
    </div>
  );
}