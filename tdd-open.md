# PROMPT — IMPLEMENTAÇÃO E VALIDAÇÃO DE TDD
## CENÁRIO B — OPENSPEC + CLEAN ARCHITECTURE

### 1. CONTEXTO

Você é um agente de desenvolvimento especializado em Spec-Driven Development, OpenSpec, Clean Architecture e Test-Driven Development.

Sua tarefa é acrescentar e validar TDD no CRUD de agendamentos existente.

**Repositório:**
https://github.com/thiarrull/CRUD-com-SDD.git

**Branch de referência:**
feature/sistema-agendamentos-ct-open-001

**Cenário experimental:** B — Spec-Driven Development com OpenSpec.

**Contrato:** CT-OPEN-001.

O projeto já está implementado e possui testes automatizados. Não recrie o CRUD.

O objetivo é demonstrar a aplicação prática de TDD em uma alteração pequena, seguindo as regras do contrato.

Este é um TCC experimental simples. Evite documentação ou processos excessivos.

### 2. RECONHECIMENTO DO PROJETO

Antes de alterar qualquer arquivo:

1. Confira a branch atual e o commit inicial.
2. Leia o README.
3. Examine o package.json.
4. Leia o contrato `openspec.md`.
5. Localize a specification dos agendamentos.
6. Examine os testes existentes.
7. Verifique os registros TDD disponíveis.
8. Execute `npm test`.

Respeite a stack existente:

- JavaScript CommonJS;
- Node.js 24;
- Express;
- EJS;
- SQLite;
- better-sqlite3;
- node:test;
- node:assert/strict;
- Supertest;
- OpenSpec.

Não substituir dependências nem adicionar bibliotecas desnecessárias.

### 3. ESCOLHA DO COMPORTAMENTO

Consulte as regras RN-001 a RN-010 e RF-001 a RF-004.

Identifique um comportamento que ainda não esteja corretamente implementado ou um defeito real que possa ser corrigido com TDD.

Priorize uma regra simples, preferencialmente equivalente à selecionada no Cenário A.

Possíveis candidatos:

- Validação de datas;
- Verificação de horários;
- Conflito entre agendamentos;
- Limite de observações;
- Atualização sem conflito consigo mesmo.

Não presumir que esses comportamentos estejam incorretos.

Se não houver lacuna real, não alterar o contrato para criar uma necessidade artificial. Nesse caso, analise os ciclos TDD históricos já disponíveis e informe a impossibilidade de demonstrar um novo ciclo RED genuíno sem mudança legítima.

### 4. RESPEITO AO OPENSPEC

Antes de implementar:

1. Identifique o requisito correspondente na specification.
2. Verifique o critério de aceitação existente.
3. Identifique a tarefa OpenSpec relacionada, quando disponível.
4. Confirme que a correção proposta está dentro do contrato aprovado.

Se o problema for uma falha de implementação de um requisito já especificado, corrija o código sem alterar desnecessariamente a specification.

Se uma mudança legítima exigir alteração de comportamento, registre-a pelo fluxo OpenSpec disponível antes da implementação.

Não alterar silenciosamente o contrato CT-OPEN-001.

Não criar uma mudança OpenSpec extensa apenas para acrescentar um teste de regressão.

### 5. APLICAÇÃO DE TDD

O processo deverá seguir:

SPEC → RED → GREEN → REFACTOR → VALIDATION.

**SPEC — Comportamento esperado**

Identifique o requisito e o critério de aceitação.

A implementação precisa respeitar o comportamento estabelecido.

**RED — Teste inicialmente falho**

1. Escreva o teste antes de corrigir ou implementar o comportamento.
2. Execute o teste.
3. Confirme que a falha corresponde ao requisito não atendido.
4. Preserve o resultado.

Não considerar uma falha artificial de ambiente como prova de TDD.

**GREEN — Implementação mínima**

1. Corrija ou implemente apenas o comportamento necessário.
2. Execute o teste.
3. Confirme que passou.
4. Execute os testes relacionados.
5. Preserve o resultado.

