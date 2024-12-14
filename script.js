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

// Function to calculate the monthly payment for Crédito Bancário
function calcularCreditoBancario() {
    // Get input values
    const valorCredito = parseFloat(document.getElementById('valor-credito-bancario').value); // Loan amount (Principal)
    const taxaJurosAnual = parseFloat(document.getElementById('taxa-juros-bancario').value); // Annual interest rate in percentage
    const prazo = parseInt(document.getElementById('prazo-bancario').value); // Loan term in years

    // Validate inputs
    if (isNaN(valorCredito) || isNaN(taxaJurosAnual) || isNaN(prazo) || valorCredito <= 0 || taxaJurosAnual < 0 || prazo <= 0) {
        alert("Por favor, insira valores válidos para todos os campos.");
        return;
    }

    // Convert the annual interest rate to a monthly rate (in decimal form)
    const taxaJurosMensal = (taxaJurosAnual / 100) / 12; // Monthly interest rate

    // Total number of monthly payments (in months)
    const numeroParcelas = prazo * 12;

    // Apply the Crédito Bancário formula for monthly installment
    let parcelaMensal;
    if (taxaJurosMensal === 0) {
        // If no interest, simply divide the principal by the number of months
        parcelaMensal = valorCredito / numeroParcelas;
    } else {
        // Formula to calculate the monthly installment with compound interest
        const numerador = valorCredito * taxaJurosMensal * Math.pow(1 + taxaJurosMensal, numeroParcelas);
        const denominador = Math.pow(1 + taxaJurosMensal, numeroParcelas) - 1;
        parcelaMensal = numerador / denominador;
    }

    // Display the result (rounded to 2 decimal places for currency format)
    const resultadoElement = document.getElementById('parcela-credito-bancario-resultado');
    resultadoElement.textContent = parcelaMensal.toFixed(2); // Show result with two decimal places
}
function calcularCreditoBancario() {
    // Get user inputs
    const valorCredito = parseFloat(document.getElementById('valor-credito-bancario').value);
    const taxaJuros = parseFloat(document.getElementById('taxa-juros-bancario').value) / 100 / 12; // Monthly interest rate
    const prazo = parseFloat(document.getElementById('prazo-bancario').value);
    
    // Total number of payments (in months)
    const numeroPagamentos = prazo * 12;

    // Formula to calculate monthly installment
    const mensalidade = valorCredito * (taxaJuros * Math.pow(1 + taxaJuros, numeroPagamentos)) / (Math.pow(1 + taxaJuros, numeroPagamentos) - 1);

    // Format the result to 2 decimal places
    const mensalidadeFormatted = mensalidade.toFixed(2);

    // Show result
    document.getElementById('parcela-credito-bancario-resultado').innerText = `€${mensalidadeFormatted}`;
    document.getElementById('aviso-credito-bancario').style.display = 'block';
    
    // Step-by-step calculation breakdown
    let passosHTML = `
        <h4>1. Calcular a Taxa de Juros Mensal (i):</h4>
        <p>Taxa de Juros Anual: ${document.getElementById('taxa-juros-bancario').value}%</p>
        <p>Taxa de Juros Mensal: ${taxaJuros * 100}%</p>
        
        <h4>2. Calcular o Número Total de Pagamentos (n):</h4>
        <p>Prazo em Anos: ${prazo}</p>
        <p>Total de Pagamentos (Meses): ${prazo} x 12 = ${numeroPagamentos}</p>

        <h4>3. Aplicar a Fórmula para Calcular a Prestação Mensal:</h4>
        <p>M = ${valorCredito} x ( ${taxaJuros} x (1 + ${taxaJuros}) ^ ${numeroPagamentos} ) / ( (1 + ${taxaJuros}) ^ ${numeroPagamentos} - 1 ) </p>
        <p>Prestação Mensal = €${mensalidadeFormatted}</p>
    `;

    // Display the breakdown steps
    document.getElementById('passos-calc-credito-bancario').innerHTML = passosHTML;
    document.getElementById('passos-credito-bancario').style.display = 'block';
}

function calcularCreditoHabitaçao() {
    // Get input values
    const valorCredito = parseFloat(document.getElementById('valor-credito').value);
    const taxaJuros = parseFloat(document.getElementById('taxa-juros').value) / 100; // Convert to decimal
    const prazo = parseInt(document.getElementById('prazo').value);
    const entrada = parseFloat(document.getElementById('entrada').value) || 0; // If not filled, assume 0
    const tipoJuros = document.getElementById('tipo-juros').value; // Fixed or Variable
    const tipoPagamento = document.getElementById('prestacao').value; // Principal+Interest or Interest Only

    // Validate inputs
    if (isNaN(valorCredito) || valorCredito <= 0 || isNaN(taxaJuros) || taxaJuros <= 0 || isNaN(prazo) || prazo <= 0) {
        alert("Por favor, insira valores válidos.");
        return;
    }

    // Subtract down payment from loan amount
    const valorFinalCredito = valorCredito - entrada;

    // Convert the annual interest rate to a monthly interest rate
    const taxaMensal = taxaJuros / 12;

    // Calculate the total number of payments (months)
    const numeroPagamentos = prazo * 12;

    // Calculate monthly payment based on payment type
    let parcela;
    if (tipoPagamento === "principal") {
        parcela = (valorFinalCredito * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -numeroPagamentos));
    } else {
        // Interest-only payment calculation (just paying interest)
        parcela = valorFinalCredito * taxaMensal;
    }

    // Format the result to 2 decimal places
    const parcelaFormatada = parcela.toFixed(2);

    // Display the result
    document.getElementById('parcela-credito-resultado').innerText = `€${parcelaFormatada}`;

    // Display breakdown steps
    const resultado = `
        <h3>Passo a Passo do Cálculo:</h3>
        <p><strong>Valor do Crédito (P):</strong> €${valorCredito}</p>
        <p><strong>Entrada (Down Payment):</strong> €${entrada}</p>
        <p><strong>Valor Final do Crédito:</strong> €${valorFinalCredito}</p>
        <p><strong>Taxa de Juro Anual (%):</strong> ${taxaJuros * 100}%</p>
        <p><strong>Taxa de Juro Mensal (i):</strong> ${taxaMensal * 100}%</p>
        <p><strong>Prazo (anos):</strong> ${prazo} anos</p>
        <p><strong>Total de Pagamentos (n):</strong> ${numeroPagamentos} meses</p>
        <p><strong>Prestação Mensal (M):</strong> €${parcelaFormatada}</p>
    `;

    // Append the breakdown to the result section
    const resultadoDiv = document.getElementById('resultado-credito');
    const breakdownDiv = document.createElement('div');
    breakdownDiv.innerHTML = resultado;
    resultadoDiv.appendChild(breakdownDiv);
}

// Seleção de elementos
const toggleButton = document.getElementById('menu-toggle');
const sidebarMenu = document.getElementById('sidebar-menu');
const menuLinks = document.querySelectorAll('.sidebar-menu__toggle');

// Alterna o menu lateral
toggleButton.addEventListener('click', () => {
    sidebarMenu.classList.toggle('open');
});

// Navega para a seção correspondente ao clicar no botão
menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        const targetId = event.target.dataset.target;
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Fecha o menu (opcional)
            sidebarMenu.classList.remove('open');

            // Rola para a seção correspondente
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});
