const temperatura = document.getElementById("valor-temperatura");
const resultado = document.getElementById("resultado"); 
const CelciusParaFahrenheit = document.getElementById("c_para_f");
const CelciusParaKelvin = document.getElementById("c_para_k");
const FahrenheitParaCelcius = document.getElementById("f_para_c");
const FahrenheitParaKelvin = document.getElementById("f_para_k");
const KelvinParaCelcius = document.getElementById("k_para_c");
const KelvinParaFahrenheit = document.getElementById("k_para_f");
const btnConverter = document.getElementById("btn-converter");
const mensagem = document.getElementById("mensagem");

btnConverter.addEventListener("click",()=>{

    if(CelciusParaFahrenheit.checked){
        let ValorTemperatura = parseFloat(temperatura.value);
        let valorConvertido = (ValorTemperatura * 9/5) + 32;

        resultado.value = `${valorConvertido.toFixed(2)} °F`;

        mensagem.innerHTML = ``;
    }
    else if(CelciusParaKelvin.checked){
        let ValorTemperatura = parseFloat(temperatura.value);
        let valorConvertido = ValorTemperatura + 273.15;

        resultado.value = `${valorConvertido.toFixed(2)} K`;

        mensagem.innerHTML = ``;
    }
    else if(FahrenheitParaCelcius.checked){ 
        let ValorTemperatura = parseFloat(temperatura.value);
        let valorConvertido = (ValorTemperatura - 32) * 5/9;

        resultado.value = `${valorConvertido.toFixed(2)} °C`;

        mensagem.innerHTML = ``;
    }
    else if(FahrenheitParaKelvin.checked){ 
        let ValorTemperatura = parseFloat(temperatura.value);
        let valorConvertido = (ValorTemperatura - 32) * 5/9 + 273.15;

        resultado.value = `${valorConvertido.toFixed(2)} K`;

        mensagem.innerHTML = ``;
    }
    else if(KelvinParaCelcius.checked){ 
        let ValorTemperatura = parseFloat(temperatura.value);
        let valorConvertido = ValorTemperatura - 273.15;

        resultado.value = `${valorConvertido.toFixed(2)} °C`;

        mensagem.innerHTML = ``;
    }
    else if(KelvinParaFahrenheit.checked){
        let ValorTemperatura = parseFloat(temperatura.value);
        let valorConvertido = 	(ValorTemperatura - 273.15) * 9/5 + 32;

        resultado.value = `${valorConvertido.toFixed(2)} °F`;

        mensagem.innerHTML = ``;
    }
    else{
        mensagem.innerHTML = `Por favor escolha alguma das opções`;
    }
})