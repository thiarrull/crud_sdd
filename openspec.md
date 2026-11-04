# Contrato OpenSpec Consolidado — CRUD de Agendamentos (TCC Cenário B)

## 1. Proposta da Mudança (`proposal.md`)

### 1.1 Objetivo

Implementar um sistema monolítico de agendamentos (`Appointment`) robusto, testável e aderente aos princípios da Clean Architecture, seguindo estritamente o fluxo de desenvolvimento guiado por especificações (Spec-Driven Development) do OpenSpec para o TCC.

### 1.2 Escopo

* Criação, listagem, visualização, edição e exclusão de agendamentos.

* Validação estrita das regras de negócio (RN-001 a RN-010).

* Persistência em SQLite com restrição `UNIQUE` para data e horário.

* Interface web com Express, EJS e CSS puro.

* Suíte de testes automatizados (`node:test`, `node:assert/strict` e Supertest) com cobertura nativa.

### 1.3 Stack Tecnológica

* Node.js (versão 24)

* JavaScript puro com CommonJS

* Express & EJS

* SQLite com `better-sqlite3`

* Ferramentas de apoio: `dotenv`, `helmet`, `nodemon`, `supertest`, `eslint`, `prettier`

### 1.4 Riscos e Mitigações

* **Risco:** Divergência entre regras temporais locais e UTC.

  * **Mitigação:** Padronizar fuso horário para `America/Sao_Paulo` e isolar o relógio nos testes.

* **Risco:** Conflitos de agendamento concorrentes.

  * **Mitigação:** Utilizar restrição `UNIQUE(appointment_date, appointment_time)` no banco de dados SQLite e validação prévia no caso de uso.

## 2. Especificação Funcional e Requisitos (`spec.md`)

### 2.1 Requisitos Normativos e Critérios de Aceitação

#### RN-001 — Nome do Cliente Obrigatório

O campo `clientName` é obrigatório e deve ser submetido com `trim()`. Não pode ser vazio ou conter apenas espaços em branco.

* **GIVEN** que o usuário preenche o formulário de agendamento

* **WHEN** o campo `clientName` estiver vazio ou preenchido apenas com espaços

* **THEN** o sistema deve rejeitar a operação e retornar um erro de validação (`ValidationError`).

#### RN-002 — Serviço Obrigatório

O campo `service` é obrigatório e deve ser submetido com `trim()`.

* **GIVEN** que o usuário submete um agendamento

* **WHEN** o campo `service` estiver ausente ou vazio

* **THEN** o sistema deve rejeitar a operação com erro de validação.

#### RN-003 & RN-004 — Data e Horário Obrigatórios

Os campos `appointmentDate` e `appointmentTime` são obrigatórios para qualquer agendamento.

* **GIVEN** uma tentativa de criar ou atualizar um agendamento

* **WHEN** `appointmentDate` ou `appointmentTime` não forem fornecidos

* **THEN** o sistema deve recusar a requisição com código HTTP 400.

#### RN-005 — Validação de Data no Calendário

A data deve estar no formato `YYYY-MM-DD` e corresponder a uma existência real no calendário gregoriano.

* **GIVEN** uma data informada como `2026-02-30`

* **WHEN** o sistema valida a data

* **THEN** a validação deve falhar, pois o dia 30 de fevereiro não existe.

#### RN-006 — Validação de Horário

O horário deve estar no formato `HH:mm`, estritamente entre `00:00` e `23:59`.

* **GIVEN** um horário informado como `24:05` ou `12:60`

* **WHEN** o sistema valida o horário

* **THEN** a operação deve ser rejeitada.

#### RN-007 — Proibir Agendamento no Passado

É proibido criar ou atualizar um agendamento para uma data e horário anteriores ao momento atual (considerando o fuso `America/Sao_Paulo`).

* **GIVEN** que o horário atual do sistema é `2026-06-01 14:00`

* **WHEN** o usuário tenta agendar para `2026-06-01 13:59` ou uma data anterior

* **THEN** o sistema deve lançar um erro de validação impedindo a criação.

#### RN-008 & RN-009 — Conflito de Data e Horário (Excluindo o Próprio ID na Edição)

O sistema deve proibir o agendamento de dois atendimentos na mesma data e horário. Na edição, o próprio ID do agendamento deve ser desconsiderado na verificação de conflito.

* **GIVEN** que já existe um agendamento em `2026-06-10` às `10:00`

* **WHEN** um novo agendamento é tentado para o mesmo dia e horário

* **THEN** o sistema deve retornar um erro de conflito (`AppointmentConflictError`, HTTP 409).

* **AND WHEN** o agendamento original for editado mantendo sua própria data e horário

* **THEN** a atualização deve ser permitida com sucesso.

