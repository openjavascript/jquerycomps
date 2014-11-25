<?php 
  require 'aes.class.php';     // AES PHP implementation
  require 'aesctr.class.php';  // AES Counter Mode implementation
  
  $timer = microtime(true);
  
  // initialise password & plaintesxt if not set in post array (shouldn't need stripslashes if magic_quotes is off)
  $pw = isset($_POST['pw']) ? stripslashes($_POST['pw']) : 'L0ck it up saf3';
  $pt = isset($_POST['pt']) ? stripslashes($_POST['pt']) : 'pssst ... đon’t tell anyøne!';
  $cipher = isset($_POST['cipher']) ? $_POST['cipher']: '';
  $plain = isset($_POST['plain']) ? stripslashes($_POST['plain']): '';
  $encr = isset($_POST['encr']) ? AesCtr::encrypt($pt, $pw, 256) : $cipher;
  $decr = isset($_POST['decr']) ? AesCtr::decrypt($_POST['cipher'], $pw, 256) : $plain;
?>   
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>AES in PHP test harness</title>
</head>
<body>
<form name="frm" id="frm" method="post" action=""> <!-- same-document reference -->
  <table>  
    <tr>
      <td>Password:</td>
      <td><input type="text" name="pw" size="16" value="<?= $pw ?>"></td>
    </tr>
    <tr>
      <td>Plaintext:</td>
      <td><input type="text" name="pt" size="40" value="<?= htmlspecialchars($pt) ?>"></td>
    </tr>
    <tr>
      <td><input type="submit" name="encr" value="Encrypt it:"></td>
      <td><input type="text" name="cipher" size="80" value="<?= $encr ?>"></td>
    </tr>
    <tr>
      <td><input type="submit" name="decr" value="Decrypt it:"></td>
      <td><input type="text" name="plain" size="40" value="<?= htmlspecialchars($decr) ?>"></td>
    </tr>
  </table>
</form>
<p><?= intval((microtime(true) - $timer)*1000) ?>ms</p>
</body>
</html>