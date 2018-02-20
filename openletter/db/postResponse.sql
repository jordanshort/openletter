insert into responses (content, letter_id, author_id) 
values ($2, $1, $3)
returning *;