DELETE FROM guests;

INSERT INTO guests (id, first_name, last_name, phone_number, rsvp, message, partner_id, dietary_requirements, can_add_plus_one, plus_one_of)
VALUES ('00000000-0000-0000-0000-000000000001', 'John', 'Smith', '07123456789', NULL, NULL, NULL, NULL, false, NULL);

INSERT INTO guests (id, first_name, last_name, phone_number, rsvp, message, partner_id, dietary_requirements, can_add_plus_one, plus_one_of)
VALUES ('00000000-0000-0000-0000-000000000002', 'Jane', 'Smith', '07123456781', NULL, NULL, '00000000-0000-0000-0000-000000000001', NULL, false, NULL);

UPDATE guests SET partner_id = '00000000-0000-0000-0000-000000000002' WHERE id = '00000000-0000-0000-0000-000000000001';

INSERT INTO guests (id, first_name, last_name, phone_number, rsvp, message, partner_id, dietary_requirements, can_add_plus_one, plus_one_of)
VALUES ('00000000-0000-0000-0000-000000000003', 'Joe', 'Blogs', '07123456782', NULL, NULL, NULL, NULL, true, NULL);
