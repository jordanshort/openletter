update users 
set picture = $1 
where id = $2
returning *;