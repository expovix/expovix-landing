-- Add RLS policies on public.organizers
-- RLS is already enabled on this table but no policies exist, so it is
-- currently inaccessible to anon/authenticated roles entirely.
-- Organizers may read and update their own row only. No INSERT/DELETE
-- policy is needed since organizer rows are created via the Supabase
-- Auth signup trigger, not client-side.

create policy "Organizers select own row"
on public.organizers
for select
to authenticated
using (id = auth.uid());

create policy "Organizers update own row"
on public.organizers
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());
