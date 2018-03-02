select letters.id as letter_id, letters.title, count(cosigns.letter_id) as cosigns_total, letters.addressed_to, letters.created_at
from 
letters
join cosigns on cosigns.letter_id = letters.id
-- where letters.created_at >= NOW() - '1 day'::INTERVAL
group by letters.id, letters.title
order by cosigns_total desc
limit 10;