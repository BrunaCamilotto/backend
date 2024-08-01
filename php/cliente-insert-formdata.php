<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // opcao1
    $cliente = new stdClass();
    foreach($_POST as $key => $value) {
        $cliente->$key = $value;
    }
    print(implode(";",$_POST));

    $filename = "txt/clientes.csv";
    $file = fopen($filename, "a"); // abre arquivo modo append
    if ($file) {
        // opcao 1 - precisa das linhas 4 a 7 acima
        $linha = "$cliente->codigo;$cliente->nome;$cliente->email\n";
        // opcao 2
        //$linha = $_POST['codigo'].";".$_POST['nome'].";".$_POST['email']."\n";
        //$linha = implode(";",$_POST);
        
        fwrite($file,$linha);
        fclose($file);

        // informar o cliente que a inclusão foi feita com sucesso
    }
}
?>
