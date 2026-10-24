-- Pluggparken: konton med användarnamn och kod (okt 2026).
-- Klistra in allt i Supabase → SQL Editor och tryck Run. Går att köra flera gånger.
-- Ingen kan läsa tabellen direkt: allt går via funktionerna nedan, som kräver rätt namn och kod.
-- Inga riktiga namn och ingen e-post sparas, bara ett påhittat namn (t.ex. "tokigkatt"), lösenordet (krypterat) och framstegen.
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

-- kontroll av namn och lösenord. Trappad spärr: 5 fel i rad = 15 min, 10 = 2 timmar, 15 eller fler = ett dygn.
-- Lösenordet jämförs utan skillnad på stora och små bokstäver. Returnerar namnet eller ett felord.
create or replace function public.pp_kontroll(p_namn text, p_kod text)
returns text language plpgsql security definer set search_path = public, extensions as $$
declare k public.konton; sparr interval;
begin
  select * into k from public.konton where namn = lower(trim(p_namn));
  if not found then return '!kod'; end if;
  sparr := case when k.fel >= 15 then interval '24 hours' when k.fel >= 10 then interval '2 hours' when k.fel >= 5 then interval '15 minutes' else null end;
  if sparr is not null and k.feltid > now() - sparr then return '!sparrad'; end if;
  if k.kod <> extensions.crypt(lower(trim(coalesce(p_kod,''))), k.kod) then
    update public.konton set fel = fel + 1, feltid = now() where namn = k.namn;
    return '!kod';
  end if;
  if k.fel > 0 then update public.konton set fel = 0 where namn = k.namn; end if;
  return k.namn;
end $$;
revoke all on function public.pp_kontroll(text, text) from public, anon, authenticated;

