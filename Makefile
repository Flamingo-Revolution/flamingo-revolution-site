# Development
dev:
		@echo "Starting development server..."
		@pnpm dev

# Building production app
build:
		@echo "Building static site..."
		@pnpm build

# Previewing
preview:
		@echo "Previewing production build..."
		@pnpm preview

# Deployment
cf_deploy:
		@echo "Deploying to Cloudflare Pages..."
		@pnpm cf:deploy

cf_preview:
		@echo "Local preview for Cloudflare Pages..."
		@pnpm cf:preview
