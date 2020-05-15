const wasiObj = {
  wasmInstance: null,
  imports:{
    "wasi_snapshot_preview1": {
        fd_write: (fd, iovs, iovsLen, nwritten) => {
          const memory =  wasiObj.wasmInstance.exports.memory.buffer;
          const view = new DataView(memory);
          const sizeList = Array.from(Array(iovsLen), (v, i) => {
            const ptr = iovs + i * 8;
            const bufStart = view.getUint32(ptr, true);
            const bufLen = view.getUint32(ptr + 4, true);
            const buf = new Uint8Array(memory, bufStart, bufLen);
            const msg = String.fromCharCode(...buf);
            console.log("1"+msg);
            return buf.byteLength;
          });
          const totalSize = sizeList.reduce((acc, v) => acc + v);
          view.setUint32(nwritten, totalSize, true);
          return 0;
        },
        proc_exit: () => {},
        fd_prestat_get: () => {},
        fd_prestat_dir_name: () => {},
        environ_sizes_get: () => {},
        environ_get: () => {}
    }
  }
}
fetchAndInstantiate("hello.wasm", wasiObj.imports)
    .then(mod => {
        wasiObj.wasmInstance = mod;
        wasiObj.wasmInstance.exports.main();
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