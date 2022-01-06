insert into "user" (id, email, first_name, last_name)
values ('google-oauth2|101637705751182716011', 'changjoo.jeon@commit.dev', 'Changjoo', 'Jeon');

insert into "company_description" (description, company_id, user_id)
values ('This is the company description that you should add', 1, 'google-oauth2|101637705751182716011');

insert into "company_description_role_skill" (company_description_id, role_id, skill_id)
values (1, 1, 3),
       (1, 1, 4),
       (1, 1, 5),
       (1, 1, 6),
       (1, 1, 11),
       (1, 1, 12);

insert into "company_description_role_skill" (company_description_id, role_id, skill_id)
values (1, 2, 1),
       (1, 2, 2),
       (1, 2, 11),
       (1, 2, 12);