echo "migrate"
npx sequelize db:migrate --migrations-path /app/migrations --url postgresql://postgres:newPassword@postgres:5432/fargo-cards
node /app/serverDist/server.js
echo "end"
