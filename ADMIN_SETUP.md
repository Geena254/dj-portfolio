# Admin Portal Setup Guide

This guide will help you set up the admin portal for your DJ portfolio website.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A Supabase project created

## Step 1: Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL script from `supabase/schema.sql` to create all necessary tables and policies

## Step 2: Set Up Supabase Storage

1. Go to Storage in your Supabase dashboard
2. Create a new bucket named `images`
3. Make it public (so images can be accessed via URL)
4. The storage policies are included in the schema.sql file - you may need to run them separately if they don't execute automatically

## Step 3: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Get your Supabase credentials:
   - Go to Project Settings > API
   - Copy your Project URL (this is `NEXT_PUBLIC_SUPABASE_URL`)
   - Copy your `anon` public key (this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
3. Add these values to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 4: Create Admin User

### Option A: Use the Setup Script (Recommended)

1. Make sure your `.env` file has your Supabase credentials
2. Run the setup script:
   ```bash
   node scripts/create-admin-user.js
   ```
3. The script will create the admin user with:
   - Email: `tatushanga@gmail.com`
   - Password: `shanga3001#`

### Option B: Manual Creation via Supabase Dashboard

1. Go to Authentication > Users in your Supabase dashboard
2. Click "Add User" or "Invite User"
3. Create a user with:
   - Email: `tatushanga@gmail.com`
   - Password: `shanga3001#`
   - **Important**: Enable "Auto Confirm User" toggle

### Step 4b: Disable Email Confirmation (Recommended for Admin)

To allow immediate login without email confirmation:

1. Go to Authentication > Settings in your Supabase dashboard
2. Scroll to "Email Auth" section
3. **Disable** "Enable email confirmations"
4. Save changes

Alternatively, if you want to keep email confirmations enabled:
- Check the email inbox for `tatushanga@gmail.com` for a confirmation link
- Or manually confirm the user in Authentication > Users by clicking on the user and confirming them

## Step 5: Access the Admin Portal

1. Start your development server: `npm run dev`
2. Navigate to your website
3. Hover over the logo in the navbar for 5 seconds
4. Click the "Admin" link that appears
5. Sign in with your admin credentials

## Features

The admin portal allows you to:

- **Events**: Add, edit, and delete events (upcoming and past)
- **Mixes**: Manage your music mixes from different platforms
- **Gallery**: Upload and manage gallery images
- **Hero Slides**: Manage hero images for different pages
- **Site Content**: Store and manage any site-wide content (JSON format)

## Security Notes

- The admin portal is hidden from regular users (only appears after 5-second hover on logo)
- All database operations require authentication
- Row Level Security (RLS) is enabled on all tables
- Public users can only read data, authenticated users can manage it
- Consider restricting admin access further by checking specific user emails or roles

## Troubleshooting

### Images not uploading
- Ensure the `images` storage bucket exists and is public
- Check that storage policies are set up correctly
- Verify your Supabase credentials are correct

### Can't sign in
- Check that email authentication is enabled in Supabase
- Verify your credentials in `.env.local`
- Check browser console for errors

### Database errors
- Ensure all tables were created successfully
- Check that RLS policies are active
- Verify your user has the correct permissions
