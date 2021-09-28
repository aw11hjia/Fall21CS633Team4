use registration;

create table student
  (	username	varchar     primary key,
	password	varchar     not null,
	firstName	varchar,
	lastLame	varchar,
    gender      varchar,
	dob		    date
  );

create table class
  (	department		varchar     primary key,
	number	        smallint    primary key,
	description	    varchar,
	instructor	    varchar,
	classSchedule   datetime
  );

create table register
  (	username	varchar	    not null,
	department	varchar     not null,
    number      smallint    not null,
	time        datetime,
	primary key (username, department, number),
	foreign key (username) references student(username),
	foreign key (department) references class(department),
    foreign key (number) references class(number)
  );


