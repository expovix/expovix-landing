-- Fix overly permissive RLS policies on public.events
-- Previously: "Auth read events" (SELECT, USING true) and
-- "Auth insert events" (INSERT, WITH CHECK true) allowed any
-- authenticated user to read/insert events belonging to ANY organizer.
-- This scopes all access to rows where organizer_id = auth.uid().

drop policy if exists "Auth read events" on public.events;
drop policy if exists "Auth insert events" on public.events;

create policy "Organizers select own events"
on public.events
for select
to authenticated
using (organizer_id = auth.uid());

create policy "Organizers insert own events"
on public.events
for insert
to authenticated
with check (organizer_id = auth.uid());

create policy "Organizers update own events"
on public.events
for update
to authenticated
using (organizer_id = auth.uid())
with check (organizer_id = auth.uid());

create policy "Organizers delete own events"
on public.events
for delete
to authenticated
using (organizer_id = auth.uid());
