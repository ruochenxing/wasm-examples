c语言中调用js方法
emcc ccalljs.cc --js-library ccalljs_pkg.js -o ccalljs.js

访问 http://localhost:5000/2/ccalljs




传递字符串,解析json
emcc -O0 -s ALLOW_MEMORY_GROWTH=1  cJSON.c calc.c  -o calc.js
这里会生成wasm,js

访问 http://localhost:5000/2/calc


传递字符串,解析json方法二。  这个方法的getString/setString还有点问题
emcc -O3 -s ALLOW_MEMORY_GROWTH=1  cJSON.c calc1.c --js-library calc1_pkg.js  -o calc1.wasm
这里会生成wasm
http://localhost:5000/2/calc1_my