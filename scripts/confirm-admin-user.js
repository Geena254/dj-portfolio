/**
 * Script to manually confirm the admin user if email confirmation is enabled
 * Run with: node scripts/confirm-admin-user.js
 */

require('dotenv').config({ path: '.env' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function confirmAdminUser() {
  const email = 'tatushanga@gmail.com'
  const password = 'shanga3001#'

  console.log('🔄 Attempting to sign in and verify admin user...')
  console.log(`Email: ${email}`)

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        console.error('❌ Email not confirmed yet.')
        console.error('\n📝 To fix this:')
        console.error('   1. Go to Supabase Dashboard > Authentication > Settings')
        console.error('   2. Disable "Enable email confirmations"')
        console.error('   OR')
        console.error('   3. Go to Authentication > Users')
        console.error('   4. Find the user and click "Confirm"')
        console.error('   OR')
        console.error('   5. Check the email inbox for confirmation link')
        return
      }
      console.error('❌ Error:', error.message)
      return
    }

    if (data.session) {
      console.log('✅ Admin user is confirmed and ready to use!')
      console.log(`   User ID: ${data.user.id}`)
      console.log(`   Email: ${data.user.email}`)
      console.log('\n✅ You can now log in to the admin portal!')
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message)
  }
}

confirmAdminUser()
