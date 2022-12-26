// link do lucas: https://teachablemachine.withgoogle.com/models/xo_nvluJm/

previsao1 = "";
previsao2 = "";

Webcam.set({ //função de webcam.js
    width:350,
    heigth:300,
    imageFormat: 'png',
    pngQuality:90
})

camera = document.getElementById("camera");
Webcam.attach('#camera'); //assim que a página for carregada a webcam será acionada e o popup será exibido com a permissão

function tirarFoto(){
    Webcam.snap(function(data_uri){ //função predefinida de webcam.js e é usada para tirar imagens com a sua webcam. o data_uri é usada para mostrar a visualização da imagem que é gerada após tirar uma foto.
        document.getElementById("result").innerHTML = '<img id="imagem-capturada" src="' +data_uri+ '"/>'; //aqui o src passamos o data_uri para que a imagem seja atualizada com a selfie tirada
    })
}

console.log('ml5 version: ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/fvstchAOH/model.json', modeloCarregado);
// imageClassifier é uma função predefinida do ml5 que é usada para acionar a função de classificação de imagens
// primeiro parametro é o link do modelo e segundo parametro é a função para classificar o modelo

function modeloCarregado(){
    console.log("Modelo carregado");
    //confirmar se o modelo foi carregado
}

function check(){
    img = document.getElementById("imagem-capturada"); //essa id guarda a imagem que tiramos da webcam
    classifier.classify(img,obterResultado); // classify é uma função predefinida de ml5.js que é usada para identificar a imagem capturada usando o modelo para obter resultados
}

function speak(){ // função para falar
    //definindo a API speechSynthesis(síntese de fala) e armazenando na variável
    var synth = window.speechSynthesis;
    speakData1 = "A primeira previsão é: " + previsao1;
    speakData2 = "A segunda previsão é: " + previsao2;

    //irá converter o texto em fala
    // usamos o new para que a cada próximo resultado ele converta o texto em fala
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
    //aqui chamamos a API para falar o que está dentro dos parenteses e a variável contém o valor para ser falado.
}

function obterResultado(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;
        document.getElementById("resultEmotionName2").innerHTML = results[1].label;
        previsao1 = results[0].label;
        previsao2 = results[1].label;
        speak();
        if(previsao1 == "Feliz"){
            document.getElementById("updateEmoji").innerHTML = "&#128512;";
        }
        if(previsao1 == "Triste"){
            document.getElementById("updateEmoji").innerHTML = "&#128532;";
        }
        if(previsao2 == "Feliz"){
            document.getElementById("updateEmoji2").innerHTML = "&#128512;";
        }
        if(previsao2 == "Triste"){
            document.getElementById("updateEmoji2").innerHTML = "&#128532;";
        }
    }
}


