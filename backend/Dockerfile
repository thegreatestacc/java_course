# -------- build stage --------
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

COPY . .
RUN chmod +x mvnw && ./mvnw -DskipTests package

# -------- run stage --------
FROM eclipse-temurin:17-jdk

RUN apt-get update \
 && apt-get install -y --no-install-recommends curl \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /app/target/*.jar /app/app.jar

# Используем production профиль по умолчанию
ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8080
# Оптимизированные настройки JVM для ограниченных ресурсов
# -Xmx512m: максимальная heap память 512MB
# -Xms256m: начальная heap память 256MB
# -XX:+UseG1GC: использовать G1 garbage collector (лучше для ограниченной памяти)
# -XX:MaxGCPauseMillis=200: максимальная пауза GC 200ms
# -XX:+UseContainerSupport: использовать ограничения контейнера
# -XX:MaxRAMPercentage=75.0: использовать максимум 75% доступной памяти контейнера
ENTRYPOINT ["java","-Xmx512m","-Xms256m","-XX:+UseG1GC","-XX:MaxGCPauseMillis=200","-XX:+UseContainerSupport","-XX:MaxRAMPercentage=75.0","-jar","/app/app.jar"]
