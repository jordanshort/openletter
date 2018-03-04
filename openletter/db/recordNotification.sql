insert into notifications (user_id, creator_id, letter_id, content, n_type)
values ($1, $2, $3, $4, $5)
returning *;