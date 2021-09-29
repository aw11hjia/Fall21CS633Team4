use registration;
ALTER TABLE class
MODIFY COLUMN classSchedule varchar(8);

use registration;
ALTER TABLE class
ADD COLUMN title varchar(50);

alter table student drop column lastLame;
alter table student add lastName varchar(15);