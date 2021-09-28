use registration;

create table student
  (	username	varchar(15)		primary key,
	password	varchar(15)     not null,
	firstName	varchar(15),
	lastLame	varchar(15),
    gender      char,
	dob		    date
  );

create table class
  (	department		varchar(2)     primary key,
	number	        smallint    primary key,
	description	    varchar(1000),
	instructor	    varchar(50),
	classSchedule   datetime
    primary key (department, number)
  );

create table register
  (	username	varchar(15)	    not null,
	department	varchar(2)     not null,
    number      smallint    not null,
	time        datetime,
	primary key (username, department, number)
  );

use registration;
ALTER TABLE class
MODIFY COLUMN classSchedule varchar(8);

