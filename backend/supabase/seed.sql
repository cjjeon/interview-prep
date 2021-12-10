-- Write your seed script here which will be run every time the local DB is reset.

-- USERS
create table public.users (
  id uuid not null primary key, -- UUID from auth.users
  email text,
  first_name text,
  last_name text
);
comment on table public.users is 'Profile data for each user.';
comment on column public.users.id is 'References the internal Supabase Auth user.';

-- TRIGGER ON USER CREATION
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();