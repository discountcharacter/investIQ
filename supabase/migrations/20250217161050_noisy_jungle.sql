/*
  # Initial Database Schema

  1. New Tables
    - `videos`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `url` (text, not null)
      - `thumbnail` (text, not null)
      - `created_at` (timestamp with time zone)
    
    - `messages`
      - `id` (uuid, primary key)
      - `content` (text, not null)
      - `is_bot` (boolean)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
*/

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text NOT NULL,
  thumbnail text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  is_bot boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access for videos"
  ON videos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access for messages"
  ON messages
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert for messages"
  ON messages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert for videos"
  ON videos
  FOR INSERT
  TO public
  WITH CHECK (true);