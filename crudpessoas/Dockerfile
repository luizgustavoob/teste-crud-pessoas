FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} crudpessoas-api.jar
ENTRYPOINT ["java","-jar","/crudpessoas-api.jar"]