-- skapa ett konto: servern väljer namn (förled + djur, t.ex. "tokigkatt", "ninjapanda"; ca 11 000 utan siffra) och lösenord (ett ord, t.ex. "pannkaka").
-- Inga å, ä eller ö, så att det går att skriva på alla tangentbord. Är namnet upptaget läggs en siffra till ("tokigkatt7").
create or replace function public.pp_skapa(p_data jsonb)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare
  adj text[] := array[
    'tokig','glad','snabb','modig','klok','busig','lugn','stark','pigg','nyfiken','cool','rolig','stilig','mysig',
    'fin','vild','tuff','listig','flitig','frisk','hungrig','yster','sprallig','kvick','lycklig','magisk','prickig','randig',
    'lurvig','luden','mjuk','liten','blank','glittrig','rosa','lila','fiffig','finurlig','solig','kaxig','trygg','rask',
    'snygg','smart','duktig','fnissig','fluffig','gosig','kramig','skojig','knasig','vimsig','virrig','pratig','hoppig','studsig',
    'kvittrig','brummig','varm','frostig','stormig','dimmig','rund','spetsig','rutig','taggig','glansig','silvrig','gyllene','mystisk',
    'hemlig','osynlig','flygande','kosmisk','elektrisk','digital','super','mega','ultra','mini','maxi','turbo','kanon','raket',
    'ninja','pirat','rymd','sago','troll','guld','silver','kristall','glitter','moln','sol','blixt','storm','pytte',
    'disko','kalas','sommar','vinter'];
  djur text[] := array[
    'katt','hund','uggla','panda','lejon','tiger','zebra','groda','haj','val','orm','mus','varg','ren',
    'falk','pingvin','delfin','koala','apa','kanin','igelkott','ekorre','krokodil','giraff','flamingo','papegoja','myra','humla',
    'hare','lodjur','mullvad','pelikan','hamster','ponny','kamel','noshorn','struts','kanguru','tukan','bison','kyckling','get',
    'lamm','anka','lemur','tapir','puma','jaguar','gepard','leopard','valross','utter','iller','hjort','vildsvin','oxe',
    'buffel','jak','lama','alpacka','hyena','surikat','mungo','myrslok','manet','krabba','hummer','snigel','nyckelpiga','bi',
    'geting','spindel','skalbagge','larv','gecko','kameleont','leguan','salamander','padda','axolotl','piraya','lax','torsk','abborre',
    'narval','albatross','korp','skata','duva','trana','stork','kondor','kakadua','kolibri','kalkon','svan','tupp','mula',
    'kalv','killing','valp','kattunge','drake','fenix','grip','dino','mammut','dodo'];
  ord text[] := array[
    'pannkaka','glass','banan','apelsin','citron','melon','tomat','gurka','morot','potatis','pizza','korv','ost','kaka',
    'bulle','munk','godis','popcorn','choklad','sylt','honung','plommon','vindruva','kiwi','mango','ananas','kokos','mandel',
    'russin','pepparkaka','lakrits','klubba','tacos','lasagne','soppa','gryta','havre','flingor','yoghurt','juice','saft','karamell',
    'marmelad','pommes','hamburgare','macka','frukost','middag','picknick','polkagris','halsband','paraply','cykel','buss','raket','flygplan',
    'kanot','sparkcykel','ballong','drake','docka','nalle','robot','pussel','kula','boll','fotboll','tennis','hink','spade',
    'gunga','studsmatta','tavla','penna','sudd','linjal','kritor','bok','karta','kompass','lykta','ficklampa','klocka','telefon',
    'dator','lampa','kudde','filt','soffa','stol','bord','matta','spegel','tandborste','handduk','badkar','dusch','nyckel',
    'trappa','hiss','staket','paket','present','kalas','ljus','sol','moln','regn','blixt','vind','storm','dimma',
    'frost','istapp','pulka','skidor','skridsko','vante','halsduk','jacka','byxor','strumpa','sko','keps','hatt','krona',
    'mantel','slott','torn','bro','fyr','hamn','strand','sten','grus','lera','skog','gran','tall','blomma',
    'tulpan','solros','maskros','svamp','ekollon','berg','flod','vattenfall','vulkan','ocean','planet','komet','trumma','gitarr',
    'piano','fiol','cirkus','clown','trollkarl','pirat','prinsessa','riddare','drottning','kung','troll','tomte','julgran','regnrock',
    'sandal','tofflor','pyjamas','skatt','guld','silver','diamant','kristall','magnet','batteri','motor','hjul','traktor','gravmaskin',
    'ambulans','brandbil','polisbil','taxi','lastbil','moped','helikopter','segel','ankare','kapten','hav','bokhylla','skrivbord','kalender',
    'almanacka','anteckning','brev','vykort','kuvert','etikett','cirkel','triangel','kvadrat','rektangel','pyramid','spiral','morgon','helg',
    'lov','semester','sommar','vinter','april','juni','juli','augusti','oktober','november','december','januari','tempel','palats',
    'park','lekplats','karusell','bergbana','fyrverkeri','festival','parad','konsert','teater','biograf','museum','bibliotek','skola','klassrum',
    'fritids','gympa','rast','lunch','ninja','astronaut','rymdskepp','satellit','teleskop','mikroskop','labb','experiment','formel','recept',
    'bagare','pilot','doktor','brandman','polis','bonde','kanel','vanilj','pepparmynt','jordgubbe','hallon','lingon','persika','aprikos',
    'papaya','fikon','dadel','kaktus','palm','bambu','ormbunke','vass','lilja','orkide','pion','vallmo','regnskog','djungel',
    'savann','tundra','isberg','korallrev'];
  n text; kod text; i int := 0;
begin
  if p_data is null or octet_length(p_data::text) > 300000 then return json_build_object('fel','stor'); end if;
  loop
    n := adj[1 + floor(random() * array_length(adj, 1))::int] || djur[1 + floor(random() * array_length(djur, 1))::int];
    if i >= 20 then n := n || (2 + floor(random() * 98))::int; end if;
    exit when not exists (select 1 from public.konton where namn = n);
    i := i + 1; if i > 80 then return json_build_object('fel','fullt'); end if;
  end loop;
  kod := ord[1 + floor(random() * array_length(ord, 1))::int];
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
