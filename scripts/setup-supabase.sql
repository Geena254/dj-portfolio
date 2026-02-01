-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create wira_videos table
CREATE TABLE IF NOT EXISTS wira_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create mix_links table
CREATE TABLE IF NOT EXISTS mix_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  link_url VARCHAR(500) NOT NULL,
  platform VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date TIMESTAMP NOT NULL,
  location VARCHAR(255),
  image_url VARCHAR(500),
  link_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create general_updates table
CREATE TABLE IF NOT EXISTS general_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category VARCHAR(100),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  update_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_gallery_images_created_at ON gallery_images(created_at DESC);
CREATE INDEX idx_wira_videos_created_at ON wira_videos(created_at DESC);
CREATE INDEX idx_mix_links_created_at ON mix_links(created_at DESC);
CREATE INDEX idx_events_event_date ON events(event_date DESC);
CREATE INDEX idx_general_updates_created_at ON general_updates(created_at DESC);
