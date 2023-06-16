# Para crear un archivo de migración

npx sequelize-cli migration:generate --name create_task_table

# Para crear e iniciar el contenedor

docker-compose --env-file .env up -d
