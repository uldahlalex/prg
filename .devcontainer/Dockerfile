FROM mcr.microsoft.com/dotnet/sdk:8.0 AS base
RUN apt-get update && \
    apt-get install -y nodejs npm && \
    npm install -g npm@latest
WORKDIR /workspace
