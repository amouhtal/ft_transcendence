FROM node:16.2.0-alpine3.13
# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY ./package.json ./package-lock.json /app/

# Then install the NPM module
RUN npm install

# Copy current directory to APP folder
COPY . /app/

EXPOSE 3000
CMD ["npm", "run", "dev"]