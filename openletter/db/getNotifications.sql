select notifications.id, notifications.creator_id, users.first_name, users.last_name,
users.picture, notifications.letter_id, notifications.content, notifications.seen, notifications.n_type
from 
notifications
join users on users.id = notifications.creator_id
where notifications.user_id = 1 and 
notifications.created_at >= now() - '2 days'::interval;
