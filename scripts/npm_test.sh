#!/usr/bin/env bash

TEST_BABELRC='{ "presets": ["react-native"] }'
APP_BABELRC='{ "presets": ["module:metro-react-native-babel-preset"] }'

cd ..
echo ${TEST_BABELRC} > ./.babelrc
timeout 3 npm test
echo ${APP_BABELRC} > ./.babelrc


