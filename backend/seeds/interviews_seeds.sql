INSERT INTO Interviews (id, student, interviewer_id, appointment_id) VALUES (1, 'Yuto Yamakita', 1, 1);
INSERT INTO Interviews (id, student, interviewer_id, appointment_id) VALUES (2, 'John Travolta', 2, 8);
INSERT INTO Interviews (id, student, interviewer_id, appointment_id) VALUES (3, 'Michael Jackson', 3, 7);
INSERT INTO Interviews (id, student, interviewer_id, appointment_id) VALUES (4, 'Elvis Presley', 4, 9 );
INSERT INTO Interviews (id, student, interviewer_id, appointment_id) VALUES (5, 'King Charles III', 2, 11);
INSERT INTO Interviews (id, student, interviewer_id, appointment_id) VALUES (6, 'Beyonce', 1, 13);


-- SEQUENCE: public.Interviews_id_seq
CREATE SEQUENCE Interviews_id_seq
    INCREMENT 1
    START 7
;