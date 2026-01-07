let bytes = [200, 211, 222, 234]; //each element use 8 bytes of memory; very inefficient
let uintarray = new Uint8Array([1, 2, 3, 4]); //each element uses just 1 byte of space; more efficient
let uintarray_2 = new Uint8Array([1, 3030, 2]); //it is equal to [1, 214(3030%256), 2] 