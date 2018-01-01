<?php
//include('../../../mysqli_connect.php');
include('database.php');
session_start();
if (!isset($_POST['submit'])) {
    header("index.php?Sorryformhasntbeensubmitted");
} else {
    if (empty($_POST['userName'])) {
        header("index.php?Sorrynovaluebeensubmitted");
    } else {
        $userName = $_POST['userName'];
        $pass = $_POST['pass'];
        //echo $userName . ' ' . $pass;
        $sql = "SELECT * FROM tUsers WHERE UserName='$userName'";
        echo $sql;
        $sqlResult = mysqli_query($conn, $sql);
      //check if any results are returned from quesry
        $sqlResultCheck = mysqli_num_rows($sqlResult);
        echo $sqlResultCheck;
        if ($sqlResultCheck < 1) {       
        //send user to error page if no entries are found
            header("Location: ../index.php?login=error");
            //print $sql;
            exit();
        } else {
            $rowName = mysqli_fetch_assoc($sqlResult);                                                
                //$pass = password_hash($pass, PASSWORD_BCRYPT); 
            if ($pass == $rowName['Pass']) {
                $passCheck = true;
            } else {
                $passCheck = false;
            }
            if ($passCheck == false) {
                header("Location: ../index.php?login=invalidpass");
                exit(); 
                    //if all other conditions fail logthe user in and set session variales
            } else if ($passCheck == true) {
                $_SESSION['u_userName'] = $rowName['UserName'];
                $_SESSION['u_first'] = $rowName['First_Name'];
                $_SESSION['u_last'] = $rowName['Last_Name'];
                $_SESSION['u_email'] = $rowName['Email'];
                $_SESSION['u_zip'] = $rowName['Zip'];
                header('Location: ../index.php?login=success');
                exit();
            }
        }
    }
}
?>