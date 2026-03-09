DELETE FROM guests;

INSERT INTO guests (id, first_name, last_name, phone_number, rsvp, message, partner_id, dietary_requirements)
VALUES ('00000000-0000-0000-0000-000000000001', 'John', 'Smith', '07123456789', NULL, NULL, NULL, NULL);

INSERT INTO guests (id, first_name, last_name, phone_number, rsvp, message, partner_id, dietary_requirements)
VALUES ('00000000-0000-0000-0000-000000000002', 'Jane', 'Smith', '07123456781', NULL, NULL, '00000000-0000-0000-0000-000000000001', NULL);

UPDATE guests SET partner_id = '00000000-0000-0000-0000-000000000002' WHERE id = '00000000-0000-0000-0000-000000000001';
