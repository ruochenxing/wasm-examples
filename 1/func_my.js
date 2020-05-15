const wasiObj = {
  wasmInstance: null,
  imports:{
    "wasi_snapshot_preview1": {
        args_get: (count,bufsize) => { return 0 },
        args_sizes_get: (count,bufsize) => { },
        environ_get: (count,bufsize) => { return 0 },
        environ_sizes_get: (count,bufsize) => { },
        proc_exit: (code) => { return code }
    }
  }
}
fetchAndInstantiate("func.wasm", wasiObj.imports)
    .then(mod => {
        wasiObj.wasmInstance = mod;
        console.log(wasiObj.wasmInstance);
        var a = wasiObj.wasmInstance.exports.add(10,20);
        console.log(a);
        var b = wasiObj.wasmInstance.exports.show_me_the_answer();
        console.log(b);
    });

function fetchAndInstantiate(url, importObject) {
    return fetch(url).then(response =>
        response.arrayBuffer()
    ).then(bytes =>
        WebAssembly.instantiate(bytes, importObject)
    ).then(results =>{
        return results.instance;
      }
    );
}