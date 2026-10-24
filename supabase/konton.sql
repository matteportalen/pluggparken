-- Pluggparken: konton med användarnamn och kod (okt 2026).
-- Klistra in allt i Supabase → SQL Editor och tryck Run. Går att köra flera gånger.
-- Ingen kan läsa tabellen direkt: allt går via funktionerna nedan, som kräver rätt namn och kod.
-- Inga riktiga namn och ingen e-post sparas, bara ett påhittat namn (t.ex. "katt-317"), koden (krypterad) och framstegen.
-- Funktionerna svarar alltid med json: {"ok":true,...} eller {"fel":"kod"|"sparrad"|"stor"}.
-- (Ett fel som kastas skulle ångra räkningen av felaktiga försök, därför används inga undantag för fel kod.)

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.konton (
  namn        text primary key,
  kod         text not null,                 -- bcrypt, aldrig koden i klartext
  data        jsonb not null default '{}'::jsonb,
  skapad      timestamptz not null default now(),
  uppdaterad  timestamptz not null default now(),
  fel         int not null default 0,        -- felaktiga försök i rad
  feltid      timestamptz
);
alter table public.konton enable row level security;
-- inga policies: anon och authenticated kommer inte åt tabellen direkt
revoke all on public.konton from anon, authenticated;

-- kontroll av namn och kod, spärr i 15 minuter efter 5 fel i rad. Returnerar namnet eller ett felord.
create or replace function public.pp_kontroll(p_namn text, p_kod text)
returns text language plpgsql security definer set search_path = public, extensions as $$
declare k public.konton;
begin
  select * into k from public.konton where namn = lower(trim(p_namn));
  if not found then return '!kod'; end if;
  if k.fel >= 5 and k.feltid > now() - interval '15 minutes' then return '!sparrad'; end if;
  if k.kod <> extensions.crypt(coalesce(p_kod,''), k.kod) then
    update public.konton set fel = case when feltid is null or feltid < now() - interval '15 minutes' then 1 else fel + 1 end, feltid = now()
      where namn = k.namn;
    return '!kod';
  end if;
  if k.fel > 0 then update public.konton set fel = 0 where namn = k.namn; end if;
  return k.namn;
end $$;
revoke all on function public.pp_kontroll(text, text) from public, anon, authenticated;

-- skapa ett konto: servern väljer namn och kod och returnerar dem
create or replace function public.pp_skapa(p_data jsonb)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare
  djur text[] := array['katt','hund','uggla','panda','lejon','tiger','zebra','groda','haj','val','orm','mus','varg','ren','falk',
    'pingvin','delfin','koala','apa','kanin','igelkott','ekorre','krokodil','giraff','flamingo','papegoja','myra','humla','hare','lodjur',
    'mullvad','pelikan','hamster','ponny','kamel','noshorn','struts','kanguru','tukan','bison'];
  n text; kod text; i int := 0;
begin
  if p_data is null or octet_length(p_data::text) > 300000 then return json_build_object('fel','stor'); end if;
  loop
    n := djur[1 + floor(random() * array_length(djur, 1))::int] || '-' || (100 + floor(random() * 900))::int;
    exit when not exists (select 1 from public.konton where namn = n);
    i := i + 1; if i > 60 then return json_build_object('fel','fullt'); end if;
  end loop;
  kod := lpad((floor(random() * 1000000))::int::text, 6, '0');
  insert into public.konton(namn, kod, data) values (n, extensions.crypt(kod, extensions.gen_salt('bf', 8)), p_data);
  return json_build_object('ok', true, 'namn', n, 'kod', kod);
end $$;

-- hämta framstegen
create or replace function public.pp_hamta(p_namn text, p_kod text)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare n text := public.pp_kontroll(p_namn, p_kod);
begin
  if left(n,1) = '!' then return json_build_object('fel', substr(n,2)); end if;
  return json_build_object('ok', true, 'namn', n, 'data', (select data from public.konton where namn = n));
end $$;

-- spara framstegen (sidan slår ihop först, så att inget försvinner)
create or replace function public.pp_spara(p_namn text, p_kod text, p_data jsonb)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare n text;
begin
  if p_data is null or octet_length(p_data::text) > 300000 then return json_build_object('fel','stor'); end if;
  n := public.pp_kontroll(p_namn, p_kod);
  if left(n,1) = '!' then return json_build_object('fel', substr(n,2)); end if;
  update public.konton set data = p_data, uppdaterad = now() where namn = n;
  return json_build_object('ok', true);
end $$;

-- radera kontot för gott
create or replace function public.pp_radera(p_namn text, p_kod text)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare n text := public.pp_kontroll(p_namn, p_kod);
begin
  if left(n,1) = '!' then return json_build_object('fel', substr(n,2)); end if;
  delete from public.konton where namn = n;
  return json_build_object('ok', true);
end $$;

-- liten fråga som GitHub skickar var tredje dag så att gratisprojektet inte pausas
create or replace function public.pp_ping()
returns int language sql security definer set search_path = public as $$ select 1 $$;

revoke all on function public.pp_skapa(jsonb), public.pp_hamta(text, text), public.pp_spara(text, text, jsonb),
  public.pp_radera(text, text), public.pp_ping() from public;
grant execute on function public.pp_skapa(jsonb), public.pp_hamta(text, text), public.pp_spara(text, text, jsonb),
  public.pp_radera(text, text), public.pp_ping() to anon, authenticated;
