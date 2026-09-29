import { useCallback, useEffect, useMemo, useState } from "react";

import type {
    Diligencia,
    DiligenciaFormData,
    DiligenciaStatus,
} from "../types/diligencia";

import {
    loadDiligencias,
    createDiligencia,
    updateDiligencia,
    updateDiligenciaStatus,
    archiveDiligencia,
    hasScheduleConflict
} from "../services/diligenciasStorage";

export function useDiligencias() {

    const [diligencias, setDiligencias] =
        useState<Diligencia[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [conflictMessage, setConflictMessage] =
        useState<string | null>(null);

    // ===========================
    // Carregamento
    // ===========================

    const carregar = useCallback(async () => {

        try {

            setLoading(true);

            setError(null);

            const lista =
                await loadDiligencias();

            setDiligencias(lista);

        } catch (err) {

            console.error(err);

            setError(
                "Erro ao carregar diligências."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        carregar();

    }, [carregar]);

    // ===========================
    // Criar
    // ===========================

    const criar = useCallback(

        async (dados: DiligenciaFormData) => {

            try {

                setSaving(true);

                const conflito =
                    hasScheduleConflict(
                        {
                            id: "",
                            data: dados.data,
                            hora: dados.hora
                        },
                        diligencias
                    );

                if (conflito) {

                    setConflictMessage(

                        `Existe uma diligência marcada para ${conflito.hora}.`

                    );

                } else {

                    setConflictMessage(null);

                }

                const nova =
                    await createDiligencia(
                        dados,
                        diligencias
                    );

                setDiligencias((old) => [

                    ...old,

                    nova

                ]);

                return nova;

            } finally {

                setSaving(false);

            }

        },

        [diligencias]

    );

    // ===========================
    // Editar
    // ===========================

    const editar = useCallback(

        async (

            id: string,

            dados: DiligenciaFormData

        ) => {

            try {

                setSaving(true);

                const conflito =
                    hasScheduleConflict(
                        {
                            id,
                            data: dados.data,
                            hora: dados.hora
                        },
                        diligencias
                    );

                if (conflito) {

                    setConflictMessage(

                        `Existe uma diligência próxima às ${conflito.hora}.`

                    );

                } else {

                    setConflictMessage(null);

                }

                const atualizada =
                    await updateDiligencia(

                        id,

                        dados,

                        diligencias

                    );

                setDiligencias((old) =>
                    old.map((d) =>
                        d.id === id
                            ? atualizada
                            : d
                    )
                );

                return atualizada;

            } finally {

                setSaving(false);

            }

        },

        [diligencias]

    );

    const alterarStatus = useCallback(
        async (id: string, status: Exclude<DiligenciaStatus, "Arquivada">) => {
            try {
                setSaving(true);

                const atualizada = await updateDiligenciaStatus(
                    id,
                    status,
                    diligencias
                );

                setDiligencias((old) =>
                    old.map((d) => (d.id === id ? atualizada : d))
                );

                return atualizada;
            } finally {
                setSaving(false);
            }
        },
        [diligencias]
    );

    // ===========================
    // Arquivar
    // ===========================

    const arquivar = useCallback(

        async (id: string) => {

            try {

                setSaving(true);

                const arquivada =
                    await archiveDiligencia(

                        id,

                        diligencias

                    );

                setDiligencias((old) =>
                    old.map((d) =>
                        d.id === id
                            ? arquivada
                            : d
                    )
                );

            } finally {

                setSaving(false);

            }

        },

        [diligencias]

    );

    // ===========================
    // Estatísticas
    // ===========================

    const estatisticas =
        useMemo(() => {

            const total =
                diligencias.length;

            const abertas =
                diligencias.filter(
                    d => !d.arquivada
                ).length;

            const arquivadas =
                diligencias.filter(
                    d => d.arquivada
                ).length;

            const contratado =
                diligencias.reduce(

                    (acc, d) =>
                        acc +
                        d.valorContratado,

                    0

                );

            const recebido =
                diligencias.reduce(

                    (acc, d) =>
                        acc +
                        d.valorRecebido,

                    0

                );

            return {

                total,

                abertas,

                arquivadas,

                contratado,

                recebido,

                pendente:
                    contratado -
                    recebido

            };

        }, [diligencias]);

    return {

        diligencias,

        loading,

        saving,

        error,

        conflictMessage,

        estatisticas,

        carregar,

        criar,

        editar,

        alterarStatus,

        arquivar

    };

}