#### RN-010 — Observações Opcionais com Limite

O campo `notes` é opcional, mas se fornecido, deve ter no máximo 500 caracteres.

* **GIVEN** observações com mais de 500 caracteres

* **WHEN** o agendamento é submetido

* **THEN** o sistema deve rejeitar a operação por exceder o limite.

### 2.2 Requisitos Complementares

* **IDs e Timestamps:** Utilização de UUIDs para identificação. `createdAt` e `updatedAt` em formato ISO 8601. Na edição, `createdAt` deve ser preservado e `updatedAt` atualizado.

* **Tratamento de Erros HTTP:** `ValidationError` (400), `AppointmentNotFoundError` (404), `AppointmentConflictError` (409), e falhas inesperadas (500).

## 3. Design Arquitetural (`design.md`)

### 3.1 Estrutura de Camadas (Clean Architecture)

```
src/
├── domain/                  # Entidades de Domínio (Invariantes puras)
│   └── Appointment.js
├── application/             # Casos de Uso e Contratos de Repositório
│   ├── repositories/
│   │   └── AppointmentRepository.js
│   └── use-cases/
│       ├── CreateAppointment.js
│       ├── GetAppointment.js
│       ├── ListAppointments.js
│       ├── UpdateAppointment.js
│       └── DeleteAppointment.js
├── infrastructure/          # Detalhes externos (Banco de Dados, Persistência)
│   ├── database/
│   │   ├── database.js
│   │   └── schema.sql
│   └── repositories/
│       └── SQLiteAppointmentRepository.js
├── presentation/            # Controladores, Rotas e Middlewares HTTP
│   ├── controllers/
│   │   └── AppointmentController.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   └── routes/
│       └── appointmentRoutes.js
└── main/                    # Composição de Dependências e Inicialização
    ├── app.js
    ├── server.js
    └── compositionRoot.js

```

### 3.2 Descrição dos Componentes

* **Domain (`Appointment.js`):** Valida as invariantes puras de negócio sem acoplamento com frameworks ou banco de dados.

* **Application:** Contém a lógica de negócio orquestrada por casos de uso puros que dependem exclusivamente de interfaces de repositório.

* **Infrastructure:** Implementa o `SQLiteAppointmentRepository` utilizando `better-sqlite3` com consultas parametrizadas e restrição `UNIQUE`.

* **Presentation:** Controladores Express que recebem requisições HTTP, acionam os casos de uso e renderizam views EJS ou retornam status padronizados.

* **Main:** Centraliza a injeção manual de dependências (`compositionRoot.js`), garantindo o respeito estrito à Regra de Dependência (*Dependency Rule*).

## 4. Plano de Tarefas (`tasks.md`)

* \[ \] **Tarefa 1: Configuração do Ambiente e Banco de Dados**

  * \[ \] Criar estrutura de diretórios da Clean Architecture.

  * \[ \] Configurar conexão SQLite e script de schema (`schema.sql`) com restrição `UNIQUE(appointment_date, appointment_time)`.

  * \[ \] Categoria: Infraestrutura / Configuração.

* \[ \] **Tarefa 2: Implementação da Entidade de Domínio**

  * \[ \] Desenvolver `src/domain/Appointment.js` aplicando as regras de validação básica (`RN-001` a `RN-007`, `RN-010`).

  * \[ \] Criar testes unitários para a entidade.

* \[ \] **Tarefa 3: Implementação dos Casos de Uso e Repositório**

  * \[ \] Definir o contrato `AppointmentRepository.js`.

  * \[ \] Implementar `SQLiteAppointmentRepository.js`.

  * \[ \] Implementar os 5 casos de uso na camada Application (`Create`, `Get`, `List`, `Update`, `Delete`), incorporando verificação de conflitos (`RN-008`, `RN-009`).

  * \[ \] Criar testes unitários para os casos de uso.

* \[ \] **Tarefa 4: Implementação da Camada de Apresentação e Rotas**

  * \[ \] Criar controladores Express, middlewares de tratamento de erros e rotas web com EJS.

  * \[ \] Configurar views EJS para listagem, formulários de criação/edição e detalhes.

* \[ \] **Tarefa 5: Composição e Inicialização (Main)**

  * \[ \] Implementar o `compositionRoot.js`, `app.js` e `server.js`.

* \[ \] **Tarefa 6: Testes de Integração, HTTP e Cobertura**

  * \[ \] Implementar testes de integração e testes HTTP (`supertest`).

  * \[ \] Executar suíte de testes e gerar relatório de cobertura nativa do Node.js.

* \[ \] **Tarefa 7: Configuração de CI (GitHub Actions)**

  * \[ \] Criar `.github/workflows/ci.yml` integrando testes, lint e formatação.