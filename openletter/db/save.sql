insert into saved (letter_id, user_id)
values ($1, $2)
returning *;