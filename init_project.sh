#!/bin/bash

# Criando a estrutura para o Backend (Spring Boot)
mkdir -p backend/src/main/java/com/vibe/waste/controller
mkdir -p backend/src/main/java/com/vibe/waste/model
mkdir -p backend/src/main/java/com/vibe/waste/repository
mkdir -p backend/src/main/java/com/vibe/waste/service
mkdir -p backend/src/main/resources

# Criando a estrutura para o Frontend (Flutter)
mkdir -p frontend/lib/models
mkdir -p frontend/lib/screens
mkdir -p frontend/lib/services
mkdir -p frontend/lib/widgets
mkdir -p frontend/assets/images

# Pasta para scripts de infra e DB (Docker/Mongo)
mkdir -p infra/mongodb/scripts

# Pasta para documentação e requisitos
mkdir -p docs

echo "🚀 Estrutura 'OrganicVibe' gerada com sucesso!"
ls -R | grep ":$" | sed -e 's/:$//' -e 's/[^-][^\/]*\//--/g' -e 's/^/   /'
