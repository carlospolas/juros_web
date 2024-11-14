// Function to calculate Simple Interest (Juros Simples)
function calcularJurosSimples() {
    // Get input values
    const principal = parseFloat(document.getElementById("principal").value);
    const taxa = parseFloat(document.getElementById("taxa").value); // Use the value entered by the user, no need to divide by 100 yet
    const tempo = parseFloat(document.getElementById("tempo").value);

    // Validate if all fields were filled correctly
    if (isNaN(principal) || isNaN(taxa) || isNaN(tempo)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Convert the rate to decimal format
    const taxaDecimal = taxa / 100;

    // Simple Interest Formula: I = P × i × t
    const juros = principal * taxaDecimal * tempo;
    const total = principal + juros;

    // Show the results
    const resultadoElemento = document.getElementById("juros-simples-resultado");
    const resultadoConta = document.getElementById("resultado-simples");

    // Show the calculation
    resultadoElemento.innerHTML = `
        <strong>Fórmula:</strong> I = P × i × t <br>
        <strong>Cálculo:</strong> ${principal} × ${taxa}% × ${tempo} anos = ${juros.toFixed(2)} <br>
        <strong>Juros Calculados:</strong> ${juros.toFixed(2)} <br>
        <strong>Valor Total:</strong> ${total.toFixed(2)} (Principal + Juros)
    `;

    // Make the result area visible
    resultadoConta.style.display = "block";
}

// Function to calculate Compound Interest (Juros Compostos)
function calcularJurosCompostos() {
    // Get user inputs
    const principal = parseFloat(document.getElementById("principal-compostos").value);
    const taxa = parseFloat(document.getElementById("taxa-compostos").value) / 100; // Convert to decimal
    const tempo = parseFloat(document.getElementById("tempo-compostos").value);
    const periodo = document.getElementById("periodo-compostos").value;

    // Check if any input is missing or invalid
    if (isNaN(principal) || isNaN(taxa) || isNaN(tempo)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Determine the number of periods based on the selected compounding period
    let n;
    switch (periodo) {
        case 'mensal':
            n = 12; // 12 months in a year
            break;
        case 'trimestral':
            n = 4; // 4 quarters in a year
            break;
        case 'semestral':
            n = 2; // 2 semesters in a year
            break;
        case 'anual':
            n = 1; // 1 year
            break;
        default:
            n = 1;
    }

    // Calculate the total number of periods (t * n)
    const t = tempo * n;

    // Compound Interest Formula: M = P × (1 + i/n)^(n * t)
    const montante = principal * Math.pow(1 + taxa / n, t);

    // Calculate the interest earned
    const juros = montante - principal;

    // Generate the detailed breakdown
    const detalhamentoCalculo = `
        <strong>Fórmula:</strong> M = P × (1 + i/n)<sup>n × t</sup> <br>
        <strong>Cálculo:</strong> ${principal} × (1 + ${taxa}/${n})<sup>${n} × ${tempo}</sup> <br>
        <strong>Primeira parte da equação (1 + i/n):</strong> (1 + ${taxa}/${n}) = ${(1 + taxa / n).toFixed(4)} <br>
        <strong>Segunda parte da equação (n × t):</strong> ${n} × ${tempo} = ${t} <br>
        <strong>Fórmula final:</strong> ${principal} × ${(1 + taxa / n).toFixed(4)}<sup>${t}</sup> = ${montante.toFixed(2)} <br>
        <strong>Juros Calculados:</strong> ${juros.toFixed(2)} <br>
        <strong>Montante Final (M):</strong> € ${montante.toFixed(2)} (Principal + Juros)
    `;

    // Make sure the result container is visible
    const resultadoElemento = document.getElementById("juros-compostos-resultado");
    const resultadoConta = document.getElementById("resultado-compostos");

    // Check if the elements exist
    if (resultadoElemento && resultadoConta) {
        // Insert the breakdown calculation into the result section
        resultadoElemento.innerHTML = detalhamentoCalculo;

        // Make the result area visible
        resultadoConta.style.display = "block";
    } else {
        alert("Erro: Não foi possível encontrar os elementos de resultado.");
    }
}

