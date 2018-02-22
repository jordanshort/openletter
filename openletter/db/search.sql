select letter_id, title, description, addressed_to, content, author_id, cosign_total, responses_total, created_at, first_name, last_name, picture from 
(select letters.id as letter_id, letters.title as title, letters.description as description, letters.addressed_to as addressed_to, letters.content as content, letters.author_id as author_id, 
count(cosigns.letter_id) as cosign_total, count(distinct responses.letter_id) as responses_total,
letters.created_at as created_at, 
users.first_name as first_name, users.last_name as last_name, users.picture as picture,
concat(to_tsvector(users.first_name), ' ',
to_tsvector(users.last_name), ' ',
to_tsvector(letters.title), ' ',
to_tsvector(letters.addressed_to), ' ',
to_tsvector(letters.description), ' ',
to_tsvector(letters.content), ' ') as document
from letters
join users on users.id = letters.author_id 
left join cosigns on cosigns.letter_id = letters.id
left join responses on responses.letter_id = letters.id
group by letters.id, letters.title, letters.description, letters.addressed_to, letters.content, letters.author_id, letters.created_at, users.first_name, users.last_name, users.picture)
l_search
where l_search.document @@ to_tsquery($1 & $2 & $3 & $4 & $5 & $6 & $7 & $9 & $10);