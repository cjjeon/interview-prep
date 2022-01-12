create table "user"
(
    id         text not null primary key, -- UUID from auth.users
    email      text not null,
    first_name text not null,
    last_name  text not null
);


create table company
(
    id         bigint generated by default as identity
        constraint company_pk
            primary key,
    created_at timestamp with time zone default now(),
    name       varchar not null
);


create table company_description
(
    id          bigint generated by default as identity
        constraint company_description_pk
            primary key,
    created_at  timestamp with time zone default now(),
    description varchar not null,
    company_id  bigint  not null
        constraint company_description_company_id_fk
            references company,
    user_id     text    not null
        constraint company_description_user_id_fk
            references "user",
    UNIQUE (company_id, user_id)
);

create table role
(
    id         bigint generated by default as identity
        constraint role_pk
            primary key,
    created_at timestamp with time zone default now(),
    name       varchar not null
);

create table skill
(
    id         bigint generated by default as identity
        constraint skill_pk
            primary key,
    created_at timestamp with time zone default now(),
    name       varchar not null
);


create table company_description_role_skill
(
    id                     bigint generated by default as identity
        constraint company_description_role_skill_pk
            primary key,
    company_description_id bigint not null
        constraint company_description_role_company_description_id_fk
            references company,
    role_id                bigint not null
        constraint role_skill_role_id_fk
            references role,
    skill_id               bigint not null
        constraint role_skill_skill_id_fk
            references skill,
    UNIQUE (company_description_id, role_id, skill_id)
);


create table experience
(
    id         bigint generated by default as identity
        constraint experience_pk
            primary key,
    created_at timestamp with time zone default now(),
    summary    varchar not null,
    situation  text    not null,
    action     text    not null,
    outcome    text    not null,
    user_id    text    not null
        constraint experience_user_id_fk
            references "user"
);

create table experience_skill
(
    id            bigint generated by default as identity
        constraint experience_skill_pk
            primary key,
    experience_id bigint not null
        constraint experience_skill_experience_id_fk
            references experience,
    skill_id      bigint not null
        constraint experience_skill_skill_id_fk
            references skill,
    UNIQUE (experience_id, skill_id)
);

create type interview_question_t as enum ('BEHAVIOURAL', 'TECHNICAL');

create table interview_question
(
    id       bigint generated by default as identity
        constraint interview_question_pk
            primary key,
    question varchar              not null,
    tip      varchar              not null,
    type     interview_question_t not null
);

create table interview_question_user_history
(
    id                     bigint generated by default as identity
        constraint interview_question_user_history_pk
            primary key,
    user_id                text          not null
        constraint interview_question_user_history_user_id_fk
            references "user",
    interview_question_id  bigint        not null
        constraint interview_question_user_history_interview_question_id_fk
            references "interview_question",
    company_description_id bigint        not null
        constraint company_description_role_company_description_id_fk
            references company,
    role_id                bigint        not null
        constraint role_skill_role_id_fk
            references role,
    communication_score    int default 2 not null,
    confidence_score       int default 2 not null,
    positivity_score       int default 2 not null,
    video_location         text          not null
)