# -------- build stage --------
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

COPY . .
RUN chmod +x mvnw && ./mvnw -DskipTests package

# -------- run stage --------
FROM eclipse-temurin:21-jre
WORKDIR /app

# Spring Boot jar обычно в target/*.jar
COPY --from=build /app/target/*.jar /app/app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
