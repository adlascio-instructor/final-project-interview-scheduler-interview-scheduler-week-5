CREATE DATABASE InterviewScheduler;

--tables

CREATE TABLE Appointments
(id  integer primary key not null,     --: Unique value for each appointment
time varchar(20) not null,             --: Time of the appointment (You can set as string)
day_id integer not null                --: Id of the day of the appointment
);

 
CREATE TABLE Day
(
id   integer primary key not null,    --: Unique value for each day
name  varchar(20) 	         --: Name of the day (Monday to Friday)
);	
	
	
CREATE TABLE Interviews
(
id  integer primary key not null, --: Unique value for each interview
student  varchar(100) not null,   --: Name of the student
interviewer_id  integer not null, --: Id of the interviewer
appointment_id  integer not null  --: Id of the appointment
);

	
CREATE TABLE Interviewers
(
id integer primary key not null, --: Unique value for each interviewer
name    varchar(100) not null,   --: Name of the interviewer
avatar  varchar(150) null        --: Url of the interviewer's avatar
);
	
	
CREATE TABLE Available_Interviewers
(
id  integer primary key not null,  --: Unique value for each available interviewer
interviewer_id   integer not null, --: Id of the interviewer
day_id  integer not null          --: Id of the DAY
);	
	