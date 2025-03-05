# API Golden Raspberry Awards

Teste para processo seletivo na empresa Outsera.

## Requisitos:

- Ler o arquivo CSV dos filmes e inserir os dados em uma base de dados ao iniciar a
aplicação

- Obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que
obteve dois prêmios mais rápido.

## Requisitos não funcionais:
* Web Service RESTful com base no nível 2 de maturidade de Richardson
* Teste de integração, garantindo que os dados obtidos estão de acordo com os dados fornecidos na proposta
* Banco de dados em memória

## Instalação
Projeto desenvolvido na versão 22.14.0 do NodeJS

```bash
npm install
```

## Rodando a aplicação

```
npm start
```
## Modo de desenvolvimento
```
npm run local
```
## Modo de produção
Configurar o arquivo .env com a variável ENVIRONMENT para produção
```
ENVIRONMENT=production
```
## Executar testes de integração
```
npm run test
```

## Abordagem
- Carga inicial do csv de filmes através da execução de migrations, utilizando typeorm
- Endpoint para obter produtores com o menor e maior intervalo entre prêmios consecutivos, na seguinte rota:
  [/producers/winners/intervals]()
- Banco em memória foi utilizado o sqlite
 