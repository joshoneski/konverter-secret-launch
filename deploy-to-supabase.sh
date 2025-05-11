
#!/bin/bash
set -e

# Set the service key from the one provided

echo "Logging into Supabase..."
echo $SUPABASE_SERVICE_KEY | supabase login

echo "Linking to konverter-prod project..."
supabase link --project-ref ygtmdrsrlyteuuvzwqjv

# Create the website bucket if it doesn't exist yet
echo "Creating website bucket (if it doesn't exist)..."
supabase storage create bucket website --public

# Set the bucket as public
echo "Setting bucket to public-read..."
supabase storage update bucket website --public

# Upload the dist directory recursively
echo "Uploading ./dist directory to storage..."
supabase storage upload website ./dist --recursive

# Configure static site settings
echo "Configuring static site settings..."
# This requires manual configuration in the Supabase dashboard:
# 1. Set fallback document to /index.html
# 2. Disable file download tokens

echo "Deployment complete!"
echo "Your static site is available at: https://ygtmdrsrlyteuuvzwqjv.supabase.co/storage/v1/object/public/website/index.html"
echo ""
echo "DNS Configuration:"
echo "------------------------"
echo "Set up a CNAME record:"
echo "CNAME landing.<yourdomain> → ygtmdrsrlyteuuvzwqjv.supabase.co"
echo ""
echo "Note: This will be proxied through Cloudflare for free SSL; no further action needed."
