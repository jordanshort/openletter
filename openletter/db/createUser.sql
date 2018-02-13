insert into users 
(first_name, last_name, picture, gender, email, sub)
values ($1, $2, $3, $4, $5, $6)
returning *;