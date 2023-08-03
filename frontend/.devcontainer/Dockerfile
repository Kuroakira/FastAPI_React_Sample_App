FROM node:20.5.0
RUN apt update 
RUN apt install sudo
# To change owner of node_modules directory for username, 'node'
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
WORKDIR /workspace