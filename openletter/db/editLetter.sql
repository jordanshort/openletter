update letters 
set 
title = $1,
description = $2,
addressed_to = $3,
content = $4
where id = $5
returning *;
