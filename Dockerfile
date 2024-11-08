# Use a lightweight Node.js image for production
FROM node:18-slim AS runner
# Set working directory
WORKDIR /app

# Copy only the necessary files from the built project
COPY .next ./.next
COPY public ./public
COPY next.config.ts ./
COPY package.json ./

# Install only production dependencies
RUN npm install --production --legacy-peer-deps

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
