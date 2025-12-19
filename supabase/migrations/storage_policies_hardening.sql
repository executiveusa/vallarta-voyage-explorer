
-- 1. Tighten Storage Policies for UGC Bucket

-- Drop existing loose policies if they exist (best effort, or standard names)
drop policy if exists "Public Upload" on storage.objects;
drop policy if exists "Authenticated Upload" on storage.objects;
drop policy if exists "Public Access" on storage.objects;

-- Re-apply Strict Policies

-- A. Public Read (still needed for viewing)
create policy "Give public read access to ugc-sunsets"
on storage.objects for select
using ( bucket_id = 'ugc-sunsets' );

-- B. Create-Only for Anon/Auth (Strict)
-- Anon users can ONLY insert files. They cannot update or delete them.
create policy "Allow everyone to upload photos"
on storage.objects for insert
with check ( bucket_id = 'ugc-sunsets' );

-- C. Admin Only Update/Delete
-- (Assuming we utilize the 'is_admin()' function created in previous step or similar check)
create policy "Admins can update/delete photos"
on storage.objects for update
using ( bucket_id = 'ugc-sunsets' and (auth.role() = 'service_role' or public.is_admin()) );

create policy "Admins can delete photos"
on storage.objects for delete
using ( bucket_id = 'ugc-sunsets' and (auth.role() = 'service_role' or public.is_admin()) );

-- Verify bucket public status (ensure it is public)
update storage.buckets
set public = true
where id = 'ugc-sunsets';
