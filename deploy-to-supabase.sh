
#!/bin/bash
set -e

# Set the service key from the one provided
export SUPABASE_SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndG1kcnNybHl0ZXV1dnp3cWp2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Njk5OTIwMCwiZXhwIjoyMDYyNTc1MjAwfQ.YeFJT-MdGQvzB7OA4KET9JJN5wx9JDEuP45H3iS0iFg"

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
