# Validação TDD — Cenário B

## Contexto e requisito

- **Cenário:** B — OpenSpec.
- **Contrato:** CT-OPEN-001, conforme `openspec.md`.
- **Requisito:** RN-001 a RN-010, sem seleção de uma correção específica: a auditoria não encontrou lacuna real que justificasse escolher apenas uma regra.
- **Specification:** `openspec/specs/appointment-management/spec.md`.
- **Branch inicial:** `main`; a branch de referência `feature/sistema-agendamentos-ct-open-001` não aparece entre as branches locais ou remotas disponíveis.
- **SHA inicial:** `b18e355876b098d353f6d91e22856bfd4c916da7`.
- **Estado inicial observado:** `main...origin/main`; `tdd-open.md` já estava não rastreado antes da execução. Nenhuma alteração em código, testes ou contrato foi feita nesta validação.

## Estado inicial e revisão da cobertura

A implementação existente cobre as regras observadas na specification:

- **RN-001 a RN-006 e RN-010:** `tests/unit/appointment.test.js` cobre campos obrigatórios e trim, datas reais e bissextas, horários inválidos, e observações no limite de 500 caracteres e acima dele.
- **RN-007:** `tests/unit/appointment.test.js` e `tests/unit/use-cases.test.js` verificam rejeição de horários passados com relógio controlado; os testes de caso de uso permitem leitura/exclusão de registros históricos.
- **RN-008 e RN-009:** `tests/unit/use-cases.test.js` verifica conflito na criação/edição e atualização do próprio horário; `tests/integration/appointment-repository.test.js` cobre a restrição de unicidade e exclusão do próprio ID.
- **Fluxos web e erros:** `tests/http/appointment-routes.test.js` verifica listagem, criação, visualização, edição, exclusão e mapeamento de erros HTTP.

Não foi observada uma regra contratual sem cobertura ou um defeito reproduzível nessa revisão. Portanto, não foi criado teste novo nem induzida falha: isso fabricaria um RED, em vez de demonstrar um ciclo TDD legítimo. Não foi identificada uma refatoração necessária para a auditoria.

## RED, GREEN e REFACTOR

- **RED:** não executado. Nenhuma falha genuína de requisito foi encontrada.
- **GREEN:** não executado. Não houve correção a implementar.
- **REFACTOR:** não executado; não foi necessária refatoração.
- **Registros históricos:** `docs/tcc/tdd-cycles.csv` não existe. `docs/tcc/test-results.md` contém execuções bem-sucedidas, mas não evidencia um par RED/GREEN histórico; resultados anteriores não foram reclassificados nem inventados.

## Validação executada

Executada em 2026-11-04, com Node.js `v24.22.2` e npm `12.2.1`, no SHA inicial acima:

| Comando | Resultado observado |
|---|---|
| `npm test` | Aprovado: 32 testes, 32 passaram, 0 falharam, 0 ignorados. |
| `npm run test:coverage` | Aprovado: 32 testes, 32 passaram, 0 falharam. Cobertura nativa: 92,91% linhas, 85,99% branches, 84,75% funções, nos 18 arquivos JavaScript de `src/**/*.js`. |
| `npm run lint` | Aprovado: ESLint terminou sem erros. |
| `npm run format:check` | Aprovado: todos os arquivos selecionados passaram no Prettier. |

## Evidências e conclusão

O documento desta validação é o único arquivo de implementação adicionado; não há arquivos de código, testes, dependências, specification ou CSV TDD alterados. O arquivo preexistente `tdd-open.md` permanece não rastreado e não foi modificado. A mudança OpenSpec de planejamento é separada das alterações de implementação.

O resultado demonstra que a suíte existente valida os requisitos revisados, mas não constitui um novo ciclo TDD: sem lacuna real, um RED legítimo não pode ser produzido sem alterar artificialmente o contrato ou o comportamento. A branch de referência solicitada não está disponível, portanto estas conclusões se limitam à `main` e ao SHA registrado.
