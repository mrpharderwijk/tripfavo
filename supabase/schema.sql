-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('GUEST', 'HOST', 'ADMIN');
CREATE TYPE listing_status AS ENUM ('DRAFT', 'IN_REVIEW', 'PUBLISHED');
CREATE TYPE price_type AS ENUM ('HIGH_SEASON', 'MID_SEASON', 'LOW_SEASON', 'CLEANING_FEE', 'DEPOSIT');
CREATE TYPE room_type AS ENUM (
  'BATHROOM', 'BEDROOM', 'LIVING_ROOM', 'DINING_ROOM', 'KITCHEN', 'OFFICE', 
  'GARAGE', 'HALLWAY', 'FRONT_PORCH', 'BACK_PORCH', 'BALCONY', 'ATTIC', 
  'SHED', 'FRONT_YARD', 'BACK_YARD', 'PATIO', 'GARDEN', 'POOL', 'HOT_TUB', 
  'SAUNA', 'GYM', 'STUDIO', 'STUDIO_LOFT', 'OTHER'
);
CREATE TYPE amenity_type AS ENUM (
  'WIFI', 'SWIMMING_POOL', 'HOT_TUB', 'TENNIS_COURT', 'GYM', 'AIR_CONDITIONING', 
  'HEATING', 'KITCHEN', 'WASHER', 'DRYER', 'TV', 'FREE_PARKING', 'SEA_VIEW', 
  'MOUNTAIN_VIEW', 'GARDEN', 'BBQ_GRILL', 'PLAYGROUND', 'BEACH_ACCESS', 
  'FIREPLACE', 'WORKSPACE', 'PET_FRIENDLY', 'SECURITY_SYSTEM', 'FIRST_AID_KIT', 
  'FIRE_EXTINGUISHER', 'SMOKE_ALARM', 'ELEVATOR', 'BALCONY', 'BREAKFAST_INCLUDED', 
  'DISHWASHER', 'BABY_EQUIPMENT'
);
CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE,
  email_verified TIMESTAMP WITH TIME ZONE,
  hashed_password TEXT,
  role user_role[] DEFAULT ARRAY['GUEST', 'HOST']::user_role[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Names table
CREATE TABLE names (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  middle_name VARCHAR(255),
  last_name VARCHAR(255) NOT NULL,
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profile images table
CREATE TABLE user_profile_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  file_hash VARCHAR(255) NOT NULL,
  file_key VARCHAR(255) UNIQUE NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  size INTEGER NOT NULL,
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User status table
CREATE TABLE user_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP WITH TIME ZONE,
  blocked BOOLEAN DEFAULT FALSE,
  blocked_at TIMESTAMP WITH TIME ZONE,
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User verify tokens table
CREATE TABLE user_verify_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token VARCHAR(255) UNIQUE NOT NULL,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Accounts table
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type VARCHAR(255),
  scope VARCHAR(255),
  id_token TEXT,
  session_state VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(provider, provider_account_id)
);

-- Authenticators table (for WebAuthn)
CREATE TABLE authenticators (
  credential_id VARCHAR(255) PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider_account_id VARCHAR(255) NOT NULL,
  credential_public_key TEXT NOT NULL,
  counter INTEGER NOT NULL,
  credential_device_type VARCHAR(255) NOT NULL,
  credential_backed_up BOOLEAN NOT NULL,
  transports VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, credential_id)
);

-- Listings table
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  description TEXT,
  neighbourhood_description TEXT,
  structure TEXT,
  privacy_type VARCHAR(255),
  status listing_status DEFAULT 'DRAFT',
  host_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Listing locations table
CREATE TABLE listing_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  street_name VARCHAR(255) NOT NULL,
  house_number VARCHAR(50) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  apt_info VARCHAR(255),
  additional_info TEXT,
  listing_id UUID UNIQUE REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Listing floor plans table
CREATE TABLE listing_floor_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rooms INTEGER,
  bathrooms INTEGER,
  bedrooms INTEGER,
  beds INTEGER,
  living_rooms INTEGER,
  kitchens INTEGER,
  listing_id UUID UNIQUE REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Listing guests amount table
