select users.socket_id
from users 
join letters on letters.author_id = users.id 
where letters.id = $1;