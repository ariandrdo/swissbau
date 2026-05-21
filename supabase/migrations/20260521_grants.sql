-- Grant API access to all tables

-- site_content
grant select on public.site_content to anon;
grant select, insert, update, delete on public.site_content to authenticated;
grant select, insert, update, delete on public.site_content to service_role;

-- contact_messages
grant select on public.contact_messages to anon;
grant select, insert, update, delete on public.contact_messages to authenticated;
grant select, insert, update, delete on public.contact_messages to service_role;

-- projects
grant select on public.projects to anon;
grant select, insert, update, delete on public.projects to authenticated;
grant select, insert, update, delete on public.projects to service_role;

-- gallery_images
grant select on public.gallery_images to anon;
grant select, insert, update, delete on public.gallery_images to authenticated;
grant select, insert, update, delete on public.gallery_images to service_role;

-- admin_deleted_messages
grant select, insert, update, delete on public.admin_deleted_messages to authenticated;
grant select, insert, update, delete on public.admin_deleted_messages to service_role;

-- admin_read_messages
grant select, insert, update, delete on public.admin_read_messages to authenticated;
grant select, insert, update, delete on public.admin_read_messages to service_role;
