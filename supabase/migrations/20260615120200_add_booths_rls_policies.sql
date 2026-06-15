-- Add RLS policies on public.booths
-- RLS is already enabled on this table but no policies exist, so it is
-- currently inaccessible to anon/authenticated roles entirely.
-- Scope access to booths whose event belongs to the requesting organizer
-- (event_id -> events.organizer_id = auth.uid()), same pattern as bookings.

create policy "Organizers select own booths"
on public.booths
for select
to authenticated
using (event_id in (select id from public.events where organizer_id = auth.uid()));

create policy "Organizers insert own booths"
on public.booths
for insert
to authenticated
with check (event_id in (select id from public.events where organizer_id = auth.uid()));

create policy "Organizers update own booths"
on public.booths
for update
to authenticated
using (event_id in (select id from public.events where organizer_id = auth.uid()))
with check (event_id in (select id from public.events where organizer_id = auth.uid()));

create policy "Organizers delete own booths"
on public.booths
for delete
to authenticated
using (event_id in (select id from public.events where organizer_id = auth.uid()));
