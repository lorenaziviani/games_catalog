# Pipeline de CI/CD

Este documento descreve o pipeline de CI/CD configurado para o projeto Heroes Catalog.

## Workflows Disponíveis

### 1. CI/CD Pipeline Principal (`ci-cd.yml`)

O workflow principal inclui:

#### Jobs:

- **Code Quality**: Verificação de linting, formatação e type checking
- **Unit Tests**: Execução de testes unitários com cobertura
- **Build**: Compilação da aplicação
- **E2E Tests**: Testes end-to-end com Playwright
- **Deploy**: Deploy automático para GitHub Pages (apenas main/master)

#### Triggers:

- Push para `main`, `master`, `develop`
- Pull requests para `main`, `master`, `develop`

### 2. Security & Dependencies (`security.yml`)

Verificações de segurança e dependências:

#### Jobs:

- **Security Audit**: Verificação de vulnerabilidades com `npm audit`
- **Dependency Review**: Análise de dependências com GitHub Actions

#### Triggers:

- Push/PR para `main`, `master`, `develop`
- Execução semanal (domingo às 2h)

### 3. Performance & Bundle Analysis (`performance.yml`)

Análise de performance e bundle:

#### Jobs:

- **Bundle Analysis**: Análise do bundle da aplicação
- **Lighthouse Performance**: Testes de performance com Lighthouse CI

#### Triggers:

- Push/PR para `main`, `master`

### 4. Playwright Tests (`playwright.yml`)

Testes E2E dedicados:

#### Jobs:

- **Playwright E2E Tests**: Testes end-to-end com Playwright

#### Triggers:

- Push/PR para `main`, `master`, `develop`

## Configuração de Secrets

Para funcionamento completo, configure os seguintes secrets no GitHub:

### Obrigatórios:

- `GITHUB_TOKEN`: Token padrão do GitHub (automático)

### Opcionais:

- `CODECOV_TOKEN`: Token do Codecov para upload de cobertura
- `CNAME`: Domínio customizado para GitHub Pages
- `LHCI_GITHUB_APP_TOKEN`: Token do Lighthouse CI

## Como Configurar

### 1. Ativar GitHub Pages

1. Vá para Settings > Pages
2. Configure a source como "GitHub Actions"

### 2. Configurar Secrets

1. Vá para Settings > Secrets and variables > Actions
2. Adicione os secrets necessários

### 3. Configurar Branch Protection (Recomendado)

1. Vá para Settings > Branches
2. Configure branch protection rules para `main`/`master`
3. Habilite:
   - Require status checks to pass before merging
   - Require branches to be up to date before merging

## Fluxo de Desenvolvimento

### Para Desenvolvedores:

1. **Criar Feature Branch**:

   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

2. **Desenvolver e Testar Localmente**:

   ```bash
   npm run test          # Testes unitários
   npm run test:coverage # Testes com cobertura
   npm run lint          # Verificação de código
   npm run build         # Build local
   ```

3. **Commit e Push**:

   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade"
   git push origin feature/nova-funcionalidade
   ```

4. **Criar Pull Request**:
   - O CI/CD será executado automaticamente
   - Aguarde todos os checks passarem
   - Solicite review se necessário

### Para Merge:

- Todos os jobs devem passar
- Cobertura de testes deve estar adequada
- Performance deve estar dentro dos limites
- Não deve haver vulnerabilidades críticas

## Monitoramento

### Artifacts Disponíveis:

- **coverage-report**: Relatório de cobertura de testes
- **build-files**: Arquivos de build
- **playwright-report**: Relatório dos testes E2E
- **playwright-screenshots**: Screenshots de falhas E2E
- **build-analysis**: Análise do bundle

### Métricas Importantes:

- **Cobertura de Testes**: Mínimo 80%
- **Performance**: Score mínimo 0.8 no Lighthouse
- **Acessibilidade**: Score mínimo 0.9 no Lighthouse
- **Build Time**: Máximo 10 minutos
- **Test Time**: Máximo 30 minutos

## Troubleshooting

### Problemas Comuns:

1. **Build Falhando**:
   - Verifique erros de TypeScript
   - Verifique dependências faltando
   - Verifique configuração do Vite

2. **Testes Falhando**:
   - Verifique se os testes passam localmente
   - Verifique configuração do Jest
   - Verifique mocks e setup

3. **Playwright Falhando**:
   - Verifique se a aplicação inicia corretamente
   - Verifique configuração do Playwright
   - Verifique selectors dos elementos

4. **Performance Baixa**:
   - Analise o bundle size
   - Verifique lazy loading
   - Otimize imports

### Logs e Debug:

- Todos os logs estão disponíveis na aba Actions do GitHub
- Artifacts podem ser baixados para análise local
- Screenshots de falhas E2E são salvos automaticamente

## Melhorias Futuras

### Possíveis Adições:

1. **Testes de Integração**: Com banco de dados real
2. **Testes de Regressão Visual**: Com Percy ou Chromatic
3. **Análise de Código**: Com SonarQube
4. **Deploy Staging**: Ambiente de homologação
5. **Rollback Automático**: Em caso de falhas em produção
6. **Notificações**: Slack/Discord para falhas críticas
7. **Métricas de Performance**: Com Web Vitals
8. **Análise de Bundle**: Com webpack-bundle-analyzer

### Otimizações:

1. **Cache de Dependências**: Melhorar tempo de build
2. **Paralelização**: Executar jobs em paralelo
3. **Docker**: Containerização para consistência
4. **Self-hosted Runners**: Para builds mais rápidos
