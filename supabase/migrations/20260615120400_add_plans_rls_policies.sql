-- Add RLS policy on public.plans
-- RLS is already enabled on this table but no policies exist, so it is
-- currently inaccessible to anon/authenticated roles entirely.
-- plans is a shared lookup table (Starter/Pro/Business tiers) used for
-- pricing display on the public landing page and plan selection in the
-- dashboard, so it is public read-only. No INSERT/UPDATE/DELETE policy
-- is needed since plans are managed directly, not via the app.

create policy "Public read access to plans"
on public.plans
for select
to anon, authenticated
using (true);