**REFACTOR — Melhoria localizada**

1. Examine se existe duplicação ou responsabilidade inadequada.
2. Refatore somente quando necessário.
3. Execute novamente os testes.
4. Preserve o comportamento especificado.

Caso nenhuma refatoração seja necessária, registre isso.

### 6. CLEAN ARCHITECTURE

Respeite as camadas existentes.

**Domain:** entidades e invariantes.

**Application:** casos de uso e contratos de repositório.

**Presentation:** controllers e rotas HTTP.

**Infrastructure:** SQLite e adaptadores externos.

**Main:** composição das dependências.

Não colocar SQL nos controllers.

Não colocar Express ou SQLite no domínio.

Não fazer os casos de uso dependerem do repositório SQLite concreto.

Não reorganizar toda a estrutura para uma mudança pequena.

### 7. VALIDAÇÃO FINAL

Após o ciclo TDD, execute:

1. `npm test`.
2. `npm run test:coverage`.
3. `npm run lint`.
4. `npm run format:check`.

Se o OpenSpec instalado fornecer comandos de validação adequados, valide também o artefato afetado.

Não presumir que qualquer comando OpenSpec esteja disponível sem verificar sua instalação.

Registrar:

- Teste inicialmente falho.
- Teste aprovado.
- Resultado após refatoração.
- Total de testes na validação final.
- Cobertura efetivamente reportada.
- Eventuais erros.

Não desabilitar verificações para produzir aprovação artificial.

### 8. DOCUMENTAÇÃO SIMPLES PARA O TCC

Crie ou atualize:

`docs/tcc/tdd-validation.md`

Inclua:

**Cenário:** B — OpenSpec.

**Contrato:** CT-OPEN-001.

**Requisito:** RN ou RF escolhido.

**Specification:** localização do requisito.

**Estado inicial:** comportamento ausente ou defeito real.

**RED:** teste e resultado inicial.

**GREEN:** implementação e resultado após a correção.

**REFACTOR:** melhoria efetuada ou indicação de que não foi necessária.

**Validação final:** testes, cobertura e falhas observadas.

**Evidências:** arquivos alterados e referências Git disponíveis.

**Conclusão:** breve descrição da aplicação do TDD.

O documento deve ser objetivo, sem relatório acadêmico extenso.

### 9. REGISTROS TDD EXISTENTES

O repositório possui:

`docs/tcc/tdd-cycles.csv`

Não apague os registros históricos.

Verifique se o arquivo está legível e corretamente formatado.

Se houver problema de formatação CSV, corrija apenas o formato necessário, preservando o conteúdo.

Se um novo ciclo for realizado, acrescente seu registro.

Não reclassifique automaticamente ciclos históricos como comprovados quando as evidências estiverem incompletas.

Não inventar horários, commits ou resultados RED/GREEN anteriores.

### 10. PRESERVAÇÃO DO GIT

Preserve o histórico do repositório.

Registre branch, SHA inicial e alterações preexistentes.

Não reescreva commits históricos.

Não utilize código do Cenário A para orientar esta correção.

Realize somente alterações necessárias no Cenário B.

Crie commit descritivo quando autorizado.

Não realize push sem autorização.

### 11. RESULTADO ESPERADO

Ao concluir, entregue:

1. Requisito OpenSpec selecionado.
2. Teste criado.
3. Resultado RED.
4. Implementação ou correção.
5. Resultado GREEN.
6. Resultado após REFACTOR.
7. Testes finais executados.
8. Cobertura real.
9. Arquivos modificados.
10. Registro TDD atualizado.

**Objetivo final:** demonstrar pelo menos um ciclo real de TDD, quando houver mudança legítima, preservando o CRUD, a Clean Architecture e a conformidade com o contrato OpenSpec.

Não introduza funcionalidades desnecessárias.

Não transforme essa validação em uma nova pesquisa complexa.

Inicie inspecionando a specification e os testes existentes.