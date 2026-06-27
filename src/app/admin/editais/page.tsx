"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import styles from "./editais.module.scss";

export default function EditaisPage() {
    const router = useRouter();

    const [orgaos, setOrgaos] = useState<any[]>([]);
    const [bancas, setBancas] = useState<any[]>([]);
    const [cargos, setCargos] = useState<any[]>([]);

    const [form, setForm] = useState({
        titulo: "",
        numeroEdital: "",
        quantidadeVagas: 0,
        salario: 0,
        dataPublicacao: "",
        dataInscricaoInicio: "",
        dataInscricaoFim: "",
        dataProva: "",
        linkEdital: "",
        orgaoId: "",
        bancaId: "",
        cargoId: ""
    });

    useEffect(() => {
        async function load() {
            const [o, b, c] = await Promise.all([
                api.get("/orgaos"),
                api.get("/bancas"),
                api.get("/cargos")
            ]);

            setOrgaos(o.data);
            setBancas(b.data);
            setCargos(c.data);
        }

        load();
    }, []);

    function handleChange(e: any) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e: any) {
        e.preventDefault();

        await api.post("/editais", {
            ...form,
            quantidadeVagas: Number(form.quantidadeVagas),
            salario: Number(form.salario)
        });

        alert("Edital cadastrado com sucesso!");
        router.push("/admin/editais");
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cadastro de Edital</h1>

            <form onSubmit={handleSubmit} className={styles.form}>

                {/* TÍTULO */}
                <input
                    className={styles.input}
                    name="titulo"
                    placeholder="Título"
                    onChange={handleChange}
                />

                {/* NÚMERO EDITAL */}
                <input
                    className={styles.input}
                    name="numeroEdital"
                    placeholder="Número do edital"
                    onChange={handleChange}
                />

                {/* VAGAS */}
                <input
                    className={styles.input}
                    name="quantidadeVagas"
                    type="number"
                    placeholder="Quantidade de Vagas"
                    onChange={handleChange}
                />

                {/* SALÁRIO */}
                <input
                    className={styles.input}
                    name="salario"
                    type="number"
                    placeholder="Salário"
                    onChange={handleChange}
                />

                {/* DATA PUBLICAÇÃO */}
                <div className={styles.field}>
                    <label className={styles.label}>Data de Publicação</label>
                    <input
                        className={styles.input}
                        name="dataPublicacao"
                        type="date"
                        onChange={handleChange}
                    />
                </div>

                {/* INÍCIO INSCRIÇÃO */}
                <div className={styles.field}>
                    <label className={styles.label}>Início das Inscrições</label>
                    <input
                        className={styles.input}
                        name="dataInscricaoInicio"
                        type="date"
                        onChange={handleChange}
                    />
                </div>

                {/* FIM INSCRIÇÃO */}
                <div className={styles.field}>
                    <label className={styles.label}>Fim das Inscrições</label>
                    <input
                        className={styles.input}
                        name="dataInscricaoFim"
                        type="date"
                        onChange={handleChange}
                    />
                </div>

                {/* DATA PROVA */}
                <div className={styles.field}>
                    <label className={styles.label}>Data da Prova</label>
                    <input
                        className={styles.input}
                        name="dataProva"
                        type="date"
                        onChange={handleChange}
                    />
                </div>

                {/* LINK EDITAL */}
                <input
                    className={styles.input}
                    name="linkEdital"
                    placeholder="Link do edital"
                    onChange={handleChange}
                />

                {/* ÓRGÃO */}
                <select
                    className={styles.select}
                    name="orgaoId"
                    onChange={handleChange}
                >
                    <option value="">Selecione Órgão</option>
                    {orgaos.map((o: any) => (
                        <option key={o.id} value={o.id}>
                            {o.nome}
                        </option>
                    ))}
                </select>

                {/* BANCA */}
                <select
                    className={styles.select}
                    name="bancaId"
                    onChange={handleChange}
                >
                    <option value="">Selecione Banca</option>
                    {bancas.map((b: any) => (
                        <option key={b.id} value={b.id}>
                            {b.nome}
                        </option>
                    ))}
                </select>

                {/* CARGO */}
                <select
                    className={styles.select}
                    name="cargoId"
                    onChange={handleChange}
                >
                    <option value="">Selecione Cargo</option>
                    {cargos.map((c: any) => (
                        <option key={c.id} value={c.id}>
                            {c.nome}
                        </option>
                    ))}
                </select>

                {/* BOTÃO */}
                <button className={styles.button} type="submit">
                    Salvar Edital
                </button>

            </form>
        </div>
    );
}