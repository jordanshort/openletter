insert into cosigns (user_id, letter_id)
values ($1, $2)
returning *;