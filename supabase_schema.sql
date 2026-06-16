-- ============================================================
-- BOMBA MÓVIL — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ── PRODUCTS ─────────────────────────────────────────────────
create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  brand       text not null,
  storage     text not null,
  ram         text not null,
  condition   text not null,
  price       numeric(10,2) not null,
  original_price numeric(10,2),
  tag         text,
  discount    text,
  image_url   text not null,
  rating      numeric(3,1) default 4.8,
  reviews     int default 0,
  stock       int not null default 0,
  featured    boolean default false,
  featured_order int,
  created_at  timestamptz default now()
);

-- ── ORDERS ───────────────────────────────────────────────────
create table if not exists orders (
  id               uuid primary key default gen_random_uuid(),
  customer_name    text not null,
  customer_email   text not null,
  customer_phone   text,
  product_id       uuid references products(id) on delete set null,
  product_name     text not null,
  status           text not null default 'pendiente'
                   check (status in ('pendiente','confirmado','enviado','entregado','cancelado')),
  notes            text,
  created_at       timestamptz default now()
);

-- ── FORM SUBMISSIONS (repair requests) ───────────────────────
create table if not exists form_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  brand       text,
  model       text,
  repair_type text,
  notes       text,
  status      text not null default 'nuevo'
              check (status in ('nuevo','leido','contactado','cerrado')),
  created_at  timestamptz default now()
);

-- ── HERO CONFIG ───────────────────────────────────────────────
create table if not exists hero_config (
  id             uuid primary key default gen_random_uuid(),
  hero_image_url text not null default '/images/iphone17promax_hero.png',
  hero_title     text not null default 'Tecnología Premium. Precios de Locura.',
  hero_subtitle  text not null default 'iPhones, Androids y reparaciones en el día. Llevamos años ayudando a la gente de Sevilla a encontrar el móvil que necesita, sin líos ni letra pequeña.',
  updated_at     timestamptz default now()
);

-- Insert default hero config if empty
insert into hero_config (id, hero_image_url, hero_title, hero_subtitle)
select gen_random_uuid(), '/images/iphone17promax_hero.png',
       'Tecnología Premium. Precios de Locura.',
       'iPhones, Androids y reparaciones en el día.'
where not exists (select 1 from hero_config);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────
-- Public read for products (catalog), hero_config
alter table products enable row level security;
alter table orders enable row level security;
alter table form_submissions enable row level security;
alter table hero_config enable row level security;

-- Anyone can read products and hero config
create policy "Public read products" on products for select using (true);
create policy "Public read hero_config" on hero_config for select using (true);

-- Anyone can insert orders and form_submissions (from public forms)
create policy "Public insert orders" on orders for insert with check (true);
create policy "Public insert form_submissions" on form_submissions for insert with check (true);

-- Admin full access (use service role key in admin, or use anon + password check)
-- For simplicity: anon key with password-gated UI (admin password stored in env)
create policy "Anon full products" on products for all using (true) with check (true);
create policy "Anon full orders" on orders for all using (true) with check (true);
create policy "Anon full form_submissions" on form_submissions for all using (true) with check (true);
create policy "Anon full hero_config" on hero_config for all using (true) with check (true);

-- ── SEED DATA — Products ──────────────────────────────────────
insert into products (name, brand, storage, ram, condition, price, original_price, tag, discount, image_url, rating, reviews, stock, featured, featured_order) values
('iPhone 16 Pro Max', 'Apple', '256GB', '8GB', 'Precintado',      1149, 1299, 'OFERTA BOMBA', '-12%', '/images/iphone16promax.png',  4.9, 124, 5, true,  1),
('iPhone 15 Pro',     'Apple', '512GB', '8GB', 'Precintado',       899, null, 'NUEVO',         null,   '/images/iphone15pro.png',     4.8, 201, 3, true,  2),
('iPhone 15',         'Apple', '128GB', '6GB', 'Reacondicionado A+',599, 749, 'BOMBA PRECIO', '-20%', '/images/iphone15.png',         4.8, 167, 8, true,  3),
('Samsung S24 Ultra', 'Samsung','512GB','12GB', 'Precintado',       979, null, 'MÁS VENDIDO',  null,   '/images/samsung_s24_ultra.png',4.8, 132, 2, true,  4),
('iPhone 14 Pro',     'Apple', '256GB', '6GB', 'Reacondicionado A', 649,  849, 'OFERTA BOMBA', '-24%', '/images/iphone14pro.png',     4.7, 143, 6, true,  5),
('iPhone SE 3',       'Apple', '128GB', '4GB', 'Reacondicionado A+',349,  449, null,           '-22%', '/images/iphone_se3.png',      4.7,  56, 4, true,  6),
('iPhone 16 Pro Max', 'Apple', '512GB', '8GB', 'Precintado',      1349, null, null,            null,   '/images/iphone16promax.png',  4.9,  88, 1, false, null),
('iPhone 16 Pro',     'Apple', '128GB', '8GB', 'Precintado',      1099, null, 'NUEVO',         null,   '/images/iphone16promax.png',  4.9,  52, 0, false, null),
('iPhone 13',         'Apple', '256GB', '4GB', 'Reacondicionado B', 399,  549, null,           '-27%', '/images/iphone15.png',        4.6,  78, 7, false, null),
('Samsung Galaxy S24+','Samsung','256GB','12GB','Precintado',        799,  899, 'OFERTA',       '-11%', '/images/samsung_s24_ultra.png',4.7, 89, 3, false, null),
('Samsung Galaxy S23','Samsung','256GB', '8GB', 'Reacondicionado A+',549,  699, 'OFERTA BOMBA', '-21%', '/images/samsung_s24_ultra.png',4.7, 74, 0, false, null);
