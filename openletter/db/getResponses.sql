select responses.id as response_id, responses.content, responses.created_at, responses.author_id, responses.letter_id,
users.first_name, users.last_name, users.picture
from users 
join responses on responses.author_id = users.id 
where responses.letter_id = $1;