CREATE TABLE listing_guests_amount (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  max_guests INTEGER,
  adults INTEGER,
  children INTEGER,
  infants INTEGER,
  pets INTEGER,
  listing_id UUID UNIQUE REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Listing images table
CREATE TABLE listing_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_hash VARCHAR(255) NOT NULL,
  file_key VARCHAR(255) UNIQUE NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  is_main BOOLEAN DEFAULT FALSE,
  size INTEGER NOT NULL,
  url TEXT NOT NULL,
  room_type room_type,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Amenities table
CREATE TABLE amenities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type amenity_type UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Listing amenities table
CREATE TABLE listing_amenities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type amenity_type REFERENCES amenities(type) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Listing price details table
CREATE TABLE listing_price_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type price_type,
  price DECIMAL(10, 2),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status booking_status DEFAULT 'PENDING',
  guest_id UUID REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Booking guests amount table
CREATE TABLE booking_guests_amount (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  adults INTEGER,
  children INTEGER,
  infants INTEGER,
  pets INTEGER,
  booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Booking price details table
CREATE TABLE booking_price_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type price_type,
  price DECIMAL(10, 2) DEFAULT 0,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Guest favorites table
CREATE TABLE guest_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_sessions_session_token ON sessions(session_token);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_listings_host_id ON listings(host_id);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listing_images_listing_id ON listing_images(listing_id);
CREATE INDEX idx_bookings_guest_id ON bookings(guest_id);
CREATE INDEX idx_bookings_listing_id ON bookings(listing_id);
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX idx_guest_favorites_user_id ON guest_favorites(user_id);
CREATE INDEX idx_guest_favorites_listing_id ON guest_favorites(listing_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_names_updated_at BEFORE UPDATE ON names FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profile_images_updated_at BEFORE UPDATE ON user_profile_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_status_updated_at BEFORE UPDATE ON user_status FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_verify_tokens_updated_at BEFORE UPDATE ON user_verify_tokens FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_authenticators_updated_at BEFORE UPDATE ON authenticators FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_listing_locations_updated_at BEFORE UPDATE ON listing_locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_listing_floor_plans_updated_at BEFORE UPDATE ON listing_floor_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_listing_guests_amount_updated_at BEFORE UPDATE ON listing_guests_amount FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_listing_images_updated_at BEFORE UPDATE ON listing_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_amenities_updated_at BEFORE UPDATE ON amenities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_listing_amenities_updated_at BEFORE UPDATE ON listing_amenities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_listing_price_details_updated_at BEFORE UPDATE ON listing_price_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_booking_guests_amount_updated_at BEFORE UPDATE ON booking_guests_amount FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_booking_price_details_updated_at BEFORE UPDATE ON booking_price_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guest_favorites_updated_at BEFORE UPDATE ON guest_favorites FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE names ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profile_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_verify_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE authenticators ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_floor_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_guests_amount ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_price_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_guests_amount ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_price_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_favorites ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (you'll need to customize these based on your requirements)
CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);
CREATE POLICY "Users can insert their own data" ON users FOR INSERT WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "Public listings are viewable by everyone" ON listings FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Hosts can manage their own listings" ON listings FOR ALL USING (auth.uid()::text = host_id::text);

CREATE POLICY "Bookings are viewable by guest and host" ON bookings FOR SELECT USING (
  auth.uid()::text = guest_id::text OR 
  auth.uid()::text IN (SELECT host_id::text FROM listings WHERE id = listing_id)
);

-- Insert default amenities
INSERT INTO amenities (type) VALUES 
  ('WIFI'), ('SWIMMING_POOL'), ('HOT_TUB'), ('TENNIS_COURT'), ('GYM'),
  ('AIR_CONDITIONING'), ('HEATING'), ('KITCHEN'), ('WASHER'), ('DRYER'),
  ('TV'), ('FREE_PARKING'), ('SEA_VIEW'), ('MOUNTAIN_VIEW'), ('GARDEN'),
  ('BBQ_GRILL'), ('PLAYGROUND'), ('BEACH_ACCESS'), ('FIREPLACE'), ('WORKSPACE'),
  ('PET_FRIENDLY'), ('SECURITY_SYSTEM'), ('FIRST_AID_KIT'), ('FIRE_EXTINGUISHER'),
  ('SMOKE_ALARM'), ('ELEVATOR'), ('BALCONY'), ('BREAKFAST_INCLUDED'), ('DISHWASHER'),
  ('BABY_EQUIPMENT')
ON CONFLICT (type) DO NOTHING; 