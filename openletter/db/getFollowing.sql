select friends.following_id as id, users.first_name, users.last_name, users.picture
from 
users
join friends on friends.following_id = users.id 
where friends.user_id = $1;