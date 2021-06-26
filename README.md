# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadastrar um carro uma placa já existente.
O carro deve ser cadastrado com disponibilidade por padrão.

- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
Deve ser possível de todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload dos arquivos.

**RF**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um administador.

# Alugel de carro

**RF**
Deve ser possível cadastrar um aluguel

**RNF**

**RN**
O aluguel deve ter duração minima de 24 horas.
O aluguel não deve ser possível cadastrar um novo aluguel caso já existe um aberto para o mesmo usuário.
O aluguel não deve ser possível cadastrar um novo aluguel caso já existe um aberto para o mesmo carro.
