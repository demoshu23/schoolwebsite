# Use a small, production-ready web server image
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static content
RUN rm -rf ./*

# Copy custom nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy website files
COPY src/ .

# Expose port 80 for HTTP
EXPOSE 80

# Healthcheck (simple HTTP check)
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1

# Default command
CMD ["nginx", "-g", "daemon off;"]
