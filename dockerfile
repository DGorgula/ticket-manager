FROM node:12
WORKDIR /docker-ticket-manager
COPY package*.json ./
RUN npm install
COPY . .
ENV MONGO_URI=mongodb+srv://admin:n4n4b4n4n4@cluster0.sllty.mongodb.net/TicketManager?retryWrites=true&w=majority
EXPOSE 8080
CMD [ "node", "index.js" ]