insert into notifications (user_id, creator_id, letter_id, content)
values ($1, $2, $3, $4)
returning *;