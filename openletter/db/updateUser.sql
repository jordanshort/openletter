update users 
set 
birth_month = $1, 
birth_day = $2,
birth_year = $3,
about_me = $4, 
job = $5,
employer = $6
where id = $7
returning *;