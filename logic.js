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
    
    let bindQueue = [];

    allBinds.forEach(binding => {
        const nxtMatch = binding.match(bindingInputPtrn);
        nxtMatch[2] = nxtMatch[2].replaceAll('"', "'");
        bindQueue.push([nxtMatch[1], nxtMatch[2]]);
        //outptxt = outptxt.replaceAll(nxtMatch[1], nxtMatch[2]);
    });

    bindQueue = bindQueue.reverse();

    bindQueue.forEach(binding => {
        outptxt = outptxt.replaceAll(binding[0], binding[1]);
    });

    outp.value = outptxt;
});
