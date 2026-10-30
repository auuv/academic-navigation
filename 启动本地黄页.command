#!/bin/zsh
set -e
cd -- "${0:A:h}"
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
if ! command -v node >/dev/null || ! command -v npm >/dev/null; then
  print "请先安装 Node.js 24 或以上，再重新打开本文件。"
  read "?按回车关闭。"
  exit 1
fi
if [[ ! -d node_modules ]]; then
  npm ci --ignore-scripts --no-audit --no-fund
fi
node backend/local.mjs --open
