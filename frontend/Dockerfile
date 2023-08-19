# Step 1: Build the React application
FROM node:16 AS build
COPY ./src/assets/* /usr/share/nginx/html/src/assets/
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Step 2: Serve the React application
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
