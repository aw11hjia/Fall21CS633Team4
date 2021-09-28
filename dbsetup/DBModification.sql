use registration;
ALTER TABLE class
MODIFY COLUMN classSchedule varchar(8);

use registration;
ALTER TABLE class
ADD COLUMN title varchar(50);
