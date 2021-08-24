<?php
declare(strict_types=1);

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

require("Connection_Mysqli.class.php");


function findMultiplus($mdata){
    

    if($mdata ==""){
        return "empty";
    }

    for ($i=0; $i < count($mdata)+1; $i++) { 

        //$mdata[$i]['text'] .= " ". $i+1;
        

        //attaching the message for third, fifth and both.
        if($i % 3 == 0 && $i % 5 == 0 && $i != 0){
            $mdata[$i-1]['text'] .= " ---Third message and fifth message---";
            
        }else{
            if($i % 3 == 0 && $i != 0 ){
                $mdata[$i-1]['text'] .= " ---Third message---";
            }
            if($i % 5 == 0 && $i != 0){
                $mdata[$i-1]['text'] .= " ---Fifth message---";
            }

        }   
    }
    return $mdata;
}

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write('Hello world!');
        return $response;
    });

    $app->get('/user_posts', function (Request $request, Response $response, array $args) {
        
        $mysqli = connectDB();
        $rows = '';
        if ($mysqli->connect_errno) {
            //echo "error connecting to the database";
        }

        
        $sql = "SELECT Posts.id, user_name, text, image, name AS tag
        FROM Posts
        Left Outer JOIN Tags
        ON Posts.tag = Tags.id 
        Left Outer JOIN Users
        ON Posts.user = Users.id"; 
        if (!$result = $mysqli->query($sql)) {   
            // ¡Oh, no! there was an error
            //echo "error";
            //echo "Errno: " . $mysqli->errno . "\n";
            //echo "Error: " . $mysqli->error . "\n";
        }else{

            $rows = $result->fetch_all(MYSQLI_ASSOC);
            
            
            //print_r($rows);
        }


        
        
        
        $data = $rows;

        $data = findMultiplus($data);
      

        $payload = json_encode($data);

        closeDB($mysqli);
        
        $response->getBody()->write($payload);
        return $response
                    ->withHeader('Content-Type', 'application/json');
    });


    $app->get('/user_posts/{user_id}', function (Request $request, Response $response, array $args) {
        
        $mysqli = connectDB();
        $rows = '';
        if ($mysqli->connect_errno) {
            //echo "error connecting to the database";
        }
        
        $sql = "SELECT Posts.id, user_name, text, image, name AS tag
        FROM Posts
        Left Outer JOIN Tags
        ON Posts.tag = Tags.id 
        Left Outer JOIN Users
        ON Posts.user = Users.id WHERE Users.identifier='".$args['user_id']."'"; 
        if (!$result = $mysqli->query($sql)) {   
            // ¡Oh, no! there was an error
            //echo "error";
            //echo "Errno: " . $mysqli->errno . "\n";
            //echo "Error: " . $mysqli->error . "\n";
        }else{

            $rows = $result->fetch_all(MYSQLI_ASSOC);
            
            
            //print_r($rows);
        }
        
        
        
        $data = $rows;


        

        $data = findMultiplus($data);
        $payload = json_encode($data);

        closeDB($mysqli);
        
        $response->getBody()->write($payload);
        return $response
                    ->withHeader('Content-Type', 'application/json');
    });


    //We get all the tags and how many times has been used based on the posts table.
    $app->get('/tags', function (Request $request, Response $response) {
        
        $mysqli = connectDB();
        $rows = '';
        if ($mysqli->connect_errno) {
            //echo "error connecting to the database";
        }
        
        $sql = "SELECT tags.id, tags.name, (SELECT COUNT(posts.tag) FROM posts WHERE posts.tag = tags.id ) AS ntimes  FROM tags"; 
        if (!$result = $mysqli->query($sql)) {   
            // ¡Oh, no! there was an error
            //echo "error";
            //echo "Errno: " . $mysqli->errno . "\n";
            //echo "Error: " . $mysqli->error . "\n";
        }else{

            $rows = $result->fetch_all(MYSQLI_ASSOC);
            
            
            //print_r($rows);
        }
        
        
        
        $data = $rows;
        $payload = json_encode($data);

        closeDB($mysqli);
        
        $response->getBody()->write($payload);
        return $response
                    ->withHeader('Content-Type', 'application/json');
    });

    $app->get('/posts_with_a_tag/{id_tag}', function (Request $request, Response $response, array $args) {
        
        $mysqli = connectDB();
        $rows = '';
        if ($mysqli->connect_errno) {
            //echo "error connecting to the database";
        }
        
        $sql = "SELECT Posts.id, user_name, text, image, name AS tag
        FROM Posts
        Left Outer JOIN Tags
        ON Posts.tag = Tags.id 
        Left Outer JOIN Users
        ON Posts.user = Users.id WHERE posts.tag=". $args['id_tag'] ; 

       
       
        if (!$result = $mysqli->query($sql)) {   
            //echo "error";
            //echo "Errno: " . $mysqli->errno . "\n";
            //echo "Error: " . $mysqli->error . "\n";
        }else{

            $rows = $result->fetch_all(MYSQLI_ASSOC);
            
            
            //print_r($rows);
        }
        
        
        
        $data = $rows;
        $payload = json_encode($data);

        closeDB($mysqli);
        
        $response->getBody()->write($payload);
        return $response
                    ->withHeader('Content-Type', 'application/json');
    });


    $app->get('/get_user_details/{identifier}', function (Request $request, Response $response, array $args) {
        
        $mysqli = connectDB();
        $rows = '';
        if ($mysqli->connect_errno) {
            //echo "error connecting to the database";
        }
        
        $sql = "SELECT user_name, email from users WHERE identifier='".$args['identifier']."'"; 
        if (!$result = $mysqli->query($sql)) {   
            //echo "error";
            //echo "Errno: " . $mysqli->errno . "\n";
            //echo "Error: " . $mysqli->error . "\n";
        }else{

            $rows = $result->fetch_all(MYSQLI_ASSOC);
            
            
            //print_r($rows);
        }
        
        
        
        $data = $rows;
        $payload = json_encode($data);

        closeDB($mysqli);
        
        $response->getBody()->write($payload);
        return $response
                    ->withHeader('Content-Type', 'application/json');
    });




    /////////////////////////////// POST ////////////////////////////////////////////


    $app->post('/user_login', function (Request $request, Response $response): Response {
        // Retrieve the JSON data
        $parameters = (array)$request->getParsedBody();

        
    
        $mysqli = connectDB();
        $rows = '';
        if ($mysqli->connect_errno) {
            //echo "error connecting to the database";
        }
        
        $sql = "SELECT user_name, identifier, email FROM users WHERE email='".$parameters['email']."' AND password='".$parameters['password']."'"; 
        if (!$result = $mysqli->query($sql)) {   
            // ¡Oh, no! there was an error
            //echo "error";
            //echo "Errno: " . $mysqli->errno . "\n";
            //echo "Error: " . $mysqli->error . "\n";
        }else{

            $rows = $result->fetch_all(MYSQLI_ASSOC);
            
            
            //print_r($rows);
        }
        
        
        
        $data = $rows;
        $payload = json_encode($data);

        closeDB($mysqli);
        
        $response->getBody()->write($payload);
    
        return $response;
    });

    $app->post('/user_register', function (Request $request, Response $response): Response {
        // Retrieve the JSON data
        $parameters = (array)$request->getParsedBody();

        
    
        $mysqli = connectDB();
        $rows = '';
        if ($mysqli->connect_errno) {
            //echo "error connecting to the database";
        }

        $data = "";
        $identifier = md5(uniqid($parameters['email'], true));
        
        $sql = "INSERT INTO users (user_name, email, password, identifier) VALUES ('".$parameters['user_name'] . "', '".$parameters['email']."', '".$parameters['password']."', '".$identifier."')"; 
        if (!$result = $mysqli->query($sql)) {   
            // ¡Oh, no! there was an error
            //echo "error";
            //echo "Errno: " . $mysqli->errno . "\n";
            //echo "Error: " . $mysqli->error . "\n";
            $data = $mysqli->error;
        }else{

            //$rows = $result->fetch_all(MYSQLI_ASSOC);
            $data = "bien!";
            
            //print_r($rows);
        }
        
        
        
       // $data = $rows;
        $payload = json_encode($identifier);

        closeDB($mysqli);
        
        $response->getBody()->write($payload);
    
        return $response;
    });


    $app->post('/add_post', function (Request $request, Response $response): Response {

        $parameters = (array)$request->getParsedBody();
        $data = "";

        if(getTag($parameters['tag_name']) != ""){
            $data = getTag($parameters['tag_name']);
        }else{
                $data = insertTag($parameters['tag_name']);
        }

        $tagId = $data;
        $userId = getUserId($parameters['identifier']);
        
        $pathTarget = __DIR__ . '/images/';
        $uploadFileName = null;
        $files = $request->getUploadedFiles();

                
        try{
            if (!empty($files['image'])) {
                $newfile = $files['image'];
                if ($newfile->getError() === UPLOAD_ERR_OK) {
                    $uploadFileName = $parameters['identifier'];
                    $uploadFileName .= $newfile->getClientFilename();
                    $newfile->moveTo($pathTarget.$uploadFileName);
                }
        }
        }catch(Exception $e){
            $uploadFileName = "";
        }

     




        
        $mysqli = connectDB();
        $rows = '';
        if ($mysqli->connect_errno) {
            //echo "error connecting to the database";
        }

        $data = "";
       
        
        $sql = "INSERT INTO posts (text, user, tag, image) VALUES ('".$parameters['text'] . "', ".$userId.", ".$tagId.", '".$uploadFileName."')"; 
        if (!$result = $mysqli->query($sql)) {   
            // ¡Oh, no! there was an error
            //echo "error";
            //echo "Errno: " . $mysqli->errno . "\n";
            //echo "Error: " . $mysqli->error . "\n";
            $data = $mysqli->error;
        }else{

            //$rows = $result->fetch_all(MYSQLI_ASSOC);
            $data = "bien!";
            
            //print_r($rows);
        }
        
        
        

       


       // $data = $rows;
        $payload = json_encode($pathTarget);

       // closeDB($mysqli);
        
        $response->getBody()->write($payload);
    
        return $response;
    });

    $app->post('/edit_post', function (Request $request, Response $response): Response {
        // Retrieve the JSON data
        $parameters = (array)$request->getParsedBody();

        
    
        $mysqli = connectDB();
        $rows = '';
        if ($mysqli->connect_errno) {
            //echo "error connecting to the database";
        }


        
        $identifier = $parameters['identifier'];
        $userId = getUserId($identifier);
        $postId = $parameters['post_id'];
        $newText = $parameters['new_text'];
        $newTag = $parameters['new_tag'];

        $tagId = "null";

        if(!$newTag == ""){

            $tagData = "";
            if(getTag($newTag) != ""){
                $tagData = getTag($newTag);
            }else{
                    $tagData = insertTag($newTag);
            }
    
            $tagId = $tagData;

        }

        
        $sql = "UPDATE posts SET text='".$newText."', tag =".$tagId."  WHERE user='".$userId."' AND id=".$postId; 
        if (!$result = $mysqli->query($sql)) {   
            // ¡Oh, no! there was an error
            //echo "error";
            //echo "Errno: " . $mysqli->errno . "\n";
            //echo "Error: " . $mysqli->error . "\n";
            $data = $mysqli->error;
        }else{

            //$rows = $result->fetch_all(MYSQLI_ASSOC);
            $data = "bien!";
            
            //print_r($rows);
        }
        
        
        
       // $data = $rows;
        $payload = json_encode($data);

        closeDB($mysqli);
        
        $response->getBody()->write($payload);
    
        return $response;
    });


    $app->post('/delete_post', function (Request $request, Response $response): Response {
        // Retrieve the JSON data
        $parameters = (array)$request->getParsedBody();

        
    
        $mysqli = connectDB();
        $rows = '';
        if ($mysqli->connect_errno) {
            //echo "error connecting to the database";
        }


        
        $identifier = $parameters['identifier'];
        $userId = getUserId($identifier);
        $postId = $parameters['post_id'];



        
        $sql = "DELETE FROM posts WHERE id=".$postId." AND user=".$userId; 
        if (!$result = $mysqli->query($sql)) {   
            // ¡Oh, no! there was an error
            //echo "error";
            //echo "Errno: " . $mysqli->errno . "\n";
            //echo "Error: " . $mysqli->error . "\n";
            $data = $mysqli->error;
        }else{

            //$rows = $result->fetch_all(MYSQLI_ASSOC);
            $data = "bien!";
            
            //print_r($rows);
        }
        
        
        
       // $data = $rows;
        $payload = json_encode($data);

        closeDB($mysqli);
        
        $response->getBody()->write($payload);
    
        return $response;
    });


    $app->post('/edit_user', function (Request $request, Response $response): Response {
        // Retrieve the JSON data
        $parameters = (array)$request->getParsedBody();

        
    
        $mysqli = connectDB();
        $rows = '';
        if ($mysqli->connect_errno) {
            //echo "error connecting to the database";
        }


        
        $identifier = $parameters['identifier'];
        $newEmail = $parameters['email'];
        $newUserName = $parameters['user_name'];


       

        
        $sql = "UPDATE users SET user_name='".$newUserName."', email ='".$newEmail."'  WHERE identifier='".$identifier."'"; 
        if (!$result = $mysqli->query($sql)) {   
            // ¡Oh, no! there was an error
            //echo "error";
            //echo "Errno: " . $mysqli->errno . "\n";
            //echo "Error: " . $mysqli->error . "\n";
            $data = $mysqli->error;
        }else{

            //$rows = $result->fetch_all(MYSQLI_ASSOC);
            $data = "bien!";
            
            //print_r($rows);
        }
        
        
        
       // $data = $rows;
        $payload = json_encode($data);

        closeDB($mysqli);
        
        $response->getBody()->write($payload);
    
        return $response;
    });



    $app->group('/users', function (Group $group) {
        $group->get('', ListUsersAction::class);
        $group->get('/{id}', ViewUserAction::class);
    });

};

