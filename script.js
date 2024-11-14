function calcularJurosSimples() {
    // Obter os valores dos inputs
    const principal = parseFloat(document.getElementById("principal").value);
    const taxa = parseFloat(document.getElementById("taxa").value); // Usamos o valor que o usuário digita, sem dividir por 100
    const tempo = parseFloat(document.getElementById("tempo").value);

    // Validar se todos os campos foram preenchidos
    if (isNaN(principal) || isNaN(taxa) || isNaN(tempo)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Converter a taxa para formato decimal
    const taxaDecimal = taxa / 100;

    // Fórmula dos Juros Simples: I = P × i × t
    const juros = principal * taxaDecimal * tempo;
    const total = principal + juros;

    // Exibir os resultados
    const resultadoElemento = document.getElementById("juros-simples-resultado");
    const resultadoConta = document.getElementById("resultado-simples");

    // Exibir a conta realizada
    resultadoElemento.innerHTML = `
        <strong>Fórmula:</strong> I = P × i × t <br>
        <strong>Cálculo:</strong> ${principal} × ${taxa}% × ${tempo} anos = ${juros.toFixed(2)} <br>
        <strong>Juros Calculados:</strong> ${juros.toFixed(2)} <br>  <!-- Linha para o valor dos juros -->
        <strong>Valor Total:</strong> ${total.toFixed(2)} (Principal + Juros)
    `;

    // Tornar a área de resultado visível
    resultadoConta.style.display = "block";
}





// Function to calculate Compound Interest (Montante)
function calcularJurosCompostos() {
    // Get user inputs
    const principal = parseFloat(document.getElementById("principal-compostos").value);
    const taxa = parseFloat(document.getElementById("taxa-compostos").value) / 100; // Convert to decimal
    const tempo = parseFloat(document.getElementById("tempo-compostos").value);

    // Calculate final amount (Montante)
    const montante = principal * Math.pow(1 + taxa, tempo);

    // Display result in Euros (€)
    document.getElementById("montante-compostos-resultado").innerText = `€ ${montante.toFixed(2)}`;
}


