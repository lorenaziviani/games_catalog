#!/bin/bash

# Script para executar todos os testes localmente
# Simula o pipeline de CI/CD

set -e

echo "🚀 Iniciando pipeline de testes local..."

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

if [ ! -f "package.json" ]; then
    print_error "package.json não encontrado. Execute este script na raiz do projeto."
    exit 1
fi

# 1. Code Quality
print_status "Verificando qualidade do código..."
echo ""

print_status "Executando ESLint..."
if npm run lint; then
    print_success "ESLint passou!"
else
    print_error "ESLint falhou!"
    exit 1
fi

print_status "Verificando formatação com Prettier..."
if npx prettier --check .; then
    print_success "Prettier passou!"
else
    print_warning "Prettier falhou! Execute 'npm run format' para corrigir."
fi

print_status "Verificando tipos TypeScript..."
if npx tsc --noEmit; then
    print_success "TypeScript check passou!"
else
    print_error "TypeScript check falhou!"
    exit 1
fi

echo ""

# 2. Unit Tests
print_status "Executando testes unitários..."
if npm run test; then
    print_success "Testes unitários passaram!"
else
    print_error "Testes unitários falharam!"
    exit 1
fi

print_status "Executando testes com cobertura..."
if npm run test:coverage; then
    print_success "Testes com cobertura passaram!"
else
    print_error "Testes com cobertura falharam!"
    exit 1
fi

echo ""

# 3. Build
print_status "Executando build..."
if npm run build; then
    print_success "Build passou!"
else
    print_error "Build falhou!"
    exit 1
fi

echo ""

# 4. E2E Tests (opcional)
read -p "Deseja executar os testes E2E? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Executando testes E2E..."

    # Iniciar servidor em background
    print_status "Iniciando servidor de preview..."
    npm run preview &
    SERVER_PID=$!

    # Aguardar servidor iniciar
    sleep 10

    # Executar testes
    if npx playwright test; then
        print_success "Testes E2E passaram!"
    else
        print_error "Testes E2E falharam!"
        kill $SERVER_PID 2>/dev/null || true
        exit 1
    fi

    # Parar servidor
    kill $SERVER_PID 2>/dev/null || true
fi

echo ""
print_success "🎉 Pipeline de testes local concluído com sucesso!"
print_status "Todos os checks passaram! ✅"

echo ""
print_status "Próximos passos:"
echo "1. Commit suas mudanças"
echo "2. Push para o repositório"
echo "3. Criar Pull Request"
echo "4. O CI/CD será executado automaticamente"
