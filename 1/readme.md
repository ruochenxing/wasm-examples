emcc可以将cc文件输出为wasm,js,html三种文件

emcc hello.cc -o hello.wasm

emcc hello.cc -o hello.js

emcc hello.cc -o hello.html

可以直接访问hello.html
也可以在生成js后引入js，参考hello1.html
也可以在生成wasm后，自己解析，参考hello2.html,func.html