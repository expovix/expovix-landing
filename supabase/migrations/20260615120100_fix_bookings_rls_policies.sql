-- Fix overly permissive RLS policies on public.bookings
-- Previously: "Auth read bookings" (SELECT, USING true) and
-- "Auth insert bookings" (INSERT, WITH CHECK true) allowed any
-- authenticated user to read/insert bookings belonging to ANY event.
-- This scopes all access to bookings whose event belongs to the
-- requesting organizer (event_id -> events.organizer_id = auth.uid()).

drop policy if exists "Auth read bookings" on public.bookings;
drop policy if exists "Auth insert bookings" on public.bookings;

create policy "Organizers select own bookings"
on public.bookings
for select
to authenticated
using (event_id in (select id from public.events where organizer_id = auth.uid()));

create policy "Organizers insert own bookings"
on public.bookings
for insert
to authenticated
with check (event_id in (select id from public.events where organizer_id = auth.uid()));

create policy "Organizers update own bookings"
on public.bookings
for update
to authenticated
using (event_id in (select id from public.events where organizer_id = auth.uid()))
with check (event_id in (select id from public.events where organizer_id = auth.uid()));

create policy "Organizers delete own bookings"
on public.bookings
for delete
to authenticated
using (event_id in (select id from public.events where organizer_id = auth.uid()));
