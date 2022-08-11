#!/usr/bin/env bash

set -fb

readonly THISDIR=$(cd "$(dirname "$0")" ; pwd)
readonly MY_NAME=$(basename "$0")
readonly FOLDER_NAME=".commit"
readonly FILE_TO_FETCH_URL="https://raw.githubusercontent.com/dharmendrasha/commit-helper/main/src/commit.sh"
readonly FILE_NAME="${THISDIR}/${FOLDER_NAME}/git-commit.sh"
readonly EXISTING_SHELL_SCRIPT="${FILE_NAME}"
readonly EXECUTABLE_SHELL_SCRIPT="${FILE_NAME}"
readonly TEMP_FILE="${THISDIR}/${FOLDER_NAME}/tmp.file"

mkdir -p "$THISDIR/${FOLDER_NAME}"
touch "$EXISTING_SHELL_SCRIPT"

function get_remote_file() {
  readonly REQUEST_URL=$1
  readonly OUTPUT_FILENAME=$2
  if [ -n "$(which curl)" ]; then
    $(curl -s -o "${TEMP_FILE}"  "$REQUEST_URL")
    if [[ $? -eq 0 ]]; then
      mv "${TEMP_FILE}" "${OUTPUT_FILENAME}"
      chmod 777 "${OUTPUT_FILENAME}"
    else
      return 1
    fi
  fi
}

function clean_up() {
  # clean up code (if required) that has to execute every time here
  rm -f "$TEMP_FILE"
  return 1
}

function self_clean_up() {
  rm -f "${EXECUTABLE_SHELL_SCRIPT}"
}

function update_self_and_invoke() {
  get_remote_file "${FILE_TO_FETCH_URL}" "${EXECUTABLE_SHELL_SCRIPT}"
  if [ $? -ne 0 ]; then
    cp "$TEMP_FILE" "${EXECUTABLE_SHELL_SCRIPT}"
  fi

  chmod 755 "${EXECUTABLE_SHELL_SCRIPT}"

  exec "${EXECUTABLE_SHELL_SCRIPT}" "$@"
}
function main() {
  cp "${EXECUTABLE_SHELL_SCRIPT}" "${EXISTING_SHELL_SCRIPT}"
  # your code here
} 

if [[ $MY_NAME = \.* ]]; then
  # invoke real main program
  trap "clean_up; self_clean_up" EXIT
  main "$@"
else
  # update myself and invoke updated version
  trap clean_up EXIT
  update_self_and_invoke "$@"
fi