function insertTag($tagName){

    $mysqli = connectDB();
    $rows = '';
    if ($mysqli->connect_errno) {
        //echo "error connecting to the database";
    }

    $data = "";

    
    $sql = "INSERT INTO tags (name) VALUES ('".$tagName . "')"; 
    if (!$result = $mysqli->query($sql)) {   
        // ¡Oh, no! there was an error
        //echo "error";
        //echo "Errno: " . $mysqli->errno . "\n";
        //echo "Error: " . $mysqli->error . "\n";
        $data = $mysqli->error;
        return "";
    }else{

        //$rows = $result->fetch_all(MYSQLI_ASSOC);
       
       return getTag($tagName);
        //print_r($rows);
    }

   
}

function getUserId($identifier){
    $mysqli = connectDB();
    $rows = '';
    if ($mysqli->connect_errno) {
        //echo "error connecting to the database";
    }

    $data = "";

    
    $sql = "SELECT * FROM users WHERE identifier='".$identifier."'"; 
    if (!$result = $mysqli->query($sql)) {   
        // ¡Oh, no! there was an error
        //echo "error";
        //echo "Errno: " . $mysqli->errno . "\n";
        //echo "Error: " . $mysqli->error . "\n";
        $data = $mysqli->error;
        return "error";
    }else{

        $rows = $result->fetch_all(MYSQLI_ASSOC);
       
        return $rows[0]['id'];
        //print_r($rows);
    }

    return 0;

}



function getTag($tagName){

    $mysqli = connectDB();
    $rows = '';
    if ($mysqli->connect_errno) {
        //echo "error connecting to the database";
    }

    $data = "";

    
    $sql = "SELECT id FROM tags WHERE name='".$tagName."'"; 
    if (!$result = $mysqli->query($sql)) {   
        // ¡Oh, no! there was an error
        //echo "error";
        //echo "Errno: " . $mysqli->errno . "\n";
        //echo "Error: " . $mysqli->error . "\n";
        $data = $mysqli->error;
        return "error";
    }else{

        $rows = $result->fetch_all(MYSQLI_ASSOC);
       
         if($rows != []){
            return $rows[0]['id'];
        }else{
            return "";
        }
 

        //print_r($rows);
    }

    return 0;


}


