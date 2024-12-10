 let langOption = document.querySelectorAll('select');
 let fromText = document.querySelector('.fromText')
 let trans = document.querySelector('.toTrsnlate')
let voice = document.querySelector('.voice')
let toVoice = document.querySelector('.to')
let cpy = document.querySelector('.bx-copy')
let countValue = document.querySelector('.code')
let change = document.querySelector('.bx-transfer')


  langOption.forEach((get, con) =>{
   for(let countryCode in language){

        let selected;
        if(con == 0 && countryCode =="en-GB"){
         selected= "selected";
        }else if(con == 1 && countryCode =="bn-IN"){
           selected= "selected";
           }

        let option = `<option value="${countryCode}"${selected}>${language[countryCode]}</option>`;
    
       get.insertAdjacentHTML('beforeend', option);

     }
    })

    fromText.addEventListener('input', function(){
       let content = fromText.value;
       fromContent = langOption[0].value;
       transContent = langOption[1].value;


       let transLink = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;

       fetch(transLink).then(translate => translate.json()).then(data =>{
          trans.value = data.responseData.translatedText;
         // console.log(data)
       })
    })

voice.addEventListener('click', function(){
   let fromTalk;
   fromTalk = new SpeechSynthesisUtterance(fromText.value);
   fromTalk.lang = langOption[0].value;
   speechSynthesis.speak(fromTalk)
})
    
toVoice.addEventListener('click', function() {
   let fromTalk;
   fromTalk = new SpeechSynthesisUtterance(trans.value);
   fromTalk.lang = langOption[1].value;
   speechSynthesis.speak(fromTalk)
})
cpy.addEventListener('click', function(){
   navigator.clipboard.writeText(trans.value)
})
fromText.addEventListener('keyup', function() {
   countValue.innerHTML =`${fromText.value.length}/5000`;
})

change.addEventListener('click', function(){
   let teampText = fromText.value;
   fromText.value = trans.value;
   trans.value = teampText;

   let tempOpt = langOption[0].value;
   langOption[0].value = langOption[1].value;
   langOption[1].value = tempOpt;
})