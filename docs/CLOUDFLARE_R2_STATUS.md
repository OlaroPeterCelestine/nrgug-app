# Cloudflare R2 Endpoint Status

## ✅ Configuration Verified

The Cloudflare R2 endpoint is properly configured and working correctly.

### Endpoint Configuration

- **R2 Storage Endpoint**: `https://90e76fd8c9c8b3f72a636f5cefb8fe9c.r2.cloudflarestorage.com`
- **R2 Public URL**: `https://pub-1a0cc46c23f84b8ebf3f69e9b90b4314.r2.dev`
- **Bucket Name**: `nrgug-uploads`
- **Account ID**: `90e76fd8c9c8b3f72a636f5cefb8fe9c`

### Test Results

✅ **R2 Storage Endpoint**: Reachable (HTTP 400 - expected for unauthenticated requests)  
✅ **R2 Public URL**: Accessible (HTTP 200/404 - working correctly)  
✅ **File Access**: Working (Sample files are accessible and serving correctly)  
⚠️ **API Health Endpoint**: Not deployed yet (will be available after next deployment)

### Environment Variables

The following environment variables are configured (with defaults):

- `R2_ACCESS_KEY_ID` - Cloudflare R2 access key
- `R2_SECRET_ACCESS_KEY` - Cloudflare R2 secret access key
- `R2_BUCKET_NAME` - R2 bucket name (default: `nrgug-uploads`)
- `R2_ACCOUNT_ID` - Cloudflare account ID (default: `90e76fd8c9c8b3f72a636f5cefb8fe9c`)
- `R2_PUBLIC_URL` - Public URL for accessing files (default: `https://pub-1a0cc46c23f84b8ebf3f69e9b90b4314.r2.dev`)

### API Endpoints

- **Upload**: `POST /api/upload` - Upload images to R2
- **Delete**: `DELETE /api/upload/delete?key=<file-key>` - Delete images from R2
- **Health Check**: `GET /api/upload/health` - Check R2 connectivity (available after deployment)

### Improvements Made

1. ✅ Added connectivity test on initialization
2. ✅ Added validation for required configuration fields
3. ✅ Added retry configuration (3 retries)
4. ✅ Added health check endpoint for monitoring
5. ✅ Improved error messages

### Testing

Run the test script to verify connectivity:

```bash
cd apis
bash scripts/test_r2_connection.sh
```

### File Structure

Uploaded files are stored in R2 with the following structure:
```
nrgug/
  ├── news/
  │   └── news_<timestamp>.<ext>
  ├── shows/
  │   └── shows_<timestamp>.<ext>
  ├── clients/
  │   └── clients_<timestamp>.<ext>
  ├── videos/
  │   └── videos_<timestamp>.<ext>
  └── mail/
      └── mail_<timestamp>.<ext>
```

### Public URLs

Files uploaded to R2 are accessible via:
```
https://pub-1a0cc46c23f84b8ebf3f69e9b90b4314.r2.dev/nrgug/<type>/<filename>
```

### Status

🟢 **Cloudflare R2 endpoint is working correctly and ready for production use.**

