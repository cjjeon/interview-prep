create table "user"
(
  id text not null primary key, -- UUID from auth.users
  email text not null,
  first_name text not null,
  last_name text not null
);


create table company
(
    id         bigint generated by default as identity
        constraint company_pk
            primary key,
    created_at timestamp with time zone default now(),
    name       varchar not null
);


create table company_description(
	id bigint generated by default as identity
		constraint company_description_pk
			primary key,
	created_at timestamp with time zone default now(),
	description varchar not null,
	company_id bigint not null
	    constraint company_description_company_id_fk
	        references company,
	user_id text not null
		constraint company_description_users_id_fk
			references "user"
);

create table role
(
    id         bigint generated by default as identity
        constraint role_pk
            primary key,
    created_at timestamp with time zone default now(),
    name       varchar not null
);


create table skill(
	id bigint generated by default as identity
		constraint skill_pk
			primary key,
	created_at timestamp with time zone default now(),
	name varchar not null
);


create table role_skill(
    role_id bigint not null
	    constraint role_skill_role_id_fk
	        references role,
    skill_id bigint not null
	    constraint role_skill_skill_id_fk
	        references skill,
    company_id bigint not null
        constraint role_skill_company_id_fk
            references company
)