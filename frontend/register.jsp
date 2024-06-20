<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="cadastro.css">
    <title>Cadastro</title>
    <style>
        .error-message {
            color: red;
            display: none;
        }
    </style>
    <script>
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
    </script>
</head>
<body>
    <div class="container">
        <div class="form-image">
            <img src="assets/robo-digita-em-chat-bot-suporte-tecnico.png" alt="">
        </div>
        <div class="form">
            <form action="register" method="post" onsubmit="return validatePasswords()">
                <!-- Restante do seu formulário permanece o mesmo -->
            </form>
        </div>
    </div>
</body>
</html>
