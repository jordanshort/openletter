update users 
set socket_id = $1
where users.id = $2;