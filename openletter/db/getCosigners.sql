select cosigns.user_id, cosigns.letter_id, users.first_name, users.last_name, users.picture
from users
join cosigns on users.id = cosigns.user_id
where cosigns.letter_id = $1;