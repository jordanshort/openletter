select letters.id as letter_id, letters.title, letters.description, letters.addressed_to, letters.content, letters.author_id, letters.created_at, letters.cosigns, 
users.first_name, users.last_name, users.picture
from 
letters
join users on users.id = letters.author_id
where letters.id = $1;