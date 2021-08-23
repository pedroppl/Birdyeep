<?php

    function connectDB(){
       

                            //host     //user   //password  //database   //port
        $db =  new mysqli('127.0.0.1', 'root', '1234work', 'birdyeepbd', '8889');
       
        if (!$db) die ("Can't open database.");
        return $db;

    }
    function closeDB($db){
        $db->close();
    }
       


?>