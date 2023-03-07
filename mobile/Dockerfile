FROM node:19.4.0
#gradle:6.8.3-jdk11
WORKDIR /app

RUN apt update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_19.4.0 | bash - \
    && apt-get install -y nodejs npm

COPY . .

RUN npm i --force
RUN npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
RUN cd android && ./gradlew assembleRelease

CMD ["cp", "android/app/build/outputs/apk/app-release.apk", "/tmp/build/client.apk"]