-- Enable Row Level Security on all tables
alter table public.site_content enable row level security;
alter table public.contact_messages enable row level security;
alter table public.projects enable row level security;
alter table public.gallery_images enable row level security;
alter table public.admin_deleted_messages enable row level security;
alter table public.admin_read_messages enable row level security;

-- site_content: public can read, only admins can write
create policy "public read site_content" on public.site_content for select to anon using (true);
create policy "admin write site_content" on public.site_content for all to authenticated using (true);

-- projects: public can read, only admins can write
create policy "public read projects" on public.projects for select to anon using (true);
create policy "admin write projects" on public.projects for all to authenticated using (true);

-- gallery_images: public can read, only admins can write
create policy "public read gallery_images" on public.gallery_images for select to anon using (true);
create policy "admin write gallery_images" on public.gallery_images for all to authenticated using (true);

-- contact_messages: anyone can insert (contact form), only admins can read/edit/delete
create policy "anon insert contact_messages" on public.contact_messages for insert to anon with check (true);
create policy "admin all contact_messages" on public.contact_messages for all to authenticated using (true);

-- admin tables: only authenticated admins
create policy "admin all admin_deleted_messages" on public.admin_deleted_messages for all to authenticated using (true);
create policy "admin all admin_read_messages" on public.admin_read_messages for all to authenticated using (true);
