console.log("Hello, world!");

const main = async () => {
    console.log("starting to load wasm");
    const { foo } = await import("../rust/src/lib.rs");
    console.log("finished loading wasm");
    console.log(foo());
}

main()
