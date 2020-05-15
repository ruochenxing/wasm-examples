var Module = {};
const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
var env = {
	"emscripten_notify_memory_growth": function(index) {
        console.log('emscripten_notify_memory_growth ' + index);
		// heap = new Uint8Array(instance.exports.memory.buffer);
	},
    "logString": (data, len) => {
        const b = Module.exports.memory.buffer;
        const buffer = new Uint8Array(b);
        console.log('buffer len:' + buffer.length);
        let s = "";
        for (let i = 0; i < len; ++i)
            s += String.fromCharCode(buffer[data + i]);
            //s += buffer[data + i].toString();
            //console.log(typeof buffer[data + i]);
        console.log(data, len);
        console.log(s);
    }
};

var imports = {
  env: env
}

fetchAndInstantiate("calc1.wasm", imports)
    .then(mod => {
        Module = mod;
    });

function fetchAndInstantiate(url, importObject) {
    return fetch(url).then(response =>
        response.arrayBuffer()
    ).then(bytes =>
        WebAssembly.instantiate(bytes, importObject)
    ).then(result =>{
    	var instance = result.instance;
		env.emscripten_notify_memory_growth(0);
        return instance;
      }
    );
}