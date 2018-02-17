select friends.user_id as id, users.first_name, users.last_name, users.picture
from 
users
join friends on friends.user_id = users.id 
where friends.following_id = $1;