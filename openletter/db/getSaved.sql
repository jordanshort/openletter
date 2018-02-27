select letters.id as letter_id, letters.title, letters.description, letters.addressed_to, letters.content, letters.author_id, 
(select count(letter_id) from cosigns where cosigns.letter_id = letters.id) as cosign_total, 
(select count(letter_id) from responses where responses.letter_id = letters.id) as responses_total,
letters.created_at, letters.cosigns, 
users.first_name, users.last_name, users.picture
from 
letters
join users on users.id = letters.author_id
left join cosigns on letters.id = cosigns.letter_id
left join responses on letters.id = responses.letter_id
where letters.id in (select letter_id from saved where user_id = $1)
group by letters.id, letters.title, letters.description, letters.addressed_to, letters.content, letters.author_id, letters.created_at, letters.cosigns, users.first_name, users.last_name, users.picture;






       

