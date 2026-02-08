/**
 * One-time script to create admin user in Supabase
 * Run with: node scripts/create-admin-user.js
 * 
 * Make sure your .env.local file has:
 * NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
 * NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
 */

require('dotenv').config({ path: '.env' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createAdminUser() {
  const email = 'tatushanga@gmail.com'
  const password = 'shanga3001#'

  console.log('🔄 Creating admin user...')
  console.log(`Email: ${email}`)

  try {
    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin`,
      },
    })

    if (error) {
      // If user already exists, try to sign in to verify
      if (error.message.includes('already registered') || error.message.includes('User already registered')) {
        console.log('⚠️  User already exists. Attempting to sign in to verify...')
        
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) {
          console.error('❌ Error signing in:', signInError.message)
          console.error('\n📝 Please create the user manually in Supabase Dashboard:')
          console.error('   1. Go to Authentication > Users')
          console.error('   2. Click "Add User"')
          console.error(`   3. Email: ${email}`)
          console.error(`   4. Password: ${password}`)
          console.error('   5. Auto Confirm User: ON')
          return
        }

        console.log('✅ User exists and credentials are correct!')
        console.log('✅ Admin user is ready to use')
        return
      }

      console.error('❌ Error creating user:', error.message)
      console.error('\n📝 Please create the user manually in Supabase Dashboard:')
      console.error('   1. Go to Authentication > Users')
      console.error('   2. Click "Add User"')
      console.error(`   3. Email: ${email}`)
      console.error(`   4. Password: ${password}`)
      console.error('   5. Auto Confirm User: ON')
      return
    }

    if (data.user) {
      console.log('✅ Admin user created successfully!')
      console.log(`   User ID: ${data.user.id}`)
      
      if (!data.session) {
        console.log('⚠️  Email confirmation may be required.')
        console.log('   Check your Supabase project settings:')
        console.log('   - Go to Authentication > Settings')
        console.log('   - Disable "Enable email confirmations" OR')
        console.log('   - Check the email inbox for confirmation link')
      } else {
        console.log('✅ User is confirmed and ready to use!')
      }
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message)
    console.error('\n📝 Please create the user manually in Supabase Dashboard:')
    console.error('   1. Go to Authentication > Users')
    console.error('   2. Click "Add User"')
    console.error(`   3. Email: ${email}`)
    console.error(`   4. Password: ${password}`)
    console.error('   5. Auto Confirm User: ON')
  }
}

createAdminUser()
