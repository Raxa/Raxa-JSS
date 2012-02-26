<?php
// from php manual page
function formatBytes($val, $digits = 3, $mode = 'SI', $bB = 'B'){ //$mode == 'SI'|'IEC', $bB == 'b'|'B'
   $si = array('', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y');
   $iec = array('', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi');
   switch(strtoupper($mode)) {
       case 'SI' : $factor = 1000; $symbols = $si; break;
       case 'IEC' : $factor = 1024; $symbols = $iec; break;
       default : $factor = 1000; $symbols = $si; break;
   }
   switch($bB) {
       case 'b' : $val *= 8; break;
       default : $bB = 'B'; break;
   }
   for($i=0;$i<count($symbols)-1 && $val>=$factor;$i++)
       $val /= $factor;
   $p = strpos($val, '.');
   if($p !== false && $p > $digits) $val = round($val);
   elseif($p !== false) $val = round($val, $digits-$p);
   return round($val, $digits) . ' ' . $symbols[$i] . $bB;
}

// provide a brief delay to show loading indicator
sleep(1);
// grab the custom params
$path = '../../src/';

$node = isset($_REQUEST['node']) ? $_REQUEST['node'] : '';

if ("root" == $node) {
    $node = ".";
}

if(strpos($node, '..') !== false){
    die('Nice try buddy.');
}

$nodes = array();
$directory = $path.$node;
if (is_dir($directory)){
    $d = dir($directory);
    while($f = $d->read()){
        if($f == '.' || $f == '..' || substr($f, 0, 1) == '.') continue;

        $filename = $directory . '/' . $f;
        $lastmod = date('M j, Y, g:i a', filemtime($filename));

        if(is_dir($directory.'/'.$f)){
            $qtip = 'Type: Folder<br />Last Modified: '.$lastmod;
            $nodes[] = array(
                'fileName' => $f,
                'id'   => $node.'/'.$f,
                //'qtip' => $qtip,
                'cls'  => 'folder'
            );
        } else {
            $size = formatBytes(filesize($filename), 2);
            $qtip = 'Type: JavaScript File<br />Last Modified: '.$lastmod.'<br />Size: '.$size;
            $nodes[] = array(
                'fileName' => $f,
                'id'   => $node.'/'.$f,
                'leaf' => true,
                //'qtip' => $qtip,
                //'qtipTitle' => $f,
                'cls'  => 'file'
            );
        }
    }
    $d->close();
}

$json_packet = array(
    "text"=>$node,
    "children"=>$nodes
);
echo json_encode($json_packet);