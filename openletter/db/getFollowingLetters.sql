select letters.id as letter_id, letters.title, letters.description, letters.addressed_to, letters.content, letters.author_id,
count(cosigns.letter_id) as cosign_total, count(distinct responses.letter_id) as responses_total,
letters.created_at, letters.cosigns, 
users.first_name, users.last_name, users.picture
from 
letters
join users on users.id = letters.author_id
left join cosigns on letters.id = cosigns.letter_id
left join responses on responses.letter_id = letters.id
where users.id in (select following_id from friends where user_id = $1)
group by letters.id, letters.title, letters.description, letters.addressed_to, 
letters.content, letters.author_id, letters.created_at, letters.cosigns, users.first_name, users.last_name, users.picture;






       

