document.addEventListener('DOMContentLoaded', function() {
    // ----------------------------------------------------
    // 1. Validação e Máscara para o Campo CPF
    // ----------------------------------------------------

    const cpfInput = document.getElementById('reg-CPF');

    // Impede a digitação de não-números e caracteres especiais
    cpfInput.addEventListener('keydown', function(event) {
        const key = event.key;

        // Permite teclas de controle (Backspace, Delete, setas, etc.)
        if (event.key === 'Backspace' || event.key === 'Delete' || event.key === 'Tab' || event.key === 'Escape' || event.key === 'Enter' || event.ctrlKey || event.metaKey || (event.key.startsWith('Arrow'))) {
            return;
        }

        // Bloqueia se a tecla não for um dígito (0-9)
        if (!/^[0-9]$/.test(key)) {
            event.preventDefault();
        }
    });

    // Aplica a máscara (formato XXX.XXX.XXX-XX)
    cpfInput.addEventListener('input', function(event) {
        let value = event.target.value;

        // Remove tudo que não for dígito
        value = value.replace(/\D/g, "");

        // Limita a 11 dígitos
        value = value.substring(0, 11);

        // Aplica a máscara:
        if (value.length > 3) {
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
        }
        if (value.length > 7) {
            value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
        }
        if (value.length > 11) {
            value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{2})/, "$1.$2.$3-$4");
        }

        event.target.value = value;
    });

    // ----------------------------------------------------
    // 2. Validação e Envio do Formulário
    // ----------------------------------------------------

    const registrationForm = document.querySelector('form');
    const passwordInput = document.getElementById('reg-password');
    const confirmPasswordInput = document.getElementById('reg-confirm-password');

    // Adiciona o ouvinte de evento 'submit' ao formulário
    registrationForm.addEventListener('submit', function(event) {
        
        // 1. Obtém os valores dos campos
        const username = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const cpf = cpfInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // 2. Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            event.preventDefault(); // Impede o envio do formulário
            alert('🛑 As senhas digitadas não coincidem. Por favor, verifique!');
            confirmPasswordInput.focus(); // Coloca o cursor no campo de confirmação
            return; // Sai da função de validação
        }

        // 3. Validação de campos vazios (além do 'required' do HTML)
        if (username === "" || email === "" || cpf === "" || password === "" || confirmPassword === "") {
            event.preventDefault(); // Impede o envio do formulário
            alert("⚠️ Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        // Se passar nas validações JS, o formulário será enviado
        // Se este fosse um formulário real, o backend faria validações mais robustas.
        
        // Exemplo de sucesso (apenas para demonstração no frontend)
        // event.preventDefault(); // Descomente esta linha para evitar o envio e apenas ver o alerta
        // alert(`✅ Cadastro realizado com sucesso! Bem-vindo(a), ${username}!`);
    });

    // ----------------------------------------------------
    // 3. Limpar formulário (botão 'reset')
    // ----------------------------------------------------

    const resetButton = document.querySelector('button[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // A função padrão do 'reset' já limpa os campos, mas você pode adicionar
            // aqui alguma lógica extra, como remover mensagens de erro específicas.
            console.log("Formulário limpo.");
        });
    }

});