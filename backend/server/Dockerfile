# =============================
# Etapa 1 - Build da aplicação
# =============================
FROM maven:3.9-eclipse-temurin-21 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo de configuração do Maven
COPY pom.xml ./

# Faz o download das dependências do Maven sem rodar os testes
RUN mvn -B -q -e -DskipTests dependency:go-offline

# Copia o código-fonte da aplicação
COPY src ./src

# Compila e empacota a aplicação (gera o .jar dentro de /target)
RUN mvn -B -DskipTests clean package


# =============================
# Etapa 2 - Imagem final (runtime)
# =============================
FROM eclipse-temurin:21-jre

# Define o diretório de trabalho da aplicação
WORKDIR /app

# Copia o arquivo .jar gerado na etapa de build
COPY --from=build /app/target/*.jar /app/app.jar

# Expõe a porta padrão do Spring Boot
EXPOSE 8080

# Define uma variável de ambiente (perfil ativo do Spring)
ENV JAVA_OPTS="-DSPRING_PROFILES_ACTIVE=default"

# Comando de inicialização da aplicação
ENTRYPOINT ["/bin/sh", "-c", "exec java $JAVA_OPTS -jar /app/app.jar"]
