update users 
set 
birth_month = $1, 
birth_day = $2,
birth_year = $3,
about_me = $4, 
job = $5,
employer = $6,
first_name = $8,
last_name = $9,
email = $10
where id = $7
returning *;