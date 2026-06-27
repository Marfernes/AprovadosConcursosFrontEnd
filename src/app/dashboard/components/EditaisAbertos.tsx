"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "@/services/api";
import styles from "./EditaisAbertos.module.scss";

export default function EditaisAbertos() {
    const [editais, setEditais] = useState<any[]>([]);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function carregar() {
            const response = await api.get("/editais");
            setEditais(response.data);
        }

        carregar();
    }, []);

    function scrollLeft() {
        carouselRef.current?.scrollBy({
            left: -400,
            behavior: "smooth"
        });
    }

    function scrollRight() {
        carouselRef.current?.scrollBy({
            left: 400,
            behavior: "smooth"
        });
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.top}>
                <h2 className={styles.title}>
                    Editais com inscrições abertas
                </h2>

                <div className={styles.controls}>
                    <button onClick={scrollLeft}>❮</button>
                    <button onClick={scrollRight}>❯</button>
                </div>
            </div>

            <div className={styles.carousel} ref={carouselRef}>

                {editais.map((edital) => (
                    <div key={edital.id} className={styles.card}>

                        <span className={styles.badge}>
                            ABERTO
                        </span>

                        <h3 className={styles.editalTitle}>
                            {edital.titulo}
                        </h3>

                        <div className={styles.info}>
                            <p><strong>Órgão:</strong> {edital.orgao}</p>
                            <p><strong>Banca:</strong> {edital.banca}</p>
                            <p><strong>Cargo:</strong> {edital.cargo}</p>
                        </div>

                        <div className={styles.salary}>
                            {Number(edital.salario).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })}
                        </div>

                        <a
                            href={edital.linkEdital}
                            target="_blank"
                            className={styles.button}
                        >
                            Ver edital
                        </a>

                    </div>
                ))}

            </div>
        </div>
    );
}