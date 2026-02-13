-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  date TEXT NOT NULL,
  image_url TEXT,
  url TEXT,
  is_upcoming BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mixes table
CREATE TABLE IF NOT EXISTS mixes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  platform TEXT NOT NULL,
  platform_id TEXT NOT NULL,
  views TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  alt TEXT NOT NULL,
  section TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hero_slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  alt TEXT NOT NULL,
  page TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site_content table
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  section TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to auto-update updated_at
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mixes_updated_at BEFORE UPDATE ON mixes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON gallery_images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_slides_updated_at BEFORE UPDATE ON hero_slides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE mixes ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read events" ON events
  FOR SELECT USING (true);

CREATE POLICY "Public can read mixes" ON mixes
  FOR SELECT USING (true);

CREATE POLICY "Public can read gallery_images" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Public can read hero_slides" ON hero_slides
  FOR SELECT USING (true);

CREATE POLICY "Public can read site_content" ON site_content
  FOR SELECT USING (true);

-- Create policies for authenticated admin access (full CRUD)
-- Note: You'll need to create an admin role or use email-based authentication
-- For now, we'll allow authenticated users full access
-- You should restrict this further based on your admin user setup

CREATE POLICY "Admins can manage events" ON events
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage mixes" ON mixes
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage gallery_images" ON gallery_images
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage hero_slides" ON hero_slides
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage site_content" ON site_content
  FOR ALL USING (auth.role() = 'authenticated');

-- Create storage bucket for images (run this in Supabase Storage section or via SQL)
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Create storage policy for public read access
CREATE POLICY "Public can view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

-- Create storage policy for authenticated upload
CREATE POLICY "Admins can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Create storage policy for authenticated update/delete
CREATE POLICY "Admins can update images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can delete images" ON storage.objects
  FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT ALL ON events TO authenticated;
GRANT ALL ON mixes TO authenticated;
GRANT ALL ON gallery_images TO authenticated;
GRANT ALL ON hero_slides TO authenticated;
GRANT ALL ON site_content TO authenticated;
