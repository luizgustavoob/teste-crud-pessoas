# CRUD Pessoas

Este repositório contém os projetos utilizados na criação de uma aplicação para cadastro e manutenção de pessoas.

## Tecnologias

* [Spring Boot](https://spring.io/projects/spring-boot)
* [String Security](https://spring.io/projects/spring-security)
* [String Data JPA](https://spring.io/projects/spring-data-jpa)
* [Maven](http://maven.apache.org/)
* [H2 Database Engine](http://www.h2database.com/html/main.html)
* [Lombok](https://projectlombok.org/)
* [Swagger](https://swagger.io/)
* [Angular2+](https://angular.io/)
* [Bootstrap](https://getbootstrap.com/)
* [PrimeNG](https://www.primefaces.org/primeng/#/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)
* [Docker Hub](https://hub.docker.com/)

## Instalação

Para o correto funcionamento da aplicação, o único pré-requisito é ter o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) instalados. Tendo eles, basta obter o arquivo _docker-compose.yml_, disponível na pasta raiz deste repositório (não é necessário o download dos projetos inteiros para a instalação). Com o arquivo _docker-compose.yml_ disponível, no terminal deve-se acessar a pasta onde o _docker-compose.yml_ está presente e executar:
```
  docker-compose up
```

## Execução

Em seu navegador, digite ```http://localhost:80``` e a página inicial da aplicação será apresentada. 
Para acesso à documentação da API, digite ```http://localhost:8080/swagger-ui.html``` (caso seja solicitado um usuário e uma senha, informar _admin_ para os dois campos).
