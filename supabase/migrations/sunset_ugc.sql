
-- 1. Create UGC Sunsets Table
create table sunset_photos (
  id uuid primary key default gen_random_uuid(),
  sunset_spot_id uuid not null references sunset_spots(id) on delete cascade,
  image_path text not null,
  caption text,
  status text not null check (status in ('pending', 'approved', 'rejected')) default 'pending',
  created_at timestamptz default now(),
  approved_at timestamptz
);

-- 2. Indexes for Feed Performance
create index idx_sunset_photos_spot_status on sunset_photos(sunset_spot_id, status);
create index idx_sunset_photos_created_desc on sunset_photos(created_at desc);

-- 3. RLS Policies
alter table sunset_photos enable row level security;

-- Public Read (Approved only)
create policy "Public can view approved photos" on sunset_photos
  for select using (status = 'approved');

-- Public Insert (Anyone can submit, moderation queue handles approval)
create policy "Anyone can submit photos" on sunset_photos
  for insert with check (true);

-- No public update/delete (Admin via dashboard only)

-- 4. Storage Bucket Setup (Note: Bucket creation usually handled via API/Console, but policies can be SQL)
-- Attempt to insert bucket if triggers exist or via policies. 
-- Assuming 'ugc-sunsets' bucket is created. Here are the storage policies:

-- Allow public read of objects in 'ugc-sunsets' bucket
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'ugc-sunsets' );

-- Allow authenticated/anon uploads to 'ugc-sunsets'
create policy "Public Upload"
on storage.objects for insert
with check ( bucket_id = 'ugc-sunsets' );
