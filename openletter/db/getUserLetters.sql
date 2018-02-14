select letters.id as letter_id, letters.title, letters.description, letters.addressed_to, letters.content, letters.author_id, letters.created_at, letters.cosigns, 
users.first_name, users.last_name, users.picture
from 
letters
join users on $1 = letters.author_id;