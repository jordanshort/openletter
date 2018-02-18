select friends.following_id as id, users.first_name, users.last_name, users.picture
from friends
join
users on users.id = friends.following_id
where friends.user_id = (select following_id from friends where user_id = $1);
