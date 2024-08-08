<?php
    require_once("conexao.php");

    

//COMO TESTAR :



    try {
        if expressaoBusca estiver vazio{
            
            $stmt = $conn->prepare("SELECT * FROM cliente");
        }else{
            $stmt = $conn->prepare("SELECT * FROM cliente WHERE nome LIKE :busca ");

        }
        $stmt->execute();
    
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($results);
        print($json);
    
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    
    $conn = null; 
?>


