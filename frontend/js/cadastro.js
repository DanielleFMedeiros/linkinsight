document.addEventListener('DOMContentLoaded', function() {
    async function submitForm(event) {
        event.preventDefault();

        const cliente = {
            nome: document.getElementById('firstname').value,
            sobrenome: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('number').value,
            cpf: document.getElementById('cpf').value,
            senha: document.getElementById('password').value,
            genero: document.querySelector('input[name="gender"]:checked').value.toUpperCase(),
            endereco: {
                cidade: document.getElementById('city').value,
                endereco: document.getElementById('adress').value
            }
        };

        try {
            const response = await fetch('http://localhost:8080/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });

            if (response.ok) {
                alert('Cliente cadastrado com sucesso!');
                document.getElementById('registrationForm').reset();
            } else {
                alert('Erro ao cadastrar cliente.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar cliente.');
        }
    }

    function validatePasswords() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorMessage = document.getElementById('error-message');

        if (password !== confirmPassword) {
            errorMessage.style.display = 'block';
            return false;
        } else {
            errorMessage.style.display = 'none';
            return true;
        }
    }

    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();

        if (validatePasswords()) {
            submitForm(event);
        }
    });
});
