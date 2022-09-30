const inp = document.getElementById('input-txt');
const outp = document.getElementById('output-txt');
const btn = document.getElementById('convert-btn');

const scriptPtrn = /{"Script":"(?<scriptval>[^"]+)"/;
const bindingPtrn = /,"Bindings":{(?<bindingsval>[^}]+)}/;
const bindingInputPtrn = /"(?<key>[^"]+)":(?<value>"?[^"]+"?)$/;

btn.addEventListener('click', () => {
    const inputTxt = inp.value;

    const scrMtch = inputTxt.match(scriptPtrn);
    let outptxt = scrMtch[1];
    const bndMtch = inputTxt.match(bindingPtrn);

    const allBinds = bndMtch[1].split(',');

    allBinds.forEach(binding => {
        const nxtMatch = binding.match(bindingInputPtrn);
        nxtMatch[2] = nxtMatch[2].replaceAll('"', "'");
        outptxt = outptxt.replaceAll(nxtMatch[1], nxtMatch[2]);
    });

    outp.value = outptxt;
});